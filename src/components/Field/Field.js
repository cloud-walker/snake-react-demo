import React from 'react'
import R from 'ramda'

import Grass from './Grass'
import {WORLD_SIZE} from '../../constants'

const iReduceToObj = R.addIndex(R.reduce)(R.__, {})

const Component = class extends React.Component {
  constructor() {
    super()
    
    const grid = Array(WORLD_SIZE).fill(
      Array(WORLD_SIZE).fill(null)
    )
    
    this.cells = iReduceToObj(
      (acc, val, y) => ({
        ...acc,
        ...iReduceToObj((acc, val, x) => {
          const id = `${y}.${x}`
          
          return {
            ...acc,
            [id]: {id, x, y},
          }
        })(val),
      })
    )(grid)
    
    console.log('cells', this.cells)
  }
  
  render() {
    return (
      <Grass 
        height={WORLD_SIZE} 
        width={WORLD_SIZE}
      />
    )
  }
}

export default Component