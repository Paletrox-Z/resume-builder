import React from 'react'
import { store, view } from 'react-easy-state'
import pageData from '../../../configs/pageData'
import { Button } from 'react-bootstrap'
import './styles.scss'

class HeaderWrapper extends React.Component {
  data = store({})
  constructor(props) {
    super(props)
    this.data.currentUrl = props.history.location.pathname
  }

  checkAndRoutePage = (navigationUrl = '') => {
    if (navigationUrl.length > 0 && this.data.currentUrl !== navigationUrl) {
      this.data.currentUrl = navigationUrl
      this.props.history.push(navigationUrl)
    }
  }

  renderHeaderMenuButtons = () => {
    return pageData.map((componentData) => {
      return (
        componentData.isVisible && (
          <Button
            onClick={() => this.checkAndRoutePage(componentData.urlPath)}
            key={componentData.urlPath.replace('/', '')}
            className={`p-1 my-1 mr-2 ${
              componentData.urlPath === this.data.currentUrl
                ? 'btn-light'
                : 'btn-dark'
            }`}>
            {componentData.name}
          </Button>
        )
      )
    })
  }

  render() {
    return (
      <div className='header-wrapper d-flex justify-content-start px-2'>
        {this.renderHeaderMenuButtons()}
      </div>
    )
  }
}

const Header = view(HeaderWrapper)

export default Header
export { Header }
