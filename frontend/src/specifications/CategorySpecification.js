const CATEGORY_GROUPS = {
  아시안: ['베트남', '태국', '인도', '인도네시아'],
  기타: ['프랑스', '멕시칸', '비건', '스페인'],
}

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
