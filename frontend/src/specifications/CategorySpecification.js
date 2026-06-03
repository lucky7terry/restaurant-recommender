import { CATEGORY_GROUPS } from '../constants/categoryOptions'

export function buildSearchCategories(categories = [], categoryDetails = {}) {
  return categories.flatMap((category) => {
    const groupedCategories = CATEGORY_GROUPS[category]

    if (!groupedCategories) {
      return category
    }

    const selectedDetails = categoryDetails[category] ?? []

    if (selectedDetails.length > 0) {
      return selectedDetails
    }

    return [category, ...groupedCategories]
  })
}

export function createCategorySpecification(categories, categoryDetails = {}) {
  const searchCategories = buildSearchCategories(categories, categoryDetails)

  return {
    isSatisfiedBy(restaurant) {
      return searchCategories.includes(restaurant.category)
    },
    getReason() {
      return '선택한 음식 종류 중 하나와 일치합니다.'
    },
  }
}
