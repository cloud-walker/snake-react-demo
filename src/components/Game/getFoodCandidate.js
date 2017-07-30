import R from 'ramda'

const getRandomArrayValue = arr => arr[Math.floor(Math.random() * arr.length)]

export default (snake, cells) => R.pipe(
  R.values,
  R.reject(cell => R.contains(cell.id)(snake)),
  getRandomArrayValue,
  R.prop('id'),
)(cells)
