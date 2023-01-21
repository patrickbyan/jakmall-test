import React from 'react'
import styled from 'styled-components'
import { CardTitle, CardHeader, PreviousPage, CardBody, Label } from '../../Components'
import { MEDIA_SIZES } from '../../Helpers/constant'

const Container = styled.section`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-100%, -100%);

  @media only screen and (max-width: ${MEDIA_SIZES.md}) {
    transform: translate(-50%, -50%);
    position: relative;
    margin-top: 6em;
  }
`

function Finish(props) {
  const { state } = props

  return (
    <Container>
      <div>
        <CardHeader>
          <CardTitle>Thank you</CardTitle>
        </CardHeader>
        <CardBody col="1">
          <Label size="16">Order Id : XXKYB</Label>
          <Label size="16" style={{ marginBlock: '1em' }}>
            Your order will be delivered today with {state.methodOfShipment.Label}
          </Label>
          <PreviousPage path="/2" style={{ marginTop: '3.5em' }}>
            Go to homepage
          </PreviousPage>
        </CardBody>
      </div>
    </Container>
  )
}

export default React.memo(Finish)
