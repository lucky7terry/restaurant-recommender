const FOOD_CATEGORIES = [
  '한식',
  '중식',
  '일식',
  '양식',
  '분식',
  '패스트푸드',
  '치킨',
  '피자',
  '카페/디저트',
  '아시안',
  '기타',
]

const CATEGORY_LABELS = {
  아시안: '🌏 아시안',
  기타: '🌍 기타',
}

const CATEGORY_DETAIL_OPTIONS = {
  아시안: [
    { label: '🇻🇳 베트남', value: '베트남' },
    { label: '🇹🇭 태국', value: '태국' },
    { label: '🇮🇳 인도', value: '인도' },
    { label: '🇮🇩 인도네시아', value: '인도네시아' },
  ],
  기타: [
    { label: '🇫🇷 프랑스', value: '프랑스' },
    { label: '🇲🇽 멕시칸', value: '멕시칸' },
    { label: '🇪🇸 스페인', value: '스페인' },
    { label: '🌱 비건', value: '비건' },
  ],
}

const DINING_PURPOSES = ['혼밥', '데이트', '친구모임', '직장점심']

const STATION_OPTIONS = [
  '홍대입구',
  '공덕',
  '합정',
  '상수',
  '마포',
  '망원',
  '디지털미디어시티',
  '대흥',
  '마포구청',
]

function formatBudgetValue(value) {
  if (value === '' || value === undefined || value === null) {
    return ''
  }

  return Number(value).toLocaleString('ko-KR')
}

function normalizeBudgetInput(value) {
  return value.replace(/[^\d]/g, '')
}

function SearchForm({
  budget,
  categories,
  categoryDetails,
  purpose,
  stations,
  onBudgetChange,
  onCategoryToggle,
  onCategoryDetailToggle,
  onPurposeChange,
  onStationToggle,
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
            type="text"
            inputMode="numeric"
            placeholder="₩ 최대 예산을 입력하세요. (예: 15,000)"
            value={formatBudgetValue(budget)}
            onChange={(event) =>
              onBudgetChange(normalizeBudgetInput(event.target.value))
            }
          />
          <span className="currency-badge">KRW</span>
        </div>
      </div>

      <div className="field-group">
        <p className="field-label">
          FOOD CATEGORY <span>(음식 종류)</span>
        </p>
        <div className="category-grid">
          {FOOD_CATEGORIES.map((foodCategory) => {
            const isSelected = categories.includes(foodCategory)
            const detailCount = categoryDetails[foodCategory]?.length ?? 0
            const label = CATEGORY_LABELS[foodCategory] ?? foodCategory

            return (
              <button
                key={foodCategory}
                type="button"
                className={`category-button${
                  isSelected ? ' is-selected' : ''
                }`}
                aria-pressed={isSelected}
                onClick={() => onCategoryToggle(foodCategory)}
              >
                {label}
                {detailCount > 0 ? ` (${detailCount})` : ''}
              </button>
            )
          })}
        </div>
        {FOOD_CATEGORIES.map((foodCategory) => {
          const detailOptions = CATEGORY_DETAIL_OPTIONS[foodCategory]

          if (!detailOptions || !categories.includes(foodCategory)) {
            return null
          }

          return (
            <div className="category-detail-panel" key={`${foodCategory}-details`}>
              {detailOptions.map((option) => {
                const isChecked = categoryDetails[foodCategory]?.includes(
                  option.value,
                )

                return (
                  <label
                    className={`category-detail-option${
                      isChecked ? ' is-selected' : ''
                    }`}
                    key={option.value}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() =>
                        onCategoryDetailToggle(foodCategory, option.value)
                      }
                    />
                    <span>{option.label}</span>
                  </label>
                )
              })}
            </div>
          )
        })}
      </div>

      <div className="field-group">
        <p className="field-label">
          NEAR STATION <span>(가까운 역)</span>
        </p>
        <div className="category-grid">
          {STATION_OPTIONS.map((station) => (
            <button
              key={station}
              type="button"
              className={`category-button${
                stations.includes(station) ? ' is-selected' : ''
              }`}
              aria-pressed={stations.includes(station)}
              onClick={() => onStationToggle(station)}
            >
              {station}
            </button>
          ))}
        </div>
      </div>

      <div className="field-group">
        <p className="field-label">
          DINING PURPOSE <span>(식사 목적)</span>
        </p>
        <div className="purpose-grid">
          {DINING_PURPOSES.map((diningPurpose) => {
            const isSelected = purpose === diningPurpose

            return (
              <button
                key={diningPurpose}
                type="button"
                className={`category-button${
                  isSelected ? ' is-selected' : ''
                }`}
                aria-pressed={isSelected}
                onClick={() => onPurposeChange(isSelected ? '' : diningPurpose)}
              >
                {diningPurpose}
              </button>
            )
          })}
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
