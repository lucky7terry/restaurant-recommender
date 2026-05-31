export function createBudgetSpecification(budget) {
  return {
    isSatisfiedBy(restaurant) {
      return restaurant.menus.some((menu) => menu.price <= budget)
    },
    getReason() {
      return '예산 안에 주문 가능한 메뉴가 있습니다.'
    },
  }
}
