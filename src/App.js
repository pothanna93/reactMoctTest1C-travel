import {Component} from 'react'
import Loader from 'react-loader-spinner'

import './App.css'

class App extends Component {
  state = {
    travelList: [],
    isLoading: true,
  }

  componentDidMount() {
    this.getTravelData()
  }

  getTravelData = async () => {
    const api = 'https://apis.ccbp.in/tg/packages'
    const options = {
      method: 'GET',
    }

    const response = await fetch(api, options)
    const data = await response.json()
    const fetchedData = data.packages.map(eachItem => ({
      id: eachItem.id,
      description: eachItem.description,
      name: eachItem.name,
      imageUrl: eachItem.image_url,
    }))
    this.setState({
      travelList: fetchedData,
      isLoading: false,
    })
  }

  renderLoader = () => (
    <div>
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  render() {
    const {travelList, isLoading} = this.state
    return (
      <div className="app-container">
        <h1 className="heading">Travel Guide</h1>
        {isLoading ? (
          this.renderLoader()
        ) : (
          <ul className="ul-list">
            {travelList.map(eachValue => (
              <li key={eachValue.id} className="list-item">
                <img
                  src={eachValue.imageUrl}
                  alt={eachValue.name}
                  className="image"
                />
                <h1 className="title">{eachValue.name}</h1>
                <p className="description">{eachValue.description}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    )
  }
}

export default App
