import React from 'react'
import ReactDOM from 'react-dom'
import {injectGlobal} from 'styled-components'

import 'sanitize.css'
import App from './components/App'

/* eslint-disable */
injectGlobal`
  :root {
    font-size: 18px;
  }
`
/* eslint-enable */

ReactDOM.render(<App />, document.getElementById('root'))
