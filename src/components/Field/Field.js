import React from 'react'
import R from 'ramda'

import {WORLD_SIZE} from '../../constants'
import Grass from './Grass'
import getFoodCandidate from './getFoodCandidate'

const iReduceToObj = R.addIndex(R.reduce)(R.__, {})

const grid = Array(WORLD_SIZE).fill(
  Array(WORLD_SIZE).fill(null)
)

const Component = class extends React.Component {
  constructor() {
    super()
    
    const cells = R.pipe(
      iReduceToObj(
        (acc, val, y) => ({
          ...acc,
          ...iReduceToObj((acc, val, x) => {
            const id = `${y}.${x}`
            
            return {
              ...acc,
              [id]: {id, x, y},
            }
          })(val),
        }),
      ),
    )(grid)
    
    const snake = ['0.0', '0.1']
    const food = getFoodCandidate(cells)
    
    snake.forEach(x => cells[x] = {
      ...cells[x],
      occupied: 'snake',
    })
    
    cells[food] = {
      ...cells[food],
      occupied: 'food',
    }
    
    this.state = {
      cells,
      snake,
      food,
    }
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