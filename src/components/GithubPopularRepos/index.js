import {Component} from 'react'
import Loader from 'react-loader-spinner'

import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import './index.css'

const languageFiltersData = [
  {id: 'ALL', language: 'All'},
  {id: 'JAVASCRIPT', language: 'Javascript'},
  {id: 'RUBY', language: 'Ruby'},
  {id: 'JAVA', language: 'Java'},
  {id: 'CSS', language: 'CSS'},
]

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  inProgress: 'IN_PROGRESS',
  failure: 'FAILURE',
}

class GithubPopularReps extends Component {
  state = {
    activeFilter: languageFiltersData[0].id,
    languagesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getRepositories()
  }

  getRepositories = async () => {
    const {activeFilter} = this.state
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const apiUrl = `https://apis.ccbp.in/popular-repos?language=${activeFilter}`
    const response = await fetch(apiUrl)
    const data = await response.json()
    const formattedData = data.popular_repos.map(each => ({
      id: each.id,
      avatarUrl: each.avatar_url,
      name: each.name,
      starsCount: each.stars_count,
      forksCount: each.forks_count,
      issuesCount: each.issues_count,
    }))
    console.log(response)
    if (response.ok === true) {
      this.setState({
        languagesList: formattedData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 401) {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  updateActiveFilter = activeFilter => {
    this.setState(
      {
        activeFilter,
      },
      this.getRepositories,
    )
  }

  renderRepositories = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.renderLanguages()
      case 'IN_PROGRESS':
        return this.renderLoader()
      case 'FAILURE':
        return this.renderFailureView()

      default:
        return null
    }
  }

  renderFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-image"
      />
      <p className="failure-text">Something Went Wrong</p>
    </div>
  )

  renderLanguages = () => {
    const {languagesList} = this.state
    return languagesList.map(each => (
      <RepositoryItem key={each.id} repositoryDetails={each} />
    ))
  }

  renderLoader = () => (
    <div className="loader-container">
      <Loader type="ThreeDots" color="#0284c7" height={70} width={70} />
    </div>
  )

  render() {
    const {activeFilter} = this.state
    return (
      <div className="app-container">
        <h1 className="popular-heading">Popular</h1>
        <ul className="language-filter-container">
          {languageFiltersData.map(each => (
            <LanguageFilterItem
              key={each.id}
              filterData={each}
              isActive={activeFilter === each.id}
              updateActiveFilter={this.updateActiveFilter}
            />
          ))}
        </ul>
        <ul className="languages-container">{this.renderRepositories()}</ul>
      </div>
    )
  }
}

export default GithubPopularReps
