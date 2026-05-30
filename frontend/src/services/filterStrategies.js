function isEmpty(value) {
  return value === undefined || value === null || value === ''
}

export function matchBudget(restaurant, budget) {
  if (isEmpty(budget)) {
    return true
  }

  return restaurant.menus.some((menu) => menu.price <= budget)
}

export function matchCategory(restaurant, category) {
  if (isEmpty(category)) {
    return true
  }

  return restaurant.category === category
}
