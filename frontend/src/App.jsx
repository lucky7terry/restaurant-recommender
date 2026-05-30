import { useState } from 'react'
import Header from './components/Header'
import SearchForm from './components/SearchForm'
import './App.css'

function App() {
  const [budget, setBudget] = useState('')
  const [category, setCategory] = useState('')

  const handleSubmit = () => {
    const filters = {
      budget: budget === '' ? '' : Number(budget),
      category,
    }

    console.log(filters)
  }

  const handleReset = () => {
    setBudget('')
    setCategory('')
  }

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        <section className="intro" aria-labelledby="screen-title">
          <h1 id="screen-title">오늘 뭐 먹지?</h1>
          <p>조건을 입력하면 딱 맞는 식당을 추천해 드려요.</p>
          <p>Enter your preferences to get restaurant recommendations.</p>
        </section>
        <SearchForm
          budget={budget}
          category={category}
          onBudgetChange={setBudget}
          onCategoryChange={setCategory}
          onSubmit={handleSubmit}
          onReset={handleReset}
        />
      </main>
      <footer className="app-footer">© 2025 FoodPick — MVP v1.0</footer>
    </div>
  )
}

export default App
