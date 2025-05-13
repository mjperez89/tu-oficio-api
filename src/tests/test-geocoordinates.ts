import axios from 'axios';
import { GeocodingService } from '../services/GeocodingService';

async function testGeocoordinatesInResponse() {
  try {
    // Test the endpoint to get a professional by ID
    // Replace with an actual ID that exists in your database
    const professionalId = 1; 
    console.log(`Testing geocoordinates in response for professional with ID: ${professionalId}`);

    // First, let's test the GeocodingService directly to make sure it works
    console.log('Testing GeocodingService directly...');
    const testAddress = 'Padre Vazquez 1234, Maipú, Mendoza';
    const coordinates = await GeocodingService.geocodeAddress(testAddress);
    console.log('Direct geocoding result:', coordinates);

    // Now test the API endpoint
    console.log('\nTesting API endpoint...');
    const response = await axios.get(`http://localhost:3000/professional/${professionalId}`);

    if (response.data && response.data.coordinates) {
      console.log('Geocoordinates successfully added to response!');
      console.log(`Professional address: ${response.data.address}`);
      console.log(`Coordinates: Latitude ${response.data.coordinates.lat}, Longitude ${response.data.coordinates.lng}`);
    } else {
      console.log('No geocoordinates found in response.');
      console.log('Response data:', JSON.stringify(response.data, null, 2));
    }
  } catch (error) {
    console.error('Error during test:', error.response ? error.response.data : error.message);
  }
}

testGeocoordinatesInResponse();
