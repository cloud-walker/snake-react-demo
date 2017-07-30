import styled from 'styled-components'

import propToUnit from 'utils/propToUnit'
import {UNIT_SIZE} from '../constants'

export default styled.div`
  background-color: black;
  width: ${UNIT_SIZE}px;
  height: ${UNIT_SIZE}px;
  position: absolute;
  top: ${propToUnit('y')}px;
  left: ${propToUnit('x')}px;
`
