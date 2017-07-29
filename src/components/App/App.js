import React from 'react'
import styled from 'styled-components'

import DebugBox from 'components/DebugBox'
import Game from 'components/Game'
import Grass from 'components/Grass'
import propToUnit from 'utils/propToUnit'

const Content = styled.main`
  display: flex;
  align-items: center;
  justify-content: space-around;
  min-height: 100vh;
  background-color: #333;
`

const SnakeFrag = styled.div`
  background-color: black;
  width: 20px;
  height: 20px;
  position: absolute;
  top: ${propToUnit('y')}px;
  left: ${propToUnit('x')}px;
`

const Food = styled(SnakeFrag)`
  background-color: red;
`

const Component = class extends React.Component {
  render() {
    return (
      <Game>
        {({snake, food}) => (
          <Content>
            <Grass key={0} size={20}>
              {snake.map(snake =>
                <SnakeFrag 
                  key={snake.id}
                  {...snake}
                />
              )}
              <Food {...food}/>
            </Grass>
            
            <DebugBox key={1}>
              <h3>Render's state</h3>

              {JSON.stringify({snake, food}, null, 2)}
            </DebugBox>
          </Content>
        )}
      </Game>
    )
  }
}

export default Component
