export function createStationSpecification(stations) {
  return {
    isSatisfiedBy(restaurant) {
      return stations.includes(restaurant.nearStation)
    },
    getReason(restaurant) {
      if (
        restaurant.nearStation &&
        restaurant.distanceFromStation !== undefined &&
        restaurant.distanceFromStation !== null
      ) {
        return `${restaurant.nearStation}역과 ${restaurant.distanceFromStation} m 거리입니다.`
      }

      return '선택한 역과 가깝습니다.'
    },
  }
}
