export function formatBudget(budget) {
  if (budget === '' || budget === undefined || budget === null) {
    return ''
  }

  return `${Number(budget).toLocaleString('ko-KR')}원 이하`
}

export function buildFilterSummary(filters) {
  const categories = filters.categories ?? []
  const categoryDetails = filters.categoryDetails ?? {}
  const stations = filters.stations ?? []
  const categorySummary =
    categories.length > 0
      ? categories
          .map((category) => {
            const details = categoryDetails[category] ?? []

            return details.length > 0
              ? `${category}(${details.join(', ')})`
              : category
          })
          .join(', ')
      : ''
  const stationSummary =
    stations.length > 0 ? `${stations.join(', ')}역` : ''
  const summaryItems = [
    categorySummary,
    stationSummary,
    filters.purpose,
    formatBudget(filters.budget),
  ].filter(Boolean)

  if (summaryItems.length === 0) {
    return '전체 조건'
  }

  return summaryItems.join(' · ')
}
