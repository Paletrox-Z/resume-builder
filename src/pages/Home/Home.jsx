import React from 'react'
import { store, view } from 'react-easy-state'
import './styles.scss'

class HomeWrapper extends React.Component {
  data = store({})

  constructor(props) {
    super(props)
  }

  render() {
    return <React.Fragment>Welcome To Resume Builder</React.Fragment>
  }
}

const Home = view(HomeWrapper)

export default Home
export { Home }
