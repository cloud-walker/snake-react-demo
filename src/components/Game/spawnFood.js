import getFoodCandidate from './getFoodCandidate'

export default cells => {
  const food = getFoodCandidate(cells)
  
  food.occupied = 'food'
  
  return {
    cells: {
      ...cells,
      [food.id]: food,
    },
    food,
  }
}