import { useCroquetContext, useViewId } from '@croquet/react'
import hash_fn from 'object-hash'
import {
//   Dispatch,
//   SetStateAction,
  useCallback,
  useEffect,
  useState
} from 'react'
// import ReactTogetherModel from '../models/ReactTogetherModel'
import getNewValue from './getNewValue'

// The empty object is used as the allValues value
// when the user is not connected to a session.
// Using this constant object avoids triggering
// useEffects that depend on the allValues object.
const EMPTY_OBJECT = Object.freeze({})

// Converts a Map to an object
function mapToObject(map) {
  return Object.fromEntries(map.entries())
}

export default function useMyStateTogetherWithPerUserValues(
  rtKey,
  initialValue
) {
  // Memoize the initial value to ignore subsequent changes
  // https://react.dev/reference/react/useState
  const [actualInitialValue] = useState(initialValue)

  const { session, view, model } = useCroquetContext()
  const viewId = useViewId()

  const [allValuesState, setAllValuesState] = useState(() => {
    if (!view || !model || !viewId) {
      return {
        localValue: actualInitialValue,
        allValues: EMPTY_OBJECT,
        allValuesHash: null
      }
    }

    // Initialize allValues with existing data or set initial value
    // We don't need to publish a setState event here, since that
    // will be done in the useEffect below
    const allValues = mapToObject(
      (model.stateTogether.get(rtKey)) ??
        new Map([[viewId, actualInitialValue]])
    )
    return {
      localValue: actualInitialValue,
      allValues,
      allValuesHash: hash_fn(allValues)
    }
  })

  useEffect(() => {
    if (!session || !view || !model || !viewId) {
      setAllValuesState(() => ({
        localValue: actualInitialValue,
        allValues: EMPTY_OBJECT,
        allValuesHash: null
      }))
      return
    }

    // The handler will only be called when we are connected to a session
    const handler = () => {
      setAllValuesState((prev) => {
        const { localValue, allValuesHash } = prev
        const map = new Map(model.stateTogether.get(rtKey))

        // Ensure current view's value is in the map
        // Publish a setState event if it is not
        if (!map.has(viewId)) {
          view.publish(model.id, 'setStateTogether', {
            id: rtKey,
            viewId,
            newValue: localValue
          })
          map.set(viewId, localValue)
        }

        const newAllValues = mapToObject(map)
        const newAllValuesHash = hash_fn(newAllValues)

        // Only update state if values have changed
        return allValuesHash === newAllValuesHash
          ? prev
          : {
              localValue: map.get(viewId),
              allValues: newAllValues,
              allValuesHash: newAllValuesHash
            }
      })
    }

    view.subscribe(
      rtKey,
      { event: 'updated', handling: 'oncePerFrame' },
      handler
    )

    // Initial call to sync state
    handler()

    // Cleanup: remove value from model and unsubscribe
    return () => {
      view.publish(model.id, 'setStateTogether', {
        id: rtKey,
        viewId,
        newValue: undefined
      })
      view.unsubscribe(rtKey, 'updated', handler)
    }
  }, [session, view, viewId, model, rtKey])

  // Setter function to update local and shared state
  const setter = useCallback(
    (newValueOrFn) => {
      if (!view || !viewId || !model) {
        // Update local state when not connected
        setAllValuesState((prev) => {
          const newLocalValue = getNewValue(prev.localValue, newValueOrFn)
          return prev.localValue === newLocalValue
            ? prev
            : {
                localValue: newLocalValue,
                allValues: EMPTY_OBJECT,
                allValuesHash: null
              }
        })
      } else {
        // Update shared state when connected
        const allValues = model.stateTogether.get(rtKey)
        let prevLocalValue = allValues.get(view.viewId)
        if (prevLocalValue === undefined) {
          // If the viewId is not in the allValues mapping, it is because
          // the publish(initialValue) has not been received by the current user yet
          // In that case, we use the initialValue
          console.warn(
            '[useStateTogetherWithPerUserValues:setter] prevLocalValue is undefined.' +
              `Using initialValue: ${actualInitialValue}`
          )
          prevLocalValue = actualInitialValue
        }
        const newLocalValue = getNewValue(prevLocalValue, newValueOrFn)

        view.publish(model.id, 'setStateTogether', {
          id: rtKey,
          viewId,
          newValue: newLocalValue
        })
      }
    },
    [view, viewId, model, rtKey, actualInitialValue]
  )

  const { localValue, allValues } = allValuesState
  return [localValue, setter, allValues]
}