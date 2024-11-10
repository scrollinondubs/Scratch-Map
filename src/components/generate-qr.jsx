import { useState } from 'react';
import QRCode from 'react-qr-code';
import { useCreateRandomSession, useIsTogether, useJoinUrl } from 'react-together';
import Button from './ui/button';

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
      <Button 
        onClick={handleButtonClick}
      >
        {isTogether ? 'Connected to Session' : 'Connect to Session'}
      </Button>

      {showQRCodeOverlay && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg text-center shadow-lg">
            <QRCode value={sessionId || ''} />
            <a href={sessionId} target="_blank">Url</a>
            <button 
              onClick={closeQRCodeOverlay}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all duration-300"
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

