import R from 'ramda'

import {UNIT_SIZE} from '../constants'

export default prop => R.pipe(R.prop(prop), R.multiply(UNIT_SIZE))
