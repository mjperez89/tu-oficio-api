import axios from 'axios';

interface GeoCoordinates {
  lat: number;
  lng: number;
}

export class GeocodingService {
  static async geocodeAddress(address: string): Promise<GeoCoordinates | null> {
    try {
      const encodedAddress = encodeURIComponent(address);
      // Nominatim requires a user agent with contact info according to their usage policy
      const headers = {
        'User-Agent': 'TuOficioApp contact@youremail.com' // Replace with your app name and email
      };
      
      const url = `https://nominatim.openstreetmap.org/search?q=${encodedAddress}&format=json&limit=1`;
      
      const response = await axios.get(url, { headers });
      
      if (response.data && response.data.length > 0) {
        return {
          lat: parseFloat(response.data[0].lat),
          lng: parseFloat(response.data[0].lon)
        };
      }
      
      return null;
    } catch (error) {
      console.error('Error geocoding address:', error);
      return null;
    }
  }
}