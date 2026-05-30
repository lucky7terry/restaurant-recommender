import { useState } from 'react'
import EmptyState from './components/EmptyState'
import Header from './components/Header'
import ResultList from './components/ResultList'
import SearchForm from './components/SearchForm'
import { recommendRestaurants } from './services/recommendService'
import './App.css'

function App() {
  const [budget, setBudget] = useState('')
  const [category, setCategory] = useState('')
  const [submittedFilters, setSubmittedFilters] = useState(null)
  const [recommendations, setRecommendations] = useState([])

  const runRecommendation = (filters) => {
    const recommendedRestaurants = recommendRestaurants(filters)

    setSubmittedFilters(filters)
    setRecommendations(recommendedRestaurants)
  }

  const handleSubmit = () => {
    runRecommendation({
      budget: budget === '' ? '' : Number(budget),
      category,
    })
  }

  const handleReset = () => {
    setBudget('')
    setCategory('')
    setSubmittedFilters(null)
    setRecommendations([])
  }

  const handleEditFilters = () => {
    setSubmittedFilters(null)
    setRecommendations([])
  }

  const handleIncreaseBudget = () => {
    const currentBudget =
      submittedFilters.budget === '' ? 0 : Number(submittedFilters.budget)
    const increasedBudget = currentBudget + 5000
    const filters = {
      ...submittedFilters,
      budget: increasedBudget,
    }

    setBudget(String(increasedBudget))
    runRecommendation(filters)
  }

  const handleChangeCategory = () => {
    setCategory('')
    setSubmittedFilters(null)
    setRecommendations([])
  }

  const hasSubmittedFilters = submittedFilters !== null
  const hasRecommendations = recommendations.length > 0

  return (
    <div className="app">
      <Header />
      <main className="app-main">
        {hasSubmittedFilters && hasRecommendations ? (
          <ResultList
            filters={submittedFilters}
            restaurants={recommendations}
            onEditFilters={handleEditFilters}
          />
        ) : hasSubmittedFilters ? (
          <EmptyState
            filters={submittedFilters}
            onIncreaseBudget={handleIncreaseBudget}
            onChangeCategory={handleChangeCategory}
            onResetFilters={handleEditFilters}
          />
        ) : (
          <>
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
          </>
        )}
      </main>
      <footer className="app-footer">© 2025 FoodPick — MVP v1.0</footer>
    </div>
  )
}

export default App
