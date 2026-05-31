import { createBudgetSpecification } from './BudgetSpecification'
import { createCategorySpecification } from './CategorySpecification'
import { createPurposeSpecification } from './PurposeSpecification'

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
]

export function createActiveSpecifications(filters = {}) {
  return specificationFactories
    .filter(({ key }) => isFilterEnabled(filters[key]))
    .map(({ create }) => create(filters))
}
