import R from 'ramda'

const getRandomArrayValue = arr => arr[Math.floor(Math.random() * arr.length)]

const getFoodCandidate = R.pipe(
  R.values,
  R.reject(R.prop('occupied')),
  getRandomArrayValue,
)

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