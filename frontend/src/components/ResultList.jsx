import RestaurantCard from './RestaurantCard'
import { buildFilterSummary } from '../utils/filterSummary'

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
