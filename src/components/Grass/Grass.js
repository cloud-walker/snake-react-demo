import styled from 'styled-components'

import grassUrl from './grass.png'
import propToUnit from 'utils/propToUnit'

export default styled.div`
  background-image: url(${grassUrl});
  background-repeat: repeat;
  height: ${propToUnit('size')}px;
  width: ${propToUnit('size')}px;
  position: relative;
`