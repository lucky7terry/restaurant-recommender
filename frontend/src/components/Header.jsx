function Header() {
  return (
    <header className="site-header">
      <a className="brand" href="/" aria-label="FoodPick home">
        <span className="brand-mark" aria-hidden="true" />
        <span>FoodPick</span>
      </a>
      <nav className="site-nav" aria-label="Main navigation">
        <a href="/">Home</a>
        <a href="/about">About</a>
      </nav>
    </header>
  )
}

export default Header
