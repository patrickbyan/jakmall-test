import './App.css'
import styled from 'styled-components'
import { BrowserRouter as Router, Switch, Route, Link, useLocation } from 'react-router-dom'
import Navigation from './Navigation'

const Background = styled.main`
  background-color: var(--yellow);
  height: 100vh;
  width: 100%;
`

const Container = styled.div`
  background-color: var(--white);
  position: absolute;
  top: 7.85%;
  margin-inline: 4.55%;
  width: calc(100% - 8.33%);
  height: calc(100% - 13.57%);
  box-shadow: 2px 10px 20px rgba(255, 138, 0, 0.1);
  border-radius: 4px;
`

function App() {
  return (
    <Background>
      <Container>
        <Router>
          <Navigation />
        </Router>
      </Container>
    </Background>
  )
}

export default App
