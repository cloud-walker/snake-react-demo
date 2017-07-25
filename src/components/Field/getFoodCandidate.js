import R from 'ramda'

const getRandomArrayValue = arr => arr[Math.floor(Math.random() * arr.length)]

export default R.pipe(
  R.values,
  R.reject(R.prop('occupied')),
  getRandomArrayValue,
  R.prop('id'),
)