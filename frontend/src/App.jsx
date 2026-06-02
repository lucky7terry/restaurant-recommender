import { useState } from 'react'
import EmptyState from './components/EmptyState'
import Header from './components/Header'
import ResultList from './components/ResultList'
import SearchForm from './components/SearchForm'
import { recommendRestaurants } from './services/recommendService'
import './App.css'

const DEFAULT_SORT_OPTION = 'distance'
const DEFAULT_CATEGORY_DETAILS = {
  아시안: [],
  기타: [],
}

function App() {
  const [budget, setBudget] = useState('')
  const [categories, setCategories] = useState([])
  const [categoryDetails, setCategoryDetails] = useState(
    DEFAULT_CATEGORY_DETAILS,
  )
  const [purpose, setPurpose] = useState('')
  const [stations, setStations] = useState([])
  const [sortOption, setSortOption] = useState(DEFAULT_SORT_OPTION)
  const [submittedFilters, setSubmittedFilters] = useState(null)
  const [recommendations, setRecommendations] = useState([])

  const runRecommendation = (filters) => {
    const nextFilters = {
      ...filters,
      sortOption: filters.sortOption ?? sortOption,
    }
    const recommendedRestaurants = recommendRestaurants(nextFilters)

    setSubmittedFilters(nextFilters)
    setRecommendations(recommendedRestaurants)
  }

  const handleSubmit = () => {
    runRecommendation({
      budget: budget === '' ? '' : Number(budget),
      categories,
      categoryDetails,
      purpose,
      stations,
      sortOption,
    })
  }

  const handleCategoryToggle = (selectedCategory) => {
    setCategories((currentCategories) =>
      currentCategories.includes(selectedCategory)
        ? currentCategories.filter((category) => category !== selectedCategory)
        : [...currentCategories, selectedCategory],
    )

    if (DEFAULT_CATEGORY_DETAILS[selectedCategory]) {
      setCategoryDetails((currentDetails) => ({
        ...currentDetails,
        [selectedCategory]: [],
      }))
    }
  }

  const handleCategoryDetailToggle = (parentCategory, selectedDetail) => {
    setCategoryDetails((currentDetails) => {
      const currentParentDetails = currentDetails[parentCategory] ?? []
      const nextParentDetails = currentParentDetails.includes(selectedDetail)
        ? currentParentDetails.filter((detail) => detail !== selectedDetail)
        : [...currentParentDetails, selectedDetail]

      return {
        ...currentDetails,
        [parentCategory]: nextParentDetails,
      }
    })
  }

  const handleStationToggle = (selectedStation) => {
    setStations((currentStations) =>
      currentStations.includes(selectedStation)
        ? currentStations.filter((station) => station !== selectedStation)
        : [...currentStations, selectedStation],
    )
  }

  const handleReset = () => {
    setBudget('')
    setCategories([])
    setCategoryDetails(DEFAULT_CATEGORY_DETAILS)
    setPurpose('')
    setStations([])
    setSortOption(DEFAULT_SORT_OPTION)
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
    setCategories([])
    setCategoryDetails(DEFAULT_CATEGORY_DETAILS)
    setSubmittedFilters(null)
    setRecommendations([])
  }

  const handleSortOptionChange = (nextSortOption) => {
    setSortOption(nextSortOption)

    if (submittedFilters) {
      runRecommendation({
        ...submittedFilters,
        sortOption: nextSortOption,
      })
    }
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
            sortOption={sortOption}
            onSortOptionChange={handleSortOptionChange}
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
              categories={categories}
              categoryDetails={categoryDetails}
              purpose={purpose}
              stations={stations}
              onBudgetChange={setBudget}
              onCategoryToggle={handleCategoryToggle}
              onCategoryDetailToggle={handleCategoryDetailToggle}
              onPurposeChange={setPurpose}
              onStationToggle={handleStationToggle}
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
