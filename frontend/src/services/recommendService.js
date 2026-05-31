import { getRestaurants } from '../repositories/restaurantRepository'
import { createActiveSpecifications } from '../specifications'

function buildReasons(restaurant, activeSpecifications) {
  return activeSpecifications
    .filter((specification) => specification.isSatisfiedBy(restaurant))
    .map((specification) => specification.getReason(restaurant))
}

function getDistanceFromStation(restaurant) {
  return restaurant.distanceFromStation ?? Number.POSITIVE_INFINITY
}

function getLowestMenuPrice(restaurant) {
  return Math.min(...restaurant.menus.map((menu) => menu.price))
}

function sortRestaurants(restaurants, sortOption = 'distance') {
  return [...restaurants].sort((firstRestaurant, secondRestaurant) => {
    if (sortOption === 'price-desc') {
      return (
        getLowestMenuPrice(secondRestaurant) -
        getLowestMenuPrice(firstRestaurant)
      )
    }

    if (sortOption === 'price-asc') {
      return (
        getLowestMenuPrice(firstRestaurant) -
        getLowestMenuPrice(secondRestaurant)
      )
    }

    return (
      getDistanceFromStation(firstRestaurant) -
      getDistanceFromStation(secondRestaurant)
    )
  })
}

export function recommendRestaurants(filters = {}) {
  const categories = filters.categories ?? filters.category
  const normalizedFilters = {
    ...filters,
    categories,
  }
  const activeSpecifications = createActiveSpecifications(normalizedFilters)

  const recommendations = getRestaurants()
    .filter((restaurant) =>
      activeSpecifications.every((specification) =>
        specification.isSatisfiedBy(restaurant),
      ),
    )
    .map((restaurant) => ({
      ...restaurant,
      reasons: buildReasons(restaurant, activeSpecifications),
    }))

  return sortRestaurants(recommendations, normalizedFilters.sortOption)
}
