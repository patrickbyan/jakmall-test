import { useEffect, useReducer } from 'react'

const INITIAL_STATE = {
  isDropship: '',
  delivery: {
    name: '',
    dropshipper: '',
    phone: '',
    dropshipperPhone: '',
    address: '',
  },
  methodOfShipment: {
    name: '',
    label: '',
    amount: '',
  },
  methodOfPayment: {
    name: '',
    label: '',
    description: '',
  },
}

function reducer(state = INITIAL_STATE, { type, payload }) {
  switch (type) {
    case '/setPayment':
      return { ...state, methodOfPayment: payload }
    case '/setShipment':
      return { ...state, methodOfShipment: payload }
    case '/setDelivery':
      return { ...state, delivery: payload }
    default:
      return { ...state, ...payload }
  }
}

export function useSessionStorageReducer() {
  const key = 'form'
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE, () => {
    let value
    try {
      value = JSON.parse(sessionStorage.getItem(key)) || INITIAL_STATE
    } catch (e) {
      value = INITIAL_STATE
    }
    return value
  })

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state))
  }, [state, key])

  return [state, dispatch, INITIAL_STATE]
}
