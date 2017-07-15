import React from 'react'
import styled from 'styled-components'

import grassUrl from './grass.png'

const Content = styled.main`
  display: flex;
  flex-direction: column;
`

const World = styled.div`
  background-image: url(${grassUrl});
  background-repeat: repeat;
  height: 100px;
  width: 100px;
`

const Component = () => (
  <Content>
    <World>
      Snake!
    </World>
  </Content>
)

export default Component
