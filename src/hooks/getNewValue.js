export function isFunction(arg) {
  return typeof arg === 'function'
}


export default function getNewValue(
  prev,
  newValueOrFn
) {
  let newValue
  if (isFunction(newValueOrFn)) {
    newValue = newValueOrFn(prev)
  } else {
    newValue = newValueOrFn
  }
  return newValue
}