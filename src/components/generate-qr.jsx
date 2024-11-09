import { useCreateRandomSession } from "react-together";


function GenerateQR() {

  const createRandomSession = useCreateRandomSession();
  const handleOnClick = () => {
    createRandomSession()

  }

  return (
    <button 
      className="px-6 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      onClick={() => handleOnClick()}
    >
        Share this map
    </button>
  );
}

export default GenerateQR;