import React from 'react'
import styled from 'styled-components'

import Field from '../Field'

const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
`

const DebugBox = styled.pre`
  background-color: yellow;
  color: brown;
  border: 0.1em solid;
  padding: 0.5em;
  font-weight: bold;
  
  h6 {
    margin: 0;
  }
`

const Component = class extends React.Component {
  render() {
    return (
      <Content>
        <Field />
        
        <DebugBox>
          <h6>Render's state</h6>
          
          {JSON.stringify({}, null, 2)}
        </DebugBox>
      </Content>
    )
  }
}

export default Component
