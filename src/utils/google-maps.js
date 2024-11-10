/**
 * Extracts place ID from a Google Maps URL
 * Handles various URL formats from Google Maps
 */
export const extractPlaceIdFromUrl = (url) => {
    try {
      const urlObj = new URL(url);
      // Extract place_id from URL parameters
      const params = new URLSearchParams(urlObj.search);
      const placeId = params.get('place_id');
      
      if (placeId) return placeId;
  
      // If no place_id in params, try to extract from path
      const pathParts = urlObj.pathname.split('/');
      const placeIndex = pathParts.indexOf('place');
      if (placeIndex !== -1 && pathParts[placeIndex + 1]) {
        return pathParts[placeIndex + 1];
      }
      
      return null;
    } catch (error) {
      console.error('Invalid URL:', error);
      return null;
    }
  };
  
  /**
 * Creates a Google Maps sharing URL from a list of markers
 * @param {Array} markers - Array of marker objects with lat and lng properties
 * @returns {string} Google Maps URL that can be shared
 */
export const createGoogleMapsUrl = (markers) => {
    if (!markers || markers.length === 0) {
      throw new Error('No locations to export');
    }
  
    try {
      // Base URL for Google Maps
      const baseUrl = 'https://www.google.com/maps/dir/';
      
      // Convert markers to URL parameters
      const locationParams = markers.map(marker => {
        if (!marker.lat || !marker.lng) {
          throw new Error('Invalid marker data: missing coordinates');
        }
        return `${marker.lat},${marker.lng}`;
      }).join('/');
  
      // Create the full URL
      const fullUrl = `${baseUrl}${locationParams}`;
      
      // Google Maps has a URL length limit of approximately 2048 characters
      if (fullUrl.length > 2048) {
        throw new Error('Too many locations to export to Google Maps (URL length exceeded)');
      }
  
      return fullUrl;
    } catch (error) {
      throw new Error(`Failed to create Google Maps URL: ${error.message}`);
    }
  };
  
  /**
   * Opens the Google Maps URL in a new tab and copies it to clipboard
   * @param {string} url - Google Maps URL
   * @returns {Promise<void>}
   */
  export const shareGoogleMapsUrl = async (url) => {
    try {
      // Copy to clipboard
      await navigator.clipboard.writeText(url);
      
      // Open in new tab
      window.open(url, '_blank');
    } catch (error) {
      throw new Error(`Failed to share Google Maps URL: ${error.message}`);
    }
  };
  
  /**
   * Fetches place details using Google Places API
   */
  export const getPlaceDetails = async (placeId) => {
    const { Map } = await google.maps.importLibrary("maps");
    const { PlacesService } = await google.maps.importLibrary("places");
    
    // Create a temporary map div (required for PlacesService)
    const mapDiv = document.createElement('div');
    const map = new Map(mapDiv);
    const service = new PlacesService(map);
  
    return new Promise((resolve, reject) => {
      service.getDetails(
        {
          placeId: placeId,
          fields: ['name', 'geometry', 'formatted_address']
        },
        (place, status) => {
          if (status === google.maps.places.PlacesServiceStatus.OK) {
            resolve(place);
          } else {
            reject(new Error(`Place details request failed: ${status}`));
          }
        }
      );
    });
  };