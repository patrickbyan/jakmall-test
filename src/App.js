import React, { Suspense, useMemo } from 'react'
import { BrowserRouter as Router, Switch, Route, Redirect, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import Navigation from './Navigation'
import routes from './routes'
import { MEDIA_SIZES } from './Helpers/constant'
import './App.css'
import { Label, SubmitButton, Title } from './Components'
import { useSessionStorageReducer } from './Hooks'

const Background = styled.main`
  background-color: var(--yellow);
  height: 100vh;
  width: 100%;
  z-index: -1;
`

const Container = styled.div`
  background-color: var(--white);
  position: absolute;
  z-index: 10;
  top: 7.85%;
  margin-inline: 4.55%;
  width: calc(100% - 8.33%);
  height: calc(100% - 13.57%);
  box-shadow: 2px 10px 20px rgba(255, 138, 0, 0.1);
  border-radius: 4px;
  overflow: auto;
`

const Summary = styled.div`
  border-left: 1px solid var(--fade-primary);
  padding: 10px;
  width: 25%;
  position: relative;

  @media only screen and (max-width: ${MEDIA_SIZES.md}) {
    padding: 0;
    border: 0;
    width: 100%;
    height: 100%;
  }
`

const SummaryBody = styled.section`
  min-height: 100%;
  min-width: 100%;
`

const SummaryHeader = styled.header``

const SummaryFooter = styled.footer`
  position: absolute;
  bottom: 0;
  width: 100%;
`

const Content = styled.div`
  width: 75%;

  @media only screen and (max-width: ${MEDIA_SIZES.md}) {
    width: 100%;
    position: relative;
  }
`

const TextAmount = styled.span`
  font-weight: bold;
  font-size: 14px;
`

const Wrapper = styled.section`
  padding: 3em;
  display: flex;
  height: inherit;

  @media only screen and (max-width: ${MEDIA_SIZES.md}) {
    display: block;
    height: inherit;
  }
`

const Receipt = styled.section`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1em;
`

const Seperator = styled.div`
  width: 80px;
  height: 5px;
  border-bottom: 1px solid var(--grey);
  margin-block: 1em;
  opacity: 0.8;
`

const MethodInformation = styled.div`
  label {
    font-size: 13px;
    line-height: 0;
  }

  p {
    font-size: 16px;
    line-height: 19px;
    font-weight: 500;
    color: var(--valid);
  }
`

function App() {
  const [state, dispatch, defaultState] = useSessionStorageReducer()

  return (
    <Background>
      <Container>
        <Router>
          <Navigation />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/1" />} />
            {routes.map((route) => (
              <Route key={route.path} exact path={route.path}>
                <Wrapper>
                  <Content>
                    <Suspense fallback={<div>Loading...</div>}>
                      <route.children state={state} dispatch={dispatch} defaultState={defaultState} />
                    </Suspense>
                  </Content>
                  <SummarySection state={state} />
                </Wrapper>
              </Route>
            ))}
          </Switch>
        </Router>
      </Container>
    </Background>
  )
}

const SummarySection = ({ state }) => {
  const totals = useMemo(
    () => 500000 + (state.isDropship ? 5900 : 0) + state.methodOfShipment.amount || 0,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [state.isDropship, state.methodOfShipment],
  )

  const location = useLocation()

  return (
    <Summary>
      <SummaryHeader>
        <Title size="24" lineHeight="29.26">
          Summary
        </Title>
      </SummaryHeader>
      <SummaryBody>
        <Label>10 items purchased</Label>
        {location.pathname.split('/')[1] >= 2 && (
          <>
            <Seperator />
            <MethodInformation>
              <label>Delivery Estimation</label>
              <p>Today by {state.methodOfShipment.label}</p>
            </MethodInformation>
          </>
        )}
        {location.pathname.split('/')[1] >= 3 && (
          <>
            <Seperator />
            <MethodInformation>
              <label>Payment Method</label>
              <p>{state.methodOfPayment.label}</p>
            </MethodInformation>
          </>
        )}
      </SummaryBody>
      <SummaryFooter>
        <Receipt>
          <Label>Cost of goods</Label>
          <TextAmount>{Number(500000).toLocaleString('id-ID')}</TextAmount>
        </Receipt>
        {state.isDropship && (
          <Receipt>
            <Label>Dropshipping Fee</Label>
            <TextAmount>{Number(5900).toLocaleString('id-ID')}</TextAmount>
          </Receipt>
        )}
        {state.methodOfShipment.name && (
          <Receipt>
            <Label>
              <b>{state.methodOfShipment.label}</b> shipment
            </Label>
            <TextAmount>{Number(state.methodOfShipment.amount).toLocaleString('id-ID')}</TextAmount>
          </Receipt>
        )}
        <Receipt>
          <Title size="24" lineHeight="29.26">
            Total
          </Title>
          <Title size="24" lineHeight="29.26">
            {Number(totals).toLocaleString('id-ID')}
          </Title>
        </Receipt>
        <SubmitButton paymentMethod={state.methodOfPayment.label} />
      </SummaryFooter>
    </Summary>
  )
}

export default App
