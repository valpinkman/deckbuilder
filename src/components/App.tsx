import React, { Component } from 'react'
import { Provider } from 'react-redux'
import configureStore from '../store'

class App extends Component {
  render(): React.ReactNode {
    return (
      <Provider store={configureStore()}>
        <div className="App">Hello World</div>
      </Provider>
    )
  }
}

export default App
