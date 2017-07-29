import React from 'react'
import styled from 'styled-components'

import DebugBox from 'components/DebugBox'
import Field from 'components/Field'

const Content = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
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
