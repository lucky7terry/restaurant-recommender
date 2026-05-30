import restaurants from '../data/restaurants.json'

// Vite module import caches this JSON, so the data is loaded once and reused.
export function getRestaurants() {
  return restaurants
}
