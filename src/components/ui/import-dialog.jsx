import { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { RxDownload } from "react-icons/rx";
import Button from './button';
import { extractPlaceIdFromUrl, getPlaceDetails } from '../../utils/google-maps';
import { parseKML } from '../../utils/kml-parser';

function ImportDialog({ setMarkers }) {
  const [isOpen, setIsOpen] = useState(false);
  const [inputUrl, setInputUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleGoogleMapsImport = async () => {
    setError('');
    setIsLoading(true);
    
    try {
      // Validate input
      if (!inputUrl) {
        throw new Error('Please enter a Google Maps URL');
      }

      // Extract place ID from URL
      const placeId = extractPlaceIdFromUrl(inputUrl);
      if (!placeId) {
        throw new Error('Invalid Google Maps URL. Please make sure you\'re sharing a place link.');
      }

      // Fetch place details
      const placeDetails = await getPlaceDetails(placeId);
      
      // Add new marker
      const newMarker = {
        lat: placeDetails.geometry.location.lat(),
        lng: placeDetails.geometry.location.lng(),
        comment: `${placeDetails.name}\n${placeDetails.formatted_address}`,
      };

      setMarkers(currentMarkers => [...currentMarkers, newMarker]);
      setIsOpen(false);
      setInputUrl('');
      
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKMLImport = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setError('');
    setIsLoading(true);

    try {
      // Validate file type
      if (!file.name.toLowerCase().endsWith('.kml')) {
        throw new Error('Please select a valid KML file');
      }

      // Read file content
      const content = await file.text();
      
      // Parse KML and extract markers
      const newMarkers = parseKML(content);
      
      if (newMarkers.length === 0) {
        throw new Error('No valid locations found in the KML file');
      }

      // Add new markers
      setMarkers(currentMarkers => [...currentMarkers, ...newMarkers]);
      setIsOpen(false);
      
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) {
    return (
      <Button onClick={() => setIsOpen(true)}>
        <RxDownload size={24} />
      </Button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-slate-900 rounded-lg shadow-xl max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-slate-100">Import Locations</h2>
          <button
            onClick={() => setIsOpen(false)}
            className="text-slate-400 hover:text-slate-100"
          >
            <RxDownload size={20} className="rotate-45" />
          </button>
        </div>

        <div className="grid gap-4">
          {/* Google Maps Import Section */}
          <div className="grid gap-2">
            <label htmlFor="googleMapsUrl" className="text-sm font-medium text-slate-100">
              Google Maps URL
            </label>
            <input
              id="googleMapsUrl"
              type="url"
              placeholder="Paste Google Maps URL here"
              className="flex h-10 w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-600"
              value={inputUrl}
              onChange={(e) => setInputUrl(e.target.value)}
            />
            <Button 
              onClick={handleGoogleMapsImport}
              disabled={isLoading}
              className="flex items-center gap-2"
            >
              <RxDownload size={18} />
              {isLoading ? 'Importing from Google Maps...' : 'Import from Google Maps'}
            </Button>

            <div className="text-sm text-slate-400">
              <p>How to get a Google Maps URL:</p>
              <ol className="list-decimal list-inside mt-1">
                <li>Open Google Maps and find a place</li>
                <li>Click "Share" or copy the URL from your browser</li>
                <li>Paste the URL here</li>
              </ol>
            </div>
          </div>

          <div className="relative my-4">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-slate-700"></span>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-slate-900 px-2 text-slate-400">or</span>
            </div>
          </div>

          {/* KML Import Section */}
          <div className="grid gap-2">
            <label htmlFor="kmlFile" className="text-sm font-medium text-slate-100">
              KML File
            </label>
            <input
              ref={fileInputRef}
              id="kmlFile"
              type="file"
              accept=".kml"
              onChange={handleKMLImport}
              className="flex w-full rounded-md border border-slate-700 bg-slate-800 px-3 py-2 text-sm text-slate-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-700 file:text-slate-100 hover:file:bg-slate-600"
            />
            <p className="text-sm text-slate-400">
              Upload a KML file exported from Google Earth or other mapping tools
            </p>
          </div>

          {error && (
            <p className="text-sm text-red-400 bg-red-950/50 p-2 rounded-md">
              {error}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

ImportDialog.propTypes = {
  setMarkers: PropTypes.func.isRequired,
};

export default ImportDialog;