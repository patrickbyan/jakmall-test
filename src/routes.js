import React from 'react'
const Delivery = React.lazy(() => import('./Pages/Form/Delivery'))
const Payment = React.lazy(() => import('./Pages/Form/Payment'))
const Finish = React.lazy(() => import('./Pages/Form/Finish'))

const routes = [
  { path: '/1', children: Delivery },
  { path: '/2', children: Payment },
  { path: '/3', children: Finish },
]

export default routes
