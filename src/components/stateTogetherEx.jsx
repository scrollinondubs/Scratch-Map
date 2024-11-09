import { useStateTogether, SessionManager } from "react-together"

function StateTogether() {
    const [checked, setChecked] = useStateTogether('smt', false);

    const handleClick = () => {
        setChecked(!checked);
    }

    return (
        <div className="mt-10 flex flex-col gap-2 justify-center align-middle">
            <button onClick={handleClick} className="border"> Press here </button>
            <h1>{checked ? "button on" : "button off"}</h1>
            <SessionManager />
        </div>
  )
}

export default StateTogether
