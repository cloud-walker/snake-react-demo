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
const food = getFoodCandidate(snake, cells)

const enhance = controls

const Component = class extends React.Component {
  static displayName = 'Game'

  frames = 0
  direction = 'right'

  get snakeCells() {
    return this.state.snake.map(i => cells[i])
  }

  get foodCell() {
    return cells[this.state.food]
  }

  get worldLimit() {
    return WORLD_SIZE - 1
  }

  constructor() {
    super()
    this.frame = this.frame.bind(this)

    this.state = {
      snake,
      food,
    }

    requestAnimationFrame(this.frame)
  }

  componentDidUpdate(prevProps, prevState) {
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
        if (!['top', 'bottom'].includes(this.direction)) {
          this.direction = 'bottom'
        }
        break
      }
      case 'ArrowUp': {
        if (!['top', 'bottom'].includes(this.direction)) {
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
      default: {
        throw new Error('direction got an invalid value')
      }
    }
  }

  moveSnake() {
    const head = R.last(this.snakeCells)

    const nextCell = cells[this.getNextPosition(head.id)]

    if (R.contains(nextCell.id)(this.state.snake)) {
      this.setState({
        gameOver: true,
      })
      return
    }

    if (nextCell.id === this.foodCell.id) {
      const snake = R.append(nextCell.id)(this.state.snake)
      const food = getFoodCandidate(snake, cells)

      const nextState = {
        snake,
        food,
      }

      this.setState(nextState)
      return
    }

    const nextState = {
      snake: R.pipe(
        R.tail,
        R.append(nextCell.id),
      )(this.state.snake),
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
      gameOver: this.state.gameOver,
    })
  }
}

export default enhance(Component)
