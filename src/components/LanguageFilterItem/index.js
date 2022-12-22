import './index.css'

const LanguageFilterItem = props => {
  const {filterData, isActive, updateActiveFilter} = props
  const {id, language} = filterData

  const activeBtnStyle = isActive ? 'active-btn' : ''

  const onClickActiveFilter = () => {
    updateActiveFilter(id)
  }

  return (
    <li className="filter-item">
      <button
        onClick={onClickActiveFilter}
        className={`filter-button ${activeBtnStyle}`}
        type="button"
      >
        {language}
      </button>
    </li>
  )
}

export default LanguageFilterItem
