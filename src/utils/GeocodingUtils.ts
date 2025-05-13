import { GeocodingService } from '../services/GeocodingService';

/**
 * Interface for objects with an address property
 */
interface AddressEntity {
  address: string;
  [key: string]: any;
}

/**
 * Interface for geocoordinates
 */
interface GeoCoordinates {
  lat: number;
  lng: number;
}

/**
 * Enhances an entity with geocoordinates based on its address
 * @param entity The entity with an address field
 * @returns The entity with added geocoordinates
 */
export async function enhanceWithGeocoordinates<T extends AddressEntity>(entity: T): Promise<T & { coordinates?: GeoCoordinates }> {
  if (!entity || !entity.address) {
    return { ...entity, coordinates: undefined };
  }

  try {
    const coordinates = await GeocodingService.geocodeAddress(entity.address);
    return {
      ...entity,
      coordinates
    };
  } catch (error) {
    console.error(`Error geocoding address for entity: ${error}`);
    return {
      ...entity,
      coordinates: undefined
    };
  }
}

/**
 * Enhances an array of entities with geocoordinates based on their addresses
 * @param entities Array of entities with address fields
 * @returns Array of entities with added geocoordinates
 */
export async function enhanceEntitiesWithGeocoordinates<T extends AddressEntity>(entities: T[]): Promise<(T & { coordinates?: GeoCoordinates })[]> {
  if (!entities || entities.length === 0) {
    return [];
  }

  // Process all entities in parallel for better performance
  const enhancedEntities = await Promise.all(
    entities.map(entity => enhanceWithGeocoordinates(entity))
  );

  return enhancedEntities;
}