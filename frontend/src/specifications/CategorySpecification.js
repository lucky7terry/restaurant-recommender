export function createCategorySpecification(categories) {
  return {
    isSatisfiedBy(restaurant) {
      return categories.includes(restaurant.category)
    },
    getReason() {
      return '선택한 음식 종류 중 하나와 일치합니다.'
    },
  }
}
