import { useState } from 'react';
import QRCode from 'react-qr-code';
import { useCreateRandomSession, useIsTogether, useJoinUrl } from 'react-together';

const SessionButton = () => {
  const [showQRCodeOverlay, setShowQRCodeOverlay] = useState(false);

  const isTogether = useIsTogether();
  const createRandomSession = useCreateRandomSession();
  const sessionId = useJoinUrl();

  console.log(sessionId);

  const closeQRCodeOverlay = () => {
    setShowQRCodeOverlay(false);
  };

  const handleButtonClick = () => {
    if (!isTogether) {
      createRandomSession();
    } else {
      setShowQRCodeOverlay(true); // Show the QR code overlay if already connected
    }
  };

  return (
    <div>
      <button 
        onClick={handleButtonClick}
        className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all duration-300"
      >
        {isTogether ? 'Connected to Session' : 'Connect to Session'}
      </button>

      {showQRCodeOverlay && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg text-center shadow-lg">
            <QRCode value={sessionId || ''} />
            <a href={sessionId} target="_blank">Url</a>
            <button 
              onClick={closeQRCodeOverlay}
              className="p-2 font-semibold text-white bg-blue-500 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Close QR
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionButton;

