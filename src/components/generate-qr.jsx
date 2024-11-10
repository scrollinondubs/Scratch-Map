import { useState } from 'react';
import QRCode from 'react-qr-code';
import { useCreateRandomSession, useIsTogether, useJoinUrl } from 'react-together';
import IconButton from './ui/button';
import { RiQrCodeLine } from "react-icons/ri";
import { FaRegClipboard } from "react-icons/fa";


const SessionButton = () => {
  const [showQRCodeOverlay, setShowQRCodeOverlay] = useState(false);
  const [buttonText, setButtonText] = useState('Copy to Clipboard');

  const isTogether = useIsTogether();
  const createRandomSession = useCreateRandomSession();
  const sessionId = useJoinUrl();

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

  const copyToClipboard = () => {
    if (sessionId) {
      navigator.clipboard.writeText(sessionId).then(() => {
        setButtonText('Copied!');
        setTimeout(() => {
          setButtonText('Copy to Clipboard');
        }, 1000);
      }).catch((err) => {
        console.error('Failed to copy: ', err);
      });
    }
  };

  return (
    <div>
      <IconButton 
        onClick={handleButtonClick}
      >
        <RiQrCodeLine size={24}/>
      </IconButton>

      {showQRCodeOverlay && (
        <div className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg text-center shadow-lg flex flex-col gap-2">
            <QRCode value={sessionId || ''} />
            <button 
              onClick={copyToClipboard}
              className="px-4 py-2 bg-blue-700 rounded-lg hover:bg-blue-800 flex items-center justify-center gap-2 text-white"
            >
              <FaRegClipboard size={16} />
              {buttonText}
            </button>
            <button 
              onClick={closeQRCodeOverlay}
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
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
