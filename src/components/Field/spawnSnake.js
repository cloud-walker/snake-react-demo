import R from 'ramda'

export default cells => {
  const snake = ['0.0', '0.1']
  
  const occupiedCells = R.map(
    x => ({
      ...cells[x],
      occupied: 'snake',
    })
  )(snake)
  
  return {
    cells: {
      ...cells,
      ...occupiedCells,
    },
    snake,
  }
}