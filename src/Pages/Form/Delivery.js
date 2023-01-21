import React, { useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import { CardTitle, CardHeader, PreviousPage, CardBody, Input, ErrorTag, InputGroup } from '../../Components'
import { MEDIA_SIZES } from '../../Helpers/constant'

const Checkbox = styled.input.attrs({
  type: 'checkbox',
})`
  translate: -13em;
  accent-color: var(--valid);
  &::after {
    content: 'Send as dropshipper';
    white-space: nowrap;
    margin-left: 1.5em;
    cursor: pointer;
  }

  @media only screen and (max-width: ${MEDIA_SIZES.lg}) {
    translate: initial;
    margin-bottom: 2em;
  }
`

function Delivery(props) {
  const { state, dispatch } = props
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    unregister,
  } = useForm({
    defaultValues: state.delivery,
  })

  const [isDropship, setDropship] = useState(state.isDropship || false)

  useEffect(() => {
    dispatch({ payload: { isDropship } })

    if (!isDropship) {
      unregister(['dropshipper', 'dropshipperPhone'], {
        keepDefaultValue: false,
        keepValue: false,
        keepDirty: false,
        keepDirtyValues: false,
        keepError: false,
        keepIsValid: false,
        keepTouched: false,
      })
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDropship])

  const onSubmit = (payload) => {
    dispatch({ type: '/setDelivery', payload })
  }

  const columns = useMemo(
    () => [
      { name: 'name', placeholder: 'Name', required: true },
      {
        name: 'dropshipper',
        placeholder: 'Dropshipper Name',
        disabled: !isDropship ? true : false,
        required: isDropship ? true : false,
        errMessage: 'Dropshipper Name should be filled',
      },
      {
        name: 'phone',
        placeholder: 'Phone Number',
        required: true,
        pattern: /^(?:\+62|62|0)[\d+()-]{6,20}$/gm,
        errMessage:
          'Phone Number have to contains minimum 6 digit and maximum 20 digit. Allowed only digits from 0 to 9, and characters such as -, +, (, and )',
      },
      {
        name: 'dropshipperPhone',
        placeholder: 'Dropshipper Phone Number',
        disabled: !isDropship ? true : false,
        required: isDropship ? true : false,
        pattern: /^(?:\+62|62|0)[\d+()-]{6,20}$/gm,
        errMessage:
          'Phone Number have to contains minimum 6 digit and maximum 20 digit. Allowed only digits from 0 to 9, and characters such as -, +, (, and )',
      },
      {
        name: 'address',
        placeholder: 'Delivery Address',
        required: true,
        maxLength: 120,
        errMessage: 'Address must be 120 characters maximum',
      },
    ],
    [isDropship],
  )

  return (
    <>
      <PreviousPage>Back to Cart</PreviousPage>
      <CardHeader>
        <CardTitle>Delivery details</CardTitle>
        <Checkbox checked={isDropship} onChange={(e) => setDropship(e.target.checked)} />
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CardBody>
          {columns.map((col) => {
            const { name, placeholder, required, pattern, maxLength, errMessage, disabled } = col

            const options = [
              name,
              {
                required,
                ...(pattern ? { pattern } : {}),
                ...(maxLength ? { maxLength } : {}),
              },
            ]
            const data = register(...options)
            const value = disabled ? '' : watch(name) || ''

            const isValid = !errors?.[name]

            return (
              <InputGroup key={name}>
                <Input {...{ error: !isValid, value, placeholder, required, pattern, disabled, ...data }} />
                <ErrorTag err={isValid}>
                  {errors?.[name]?.type === 'required' ? `${placeholder} must be filled` : errMessage}
                </ErrorTag>
              </InputGroup>
            )
          })}
        </CardBody>
        <input type="submit" className="hidden" />
      </form>
    </>
  )
}

export default React.memo(Delivery)
