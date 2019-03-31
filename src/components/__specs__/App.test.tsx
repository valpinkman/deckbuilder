import React from 'react'
import ReactDOM from 'react-dom'
import App from '../App'
import { StoreContext, makeStore } from '../../store'

let Comp: any
describe('<App />', () => {
  beforeEach(() => {
    Comp = () => (
      <StoreContext.Provider value={makeStore()}>
        <App />
      </StoreContext.Provider>
    )
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    ReactDOM.render(<Comp />, div)
    ReactDOM.unmountComponentAtNode(div)
  })
})
