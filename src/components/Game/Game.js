import React from 'react'
import R from 'ramda'

import {WORLD_SIZE} from '../../constants'
import getFoodCandidate from './getFoodCandidate'
import controls from 'hocs/controls'

const iReduceToObj = R.addIndex(R.reduce)(R.__, {})

const grid = Array(WORLD_SIZE).fill(
  Array(WORLD_SIZE).fill(null)
)

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

const enhance = controls

const Component = class extends React.Component {
  static displayName = 'Game'

  frames = 0
  direction = 'right'

  get snakeCells() {
    const {snake, cells} = this.state

    return snake.map(i => cells[i])
  }

  get foodCell() {
    return this.state.cells[this.state.food]
  }

  get worldLimit() {
    return WORLD_SIZE - 1
  }

  constructor() {
    super()
    this.frame = this.frame.bind(this)

    this.state = {
      cells,
      snake,
      food,
    }

    requestAnimationFrame(this.frame)
  }

  // shouldComponentUpdate(nextProps, nextState) {
  //   return true
  // }

  componentDidUpdate(prevProps, prevState) {
    console.log('asdad', this.props)
    switch (this.props.lastKey) {
      case 'ArrowLeft': {
        if (!['right', 'left'].includes(this.direction)) {
          this.direction = 'left'
        }
        break
      }
      case 'ArrowRight': {
        if (!['right', 'left'].includes(this.direction)) {
          this.direction = 'right'
        }
        break
      }
      case 'ArrowDown': {
        if (!['up', 'down'].includes(this.direction)) {
          this.direction = 'bottom'
        }
        break
      }
      case 'ArrowUp': {
        if (!['up', 'down'].includes(this.direction)) {
          this.direction = 'top'
        }
        break
      }
      default: {
        this.direction = 'right'
      }
    }
  }

  getNextPosition(id) {
    const [y, x] = R.pipe(
      R.split('.'),
      R.map(Number),
    )(id)

    switch (this.direction) {
      case 'right': {
        const nextX = x + 1 <= this.worldLimit ? x + 1 : 0
        return `${y}.${nextX}`
      }
      case 'left': {
        const nextX = x - 1 >= 0 ? x -1 : this.worldLimit

        return `${y}.${nextX}`
      }
      case 'top': {
        const nextY = y - 1 < 0 ? this.worldLimit : y - 1

        return `${nextY}.${x}`
      }
      case 'bottom': {
        const nextY = y + 1 > this.worldLimit ? 0 : y + 1

        return `${nextY}.${x}`
      }
    }
  }

  moveSnake() {
    const head = R.last(this.snakeCells)
    const tail = R.head(this.snakeCells)

    const nextCell = this.state.cells[this.getNextPosition(head.id)]

    console.log('nextCell', nextCell)

    const nextState = {
      snake: R.pipe(
        R.tail,
        R.append(nextCell.id),
      )(this.state.snake),
      cells: R.pipe(
        R.set(R.lensProp(nextCell.id), nextCell),
        R.over(R.lensProp(tail.id), R.dissoc('occupied'))
      )(this.state.cells),
    }

    /**
     * Here the move should be safe
     */
    this.setState(nextState)
  }

  frame() {
    this.frames++

    if (this.frames === 15) {
      this.frames = 0
      this.moveSnake()
    }

    requestAnimationFrame(this.frame)
  }

  render() {
    return this.props.children({
      snake: this.snakeCells,
      food: this.foodCell,
    })
  }
}

export default enhance(Component)
