import {Component} from 'react'

import Loader from 'react-loader-spinner'

import EachItem from './EachItem'

import './App.css'

//  This is the list (static data) used in the application. You can move it to any component if needed.

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apiConstnats = {
  initial: 'INITIAL',
  loading: 'LOADING',
  fail: 'FAIL',
  success: 'SUCCESS',
}

class App extends Component {
  state = {
    apiStatus: apiConstnats.initial,
    category: 'ALL',
    categoryItem: [],
  }

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({
      apiStatus: apiConstnats.loading,
    })

    const {category} = this.state
    const apiUrl = `https://apis.ccbp.in/ps/projects?category=${category}`
    const options = {
      method: 'GET',
    }

    const response = await fetch(apiUrl, options)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      const upadateData = data.projects.map(each => ({
        id: each.id,
        imageUrl: each.image_url,
        name: each.name,
      }))

      this.setState({
        apiStatus: apiConstnats.success,
        categoryItem: upadateData,
      })
    } else {
      this.setState({
        apiStatus: apiConstnats.fail,
      })
    }
  }

  onChaneSelect = event => {
    this.setState(
      {
        category: event.target.value,
      },
      this.getData,
    )
  }

  onCLickRetry = () => {
    this.getData()
  }

  renderLoading = () => (
    <div data-testid="loader" className="loader-container">
      <Loader type="ThreeDots" color="##0b69ff" height="50" width="50" />
    </div>
  )

  renderSuccessView = () => {
    const {categoryItem} = this.state

    return (
      <ul className="ul-list">
        {categoryItem.map(each => (
          <EachItem key={each.id} item={each} />
        ))}
      </ul>
    )
  }

  renderFailView = () => {
    const failImg =
      'https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png'

    return (
      <div className="fail-container">
        <img src={failImg} alt="failure view" className="fail-img" />
        <h1 className="fail-heading"> Oops! Something Went Wrong </h1>
        <p className="fail-para">
          We cannot seem to find the page you are looking for
        </p>
        <button type="button" className="retry" onClick={this.onCLickRetry}>
          Retry
        </button>
      </div>
    )
  }

  renderApiView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstnats.loading:
        return this.renderLoading()
      case apiConstnats.success:
        return this.renderSuccessView()
      case apiConstnats.fail:
        return this.renderFailView()
      default:
        return null
    }
  }

  render() {
    const {category} = this.state
    const webLogo =
      'https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png'
    return (
      <div className="app-container">
        <div className="main-container">
          <div className="header-container">
            <img src={webLogo} alt="website logo" className="web-logo" />
          </div>

          <div className="inner-container">
            <select
              onChange={this.onChaneSelect}
              value={category}
              className="select"
            >
              {categoriesList.map(each => (
                <option key={each.id} value={each.id} className="option">
                  {each.displayText}
                </option>
              ))}
            </select>
            {this.renderApiView()}
          </div>
        </div>
      </div>
    )
  }
}

export default App
