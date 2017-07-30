import React from 'react'
import styled from 'styled-components'

import DebugBox from 'components/DebugBox'
import Game from 'components/Game'
import Grass from 'components/Grass'
import SnakeFrag from 'components/SnakeFrag'

const Content = styled.main`
  display: flex;
  justify-content: space-around;
  min-height: 100vh;
  background-color: #333;
  padding-top: 10vh;
`

const Food = styled(SnakeFrag)`
  background-color: red;
`

const Component = class extends React.Component {
  render() {
    return (
      <Game>
        {({snake, food, gameOver}) => (
          <Content>
            {!!gameOver
              ? <h1>game over!</h1>
              : (
                <Grass key={0} size={20}>
                  {snake.map(snake =>
                    <SnakeFrag
                      key={snake.id}
                      {...snake}
                    />
                  )}
                  <Food {...food}/>
                </Grass>
              )
            }

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
