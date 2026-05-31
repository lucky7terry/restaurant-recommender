import { getRestaurants } from '../repositories/restaurantRepository'
import { createActiveSpecifications } from '../specifications'

function buildReasons(restaurant, activeSpecifications) {
  return activeSpecifications
    .filter((specification) => specification.isSatisfiedBy(restaurant))
    .map((specification) => specification.getReason())
}

export function recommendRestaurants(filters = {}) {
  const categories = filters.categories ?? filters.category
  const normalizedFilters = {
    ...filters,
    categories,
  }
  const activeSpecifications = createActiveSpecifications(normalizedFilters)

  return getRestaurants()
    .filter((restaurant) =>
      activeSpecifications.every((specification) =>
        specification.isSatisfiedBy(restaurant),
      ),
    )
    .map((restaurant) => ({
      ...restaurant,
      reasons: buildReasons(restaurant, activeSpecifications),
    }))
}
