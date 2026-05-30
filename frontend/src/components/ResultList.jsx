import RestaurantCard from './RestaurantCard'

function formatBudget(budget) {
  if (budget === '' || budget === undefined || budget === null) {
    return ''
  }

  return `${Number(budget).toLocaleString('ko-KR')}원 이하`
}

function buildFilterSummary(filters) {
  const summaryItems = [filters.category, formatBudget(filters.budget)].filter(Boolean)

  if (summaryItems.length === 0) {
    return '전체 조건'
  }

  return summaryItems.join(' · ')
}

function ResultList({ filters, restaurants, onEditFilters }) {
  return (
    <section className="result-screen" aria-labelledby="result-title">
      <div className="result-topbar">
        <button className="back-action" type="button" onClick={onEditFilters}>
          ← 조건 수정
        </button>
        <div>
          <h1 id="result-title">추천 결과 ({restaurants.length}곳)</h1>
          <p>{buildFilterSummary(filters)}</p>
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
