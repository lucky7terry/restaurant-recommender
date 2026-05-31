export function createPurposeSpecification(purpose) {
  return {
    isSatisfiedBy(restaurant) {
      return restaurant.purposes?.includes(purpose) ?? false
    },
    getReason() {
      return '선택한 식사 목적에 잘 맞는 식당입니다.'
    },
  }
}
