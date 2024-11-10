import { useState } from 'react';
import PropTypes from 'prop-types';
import { RxUpload } from "react-icons/rx";
import Button from './button';
import { generateKML } from '../../utils/kml-parser';

function ExportDialog({ markers }) {
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState('');

  const handleGoogleMapsExport = () => {
    // TODO: Implement Google Maps export
    console.log('Google Maps export to be implemented');
  };

  const handleKMLExport = () => {
    try {
      const kmlContent = generateKML(markers);
      const blob = new Blob([kmlContent], { type: 'application/vnd.google-earth.kml+xml' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'scratch-map-locations.kml';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setIsOpen(false);
    } catch (error) {
      setError(error.message);
    }
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)}>
        <RxUpload size={24} />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-100">Export Locations</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-slate-100"
          >
            <RxUpload size={20} className="rotate-45" />
          </button>
        </div>

        <div className="grid gap-4">
          <Button 
            onClick={handleGoogleMapsExport}
            className="flex items-center gap-2"
          >
            <RxUpload size={18} />
            Export to Google Maps
          </Button>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-700"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-400">or</span>
            </div>
          </div>

          <Button 
            onClick={handleKMLExport}
            className="flex items-center gap-2"
          >
            <RxUpload size={18} />
            Export as KML file
          </Button>

          {error && (
            <p className="text-sm text-red-400 bg-red-950/50 p-2 rounded-md">
              {error}
            </p>
          )}

          <p className="text-sm text-slate-400 mt-2">
            KML files can be imported into Google Earth and other mapping applications.
          </p>
        </div>
      </div>
    </div>
  );
}

ExportDialog.propTypes = {
  markers: PropTypes.array.isRequired,
};

export default ExportDialog;