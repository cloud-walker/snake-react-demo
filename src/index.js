import React from 'react'
import ReactDOM from 'react-dom'
import {injectGlobal} from 'styled-components'

import 'sanitize.css'
import App from 'components/App'

/* eslint-disable */
injectGlobal`
  :root {
    font-size: 18px;
    line-height: 1.5;
  }
  
  h1, h2, h3, h4, h5, h6 {
    margin: 0;
  }
`
/* eslint-enable */

ReactDOM.render(<App />, document.getElementById('root'))
