import React from 'react'
import ReactDOM from 'react-dom'
import {injectGlobal} from 'styled-components'
import R from 'ramda'

import 'sanitize.css'
import App from './components/App'
import {WORLD_SIZE} from './constants'

/* eslint-disable */
injectGlobal`
  :root {
    font-size: 18px;
  }
`
/* eslint-enable */

const grid = Array(WORLD_SIZE)
  .fill(Array(WORLD_SIZE).fill(0))
  
const cells = R.pipe(
  R.addIndex(R.reduce)((acc, val, y) => {
    const res = R.addIndex(R.reduce)((acc, val, x) => {
      const id = `${x}.${y}`
      
      return {
        ...acc,
        [id]: {id, x, y},
      }
    }, {})(val)
    
    return {
      ...acc,
      ...res,
    }
  }, {}),
)(grid)
  
console.log('cells', cells)

ReactDOM.render(<App />, document.getElementById('root'))
