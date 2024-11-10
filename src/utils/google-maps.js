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