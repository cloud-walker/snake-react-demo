import React from 'react'
import ReactDOM from 'react-dom'
import {injectGlobal} from 'styled-components'

import 'sanitize.css'
import App from './components/App'

injectGlobal`
  :root {
    font-size: 18px;
  }
`

ReactDOM.render(<App />, document.getElementById('root'))
