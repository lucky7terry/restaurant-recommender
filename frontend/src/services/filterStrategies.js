function isEmpty(value) {
  return (
    value === undefined ||
    value === null ||
    value === '' ||
    (Array.isArray(value) && value.length === 0)
  )
}

export function matchBudget(restaurant, budget) {
  if (isEmpty(budget)) {
    return true
  }

  return restaurant.menus.some((menu) => menu.price <= budget)
}

export function matchCategory(restaurant, categories) {
  if (isEmpty(categories)) {
    return true
  }

  if (Array.isArray(categories)) {
    return categories.includes(restaurant.category)
  }

  return restaurant.category === categories
}
