import RestaurantCard from './RestaurantCard'

function formatBudget(budget) {
  if (budget === '' || budget === undefined || budget === null) {
    return ''
  }

  return `${Number(budget).toLocaleString('ko-KR')}원 이하`
}

function buildFilterSummary(filters) {
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

function ResultList({
  filters,
  restaurants,
  sortOption,
  onSortOptionChange,
  onEditFilters,
}) {
  const hasSelectedStation = (filters.stations ?? []).length > 0

  return (
    <section className="result-screen" aria-labelledby="result-title">
      <div className="result-topbar">
        <button className="back-action" type="button" onClick={onEditFilters}>
          ← 조건 수정
        </button>
        <div className="result-heading">
          <div>
            <h1 id="result-title">추천 결과 ({restaurants.length}곳)</h1>
            <p>{buildFilterSummary(filters)}</p>
          </div>
          <label className="sort-control">
            <span>정렬 기준</span>
            <select
              value={sortOption}
              onChange={(event) => onSortOptionChange(event.target.value)}
            >
              <option value="distance">
                {hasSelectedStation ? '가까운 순' : '기본 추천순'}
              </option>
              <option value="price-desc">높은 가격순</option>
              <option value="price-asc">낮은 가격순</option>
            </select>
          </label>
        </div>
      </div>

      <div className="result-list">
        {restaurants.map((restaurant, index) => (
          <RestaurantCard
            key={restaurant.id}
            restaurant={restaurant}
            rank={index + 1}
          />
        ))}
      </div>
    </section>
  )
}

export default ResultList
