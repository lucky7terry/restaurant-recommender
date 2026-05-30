import { getRestaurants } from '../repositories/restaurantRepository'
import { matchBudget, matchCategory } from './filterStrategies'

function isFilterEnabled(value) {
  return value !== undefined && value !== null && value !== ''
}

function buildReasons(restaurant, filters) {
  const reasons = []

  if (isFilterEnabled(filters.budget) && matchBudget(restaurant, filters.budget)) {
    reasons.push('예산 안에 주문 가능한 메뉴가 있습니다.')
  }

  if (
    isFilterEnabled(filters.category) &&
    matchCategory(restaurant, filters.category)
  ) {
    reasons.push('선택한 음식 종류와 일치합니다.')
  }

  return reasons
}

export function recommendRestaurants(filters = {}) {
  return getRestaurants()
    .filter(
      (restaurant) =>
        matchBudget(restaurant, filters.budget) &&
        matchCategory(restaurant, filters.category),
    )
    .map((restaurant) => ({
      ...restaurant,
      reasons: buildReasons(restaurant, filters),
    }))
}
