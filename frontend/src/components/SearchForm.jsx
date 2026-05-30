const FOOD_CATEGORIES = [
  '한식',
  '중식',
  '일식',
  '양식',
  '분식',
  '패스트푸드',
  '카페',
  '아시안',
  '기타',
]

function SearchForm({
  budget,
  category,
  onBudgetChange,
  onCategoryChange,
  onSubmit,
  onReset,
}) {
  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit()
  }

  return (
    <form className="search-card" onSubmit={handleSubmit}>
      <div className="field-group">
        <label className="field-label" htmlFor="budget">
          BUDGET <span>(예산)</span>
        </label>
        <div className="budget-control">
          <input
            id="budget"
            type="number"
            min="0"
            inputMode="numeric"
            placeholder="₩ 최대 예산을 입력하세요. (예: 15000)"
            value={budget}
            onChange={(event) => onBudgetChange(event.target.value)}
          />
          <span className="currency-badge">KRW</span>
        </div>
      </div>

      <div className="field-group">
        <p className="field-label">
          FOOD CATEGORY <span>(음식 종류)</span>
        </p>
        <div className="category-grid">
          {FOOD_CATEGORIES.map((foodCategory) => (
            <button
              key={foodCategory}
              type="button"
              className={`category-button${
                category === foodCategory ? ' is-selected' : ''
              }`}
              onClick={() => onCategoryChange(foodCategory)}
            >
              {foodCategory}
            </button>
          ))}
        </div>
      </div>

      <div className="form-actions">
        <button className="primary-action" type="submit">
          식당 추천 받기 →
        </button>
        <button className="reset-action" type="button" onClick={onReset}>
          조건 초기화
        </button>
      </div>
    </form>
  )
}

export default SearchForm
