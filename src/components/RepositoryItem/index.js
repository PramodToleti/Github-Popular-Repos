import './index.css'

const RepositoryItem = props => {
  const {repositoryDetails} = props
  const {
    avatarUrl,
    name,
    starsCount,
    forksCount,
    issuesCount,
  } = repositoryDetails
  return (
    <li className="repository-container">
      <img src={avatarUrl} alt={name} className="repo-image" />
      <h1 className="repo-name">{name}</h1>
      <div className="stats-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/stars-count-img.png"
          alt="stars"
          className="repo-icons"
        />
        <p className="repo-stats">{starsCount} stars</p>
      </div>
      <div className="stats-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/forks-count-img.png"
          alt="forks"
          className="repo-icons"
        />
        <p className="repo-stats">{forksCount} forks</p>
      </div>
      <div className="stats-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/issues-count-img.png"
          alt="open issues"
          className="repo-icons"
        />
        <p className="repo-stats">{issuesCount} open issues</p>
      </div>
    </li>
  )
}

export default RepositoryItem
