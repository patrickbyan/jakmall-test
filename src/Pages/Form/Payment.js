import React from 'react'
import styled from 'styled-components'
import { CardTitle, CardHeader, PreviousPage, CardBody, InputGroup, ButtonSelect } from '../../Components'
import { paymentMethods, shippingMethods } from '../../Helpers/mock'

const Shipment = styled.section``

const PaymentInfo = styled.section``

function Payment(props) {
  const { state, dispatch } = props

  const onChangeShipment = ({ name, label, fee: amount }) => {
    dispatch({ type: '/setShipment', payload: { name, label, amount } })
  }

  const onChangePayment = (payload) => {
    dispatch({ type: '/setPayment', payload })
  }

  return (
    <>
      <PreviousPage path="/1">Back to delivery</PreviousPage>
      <Shipment>
        <CardHeader>
          <CardTitle>Shipment</CardTitle>
        </CardHeader>
        <CardBody col="3">
          {shippingMethods.map((method, i) => (
            <InputGroup key={i}>
              <ButtonSelect
                onClick={() => onChangeShipment(method)}
                selected={state.methodOfShipment.name === method.name}
              >
                {method.label}
              </ButtonSelect>
            </InputGroup>
          ))}
        </CardBody>
      </Shipment>
      <PaymentInfo>
        <CardHeader>
          <CardTitle>Payment</CardTitle>
        </CardHeader>
        <CardBody col="3">
          {paymentMethods.map((method, i) => (
            <InputGroup key={i}>
              <ButtonSelect
                onClick={() => onChangePayment(method)}
                selected={state.methodOfPayment.name === method.name}
              >
                {method.label}
              </ButtonSelect>
            </InputGroup>
          ))}
        </CardBody>
      </PaymentInfo>
    </>
  )
}

export default React.memo(Payment)
