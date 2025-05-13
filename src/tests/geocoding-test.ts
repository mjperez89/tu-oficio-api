import { GeocodingService } from '../services/GeocodingService';

async function testGeocoding() {
  try {
    const address = 'Juan Agustìn Maza 3333, Maipú, Mendoza';
    console.log(`Testing geocoding for address: ${address}`);
    
    const coordinates = await GeocodingService.geocodeAddress(address);
    
    if (coordinates) {
      console.log('Geocoding successful!');
      console.log(`Latitude: ${coordinates.lat}, Longitude: ${coordinates.lng}`);
    } else {
      console.log('Geocoding failed: No coordinates returned');
    }
  } catch (error) {
    console.error('Error during geocoding test:', error);
  }
}

testGeocoding();