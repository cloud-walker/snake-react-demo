import React from 'react'

const hoc = WrappedComponent => class extends React.Component {
  static displayName = `controls(${WrappedComponent.displayName})`

  constructor() {
    super()
    this.handleKeys = this.handleKeys.bind(this)

    this.state = {
      lastKey: null,
    }

    document.addEventListener('keydown', this.handleKeys)
  }

  handleKeys(e) {
    e.preventDefault()
    this.setState({
      lastKey: e.key,
    })
  }

  render() {
    return <WrappedComponent {...this.props} lastKey={this.state.lastKey}/>
  }
}

export default hoc
