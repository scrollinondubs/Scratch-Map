function ConnectedCard() {
    return (
      <div className="w-screen h-screen">
        <div className="p-10 flex gap-8">
          <button className="px-6 py-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
              Click Me
          </button>
        </div>
      </div>
    );
  }
  
  export default ConnectedCard;