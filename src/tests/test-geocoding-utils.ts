import { enhanceWithGeocoordinates, enhanceEntitiesWithGeocoordinates } from '../utils/GeocodingUtils';

async function testGeocodingUtils() {
  try {
    // Test data based on the professional we got from the API
    const professional = {
      firstName: "Juan Pablo",
      lastName: "Avila",
      age: "42",
      phoneNumber: "2616373600",
      email: "avilajuanp@gmail.com",
      address: "Padre Vazquez 1234, Maipú, Mendoza",
      birthDate: "1981-02-16",
      dni: "28627255",
      userName: "avilajuanp",
      password: "test",
      role: "Professional",
      registrationNumber: "340027",
      specialty: "electricista",
      yearsOfExperience: "15",
      id: 1
    };

    console.log('Testing enhanceWithGeocoordinates function...');
    const enhancedProfessional = await enhanceWithGeocoordinates(professional);
    console.log('Enhanced professional:', JSON.stringify(enhancedProfessional, null, 2));

    console.log('\nTesting enhanceEntitiesWithGeocoordinates function...');
    const professionals = [professional, { ...professional, id: 2, address: "San Martín 100, Mendoza, Argentina" }];
    const enhancedProfessionals = await enhanceEntitiesWithGeocoordinates(professionals);
    console.log('Enhanced professionals:', JSON.stringify(enhancedProfessionals, null, 2));
  } catch (error) {
    console.error('Error during test:', error);
  }
}

testGeocodingUtils();