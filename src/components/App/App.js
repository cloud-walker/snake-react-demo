import React from 'react'
import styled from 'styled-components'

import grassUrl from './grass.png'
import propToUnit from '../../utils/propToUnit'
import {WORLD_SIZE} from '../../constants'

const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`

const World = styled.div`
  background-image: url(${grassUrl});
  background-repeat: repeat;
  height: ${propToUnit('height')}px;
  width: ${propToUnit('width')}px;
`

const Debug = styled.pre`
  background-color: yellow;
  color: brown;
  border: 0.1em solid;
  padding: 0.5em;
  font-weight: bold;
  
  h6 {
    margin: 0;
  }
`

const Component = () => (
  <Content>
    <World height={WORLD_SIZE} width={WORLD_SIZE}/>
    
    <Debug>
      <h6>Render's state</h6>
      
      {JSON.stringify({}, null, 2)}
    </Debug>
  </Content>
)

export default Component
