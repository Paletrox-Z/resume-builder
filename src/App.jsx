import React from 'react'
import { store, view } from 'react-easy-state'
import { Router, Route, Switch } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { Header } from 'src/shared'
import pageData from 'configs/pageData'
import './styles.scss'

const customHistory = createBrowserHistory()

const Component = (props) => {
  const urlPath = props.history.location.pathname
  let pageComponentData = false
  pageData.find((componentData) => {
    if (componentData.urlPath === urlPath) {
      pageComponentData = componentData
    }
  })
  const { PageComponent = <React.Fragment /> } = pageComponentData
  return (
    <React.Fragment>
      {pageComponentData && (
        <Route path={urlPath} component={() => <PageComponent {...props} />} />
      )}
      {!pageComponentData && <React.Fragment>No Info</React.Fragment>}
    </React.Fragment>
  )
}

class AppWrapper extends React.Component {
  data = store({})

  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Router history={customHistory}>
        <Header history={customHistory} />
        <Switch>
          <Component history={customHistory} {...this.props} />
        </Switch>
      </Router>
    )
  }
}

const App = view(AppWrapper)

export default App
export { App }
