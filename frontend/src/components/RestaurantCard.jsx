function formatPrice(price) {
  return `${price.toLocaleString('ko-KR')}원`
}

function RestaurantCard({ restaurant, rank }) {
  return (
    <article className="restaurant-card">
      <div className="restaurant-placeholder" aria-hidden="true">
        <span>{rank}</span>
      </div>

      <div className="restaurant-content">
        <div className="restaurant-header">
          <div>
            <p className="restaurant-rank">#{rank} 추천</p>
            <h2>{restaurant.name}</h2>
          </div>
          <span className="category-pill">{restaurant.category}</span>
        </div>

        <div className="restaurant-meta" aria-label="식당 정보">
          <span>{restaurant.priceRange}</span>
          <span>
            {restaurant.district} {restaurant.dong}
          </span>
          <span>{restaurant.nearStation}역 근처</span>
        </div>

        <section className="card-section" aria-labelledby={`menus-${restaurant.id}`}>
          <h3 id={`menus-${restaurant.id}`}>메뉴</h3>
          <ul className="menu-list">
            {restaurant.menus.map((menu) => (
              <li key={`${restaurant.id}-${menu.name}`}>
                <span>{menu.name}</span>
                <strong>{formatPrice(menu.price)}</strong>
              </li>
            ))}
          </ul>
        </section>

        <section className="card-section" aria-labelledby={`reasons-${restaurant.id}`}>
          <h3 id={`reasons-${restaurant.id}`}>추천 이유</h3>
          <ul className="reason-list">
            {restaurant.reasons.length > 0 ? (
              restaurant.reasons.map((reason) => (
                <li key={`${restaurant.id}-${reason}`}>{reason}</li>
              ))
            ) : (
              <li>입력한 조건에서 부담 없이 확인해볼 만한 식당입니다.</li>
            )}
          </ul>
        </section>
      </div>
    </article>
  )
}

export default RestaurantCard
