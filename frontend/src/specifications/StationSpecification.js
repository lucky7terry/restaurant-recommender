export function createStationSpecification(stations) {
  return {
    isSatisfiedBy(restaurant) {
      return stations.includes(restaurant.nearStation)
    },
    getReason() {
      return '선택한 역과 가깝습니다.'
    },
  }
}
