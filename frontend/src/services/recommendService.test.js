import { describe, expect, it } from 'vitest'
import restaurants from '../data/restaurants.json'
import { recommendRestaurants } from './recommendService'

function hasMenuWithinBudget(restaurant, budget) {
  return restaurant.menus.some((menu) => menu.price <= budget)
}

function getLowestMenuPrice(restaurant) {
  return Math.min(...restaurant.menus.map((menu) => menu.price))
}

function isAscending(values) {
  return values.every((value, index) => index === 0 || values[index - 1] <= value)
}

function isSameResultSet(results, expectedRestaurants) {
  expect(results.map((restaurant) => restaurant.id)).toEqual(
    expectedRestaurants.map((restaurant) => restaurant.id),
  )
}

describe('recommendRestaurants', () => {
  it('returns only restaurants with at least one menu within the budget', () => {
    const budget = 8000
    const results = recommendRestaurants({ budget })
    const expectedRestaurants = restaurants.filter((restaurant) =>
      hasMenuWithinBudget(restaurant, budget),
    )

    expect(results).toHaveLength(expectedRestaurants.length)
    expect(results.every((restaurant) => hasMenuWithinBudget(restaurant, budget)))
      .toBe(true)
  })

  it('returns only restaurants in the selected categories', () => {
    const categories = ['한식']
    const results = recommendRestaurants({ categories })
    const expectedRestaurants = restaurants.filter((restaurant) =>
      categories.includes(restaurant.category),
    )

    expect(results).toHaveLength(expectedRestaurants.length)
    expect(results.every((restaurant) => categories.includes(restaurant.category)))
      .toBe(true)
  })

  it('returns only restaurants matching the selected dining purpose', () => {
    const purpose = '혼밥'
    const results = recommendRestaurants({ purpose })
    const expectedRestaurants = restaurants.filter((restaurant) =>
      restaurant.purposes?.includes(purpose),
    )

    expect(results).toHaveLength(expectedRestaurants.length)
    expect(
      results.every((restaurant) => restaurant.purposes?.includes(purpose)),
    ).toBe(true)
  })

  it('returns only restaurants near the selected stations', () => {
    const stations = ['마포구청']
    const results = recommendRestaurants({ stations })
    const expectedRestaurants = restaurants.filter((restaurant) =>
      stations.includes(restaurant.nearStation),
    )

    expect(results).toHaveLength(expectedRestaurants.length)
    expect(results.every((restaurant) => stations.includes(restaurant.nearStation)))
      .toBe(true)
  })

  it('sorts by lowest menu price in ascending order', () => {
    const results = recommendRestaurants({ sortOption: 'price-asc' })
    const lowestPrices = results.map(getLowestMenuPrice)

    expect(results).toHaveLength(restaurants.length)
    expect(isAscending(lowestPrices)).toBe(true)
  })

  it('sorts selected station results by distance from station', () => {
    const stations = ['홍대입구']
    const results = recommendRestaurants({ stations, sortOption: 'distance' })
    const expectedRestaurants = restaurants
      .filter((restaurant) => stations.includes(restaurant.nearStation))
      .toSorted(
        (firstRestaurant, secondRestaurant) =>
          firstRestaurant.distanceFromStation -
          secondRestaurant.distanceFromStation,
      )
    const distances = results.map((restaurant) => restaurant.distanceFromStation)

    isSameResultSet(results, expectedRestaurants)
    expect(isAscending(distances)).toBe(true)
  })
})
