import { createBudgetSpecification } from './BudgetSpecification'
import { createCategorySpecification } from './CategorySpecification'
import { createPurposeSpecification } from './PurposeSpecification'
import { createStationSpecification } from './StationSpecification'

function isFilterEnabled(value) {
  return (
    value !== undefined &&
    value !== null &&
    value !== '' &&
    (!Array.isArray(value) || value.length > 0)
  )
}

const specificationFactories = [
  {
    key: 'budget',
    create(filters) {
      return createBudgetSpecification(filters.budget)
    },
  },
  {
    key: 'categories',
    create(filters) {
      return createCategorySpecification(filters.categories)
    },
  },
  {
    key: 'purpose',
    create(filters) {
      return createPurposeSpecification(filters.purpose)
    },
  },
  {
    key: 'stations',
    create(filters) {
      return createStationSpecification(filters.stations)
    },
  },
]

export function createActiveSpecifications(filters = {}) {
  return specificationFactories
    .filter(({ key }) => isFilterEnabled(filters[key]))
    .map(({ create }) => create(filters))
}
