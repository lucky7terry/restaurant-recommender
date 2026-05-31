function formatBudget(budget) {
  if (budget === '' || budget === undefined || budget === null) {
    return ''
  }

  return `${Number(budget).toLocaleString('ko-KR')}원 이하`
}

function buildFilterSummary(filters) {
  const categories = filters.categories ?? []
  const stations = filters.stations ?? []
  const categorySummary = categories.length > 0 ? categories.join(', ') : ''
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

function EmptyState({
  filters,
  onIncreaseBudget,
  onChangeCategory,
  onResetFilters,
}) {
  return (
    <section className="empty-screen" aria-labelledby="empty-title">
      <div className="result-topbar empty-topbar">
        <div>
          <h1 id="empty-title">추천 결과 (0곳)</h1>
          <p>{buildFilterSummary(filters)}</p>
        </div>
      </div>

      <div className="empty-panel">
        <div className="empty-placeholder" aria-hidden="true" />
        <h2>조건에 맞는 식당이 없어요</h2>
        <p>예산을 높이거나 카테고리를 변경해 보세요.</p>

        <div className="empty-actions">
          <button className="primary-action" type="button" onClick={onIncreaseBudget}>
            예산 높이기
          </button>
          <button
            className="secondary-action"
            type="button"
            onClick={onChangeCategory}
          >
            카테고리 변경
          </button>
          <button className="reset-action" type="button" onClick={onResetFilters}>
            조건 다시 설정하기
          </button>
        </div>
      </div>
    </section>
  )
}

export default EmptyState
