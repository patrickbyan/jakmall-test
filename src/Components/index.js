import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { MEDIA_SIZES } from '../Helpers/constant'

const PreviousPageWrapper = styled(Link)`
  display: flex;
  text-decoration: none;
  align-items: center;
  font-size: 14px;
  span {
    margin-right: 0.5em;
    font-size: 16px;
  }
`

export const PreviousPage = ({ children, path, ...rest }) => {
  return (
    <PreviousPageWrapper to={path || '/'} {...rest}>
      <span className="material-symbols-outlined">arrow_back</span>
      {children}
    </PreviousPageWrapper>
  )
}

export const Title = styled.h1`
  color: var(--primary);
  font-family: 'Montserrat', sans-serif;
  font-size: ${(props) => props.size + 'px'};
  line-height: ${(props) => props.lineHeight + 'px'};
`

const HeaderTitle = styled(Title)`
  width: 300px;
  position: relative;
  span {
    position: absolute;
    z-index: 1;
  }
  div {
    position: absolute;
    top: 53%;
    z-index: -1;
    height: 8px;
    width: inherit;
    border-bottom: 8px solid var(--grey);
    opacity: 0.8;
  }
`
export const CardHeader = styled.header`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;

  div {
    font-family: 'Inter', sans-serif;
    font-size: 14px;
    font-weight: normal;
    color: initial;
  }

  @media only screen and (max-width: ${MEDIA_SIZES.lg}) {
    display: initial;
  }
`

export const CardTitle = ({ children }) => (
  <HeaderTitle size="36" lineHeight="44">
    {children}
    <div />
  </HeaderTitle>
)

export const CardBody = styled.div`
  display: grid;
  grid-template-columns: repeat(${(props) => props.col || 2}, minmax(250px, 1fr));

  @media only screen and (max-width: ${MEDIA_SIZES.lg}) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }
`

const CustomizedInput = styled.div`
  display: inline-block;
  border: 1px solid ${(props) => (props.disabled ? 'var(--grey)' : props.color)};
  background-color: ${(props) => (props.disabled ? 'var(--grey)' : 'transparent')};
  padding-block: 2em;
  padding-inline: 1em;
  margin: 0.2em;
  cursor: ${(props) => (props.disabled ? 'default' : 'text')};
  position: relative;
  width: 100%;
`

const HiddenInput = styled.input`
  background-color: transparent;
  outline: none;
  border: none;
  position: absolute;
  top: 15%;
  left: 14.95;
  width: 92%;
  height: 90%;
  font-size: 16px;
  font-family: 'Inter', sans-serif;
  font-weight: bold;
  color: black;
`

const PlaceHolder = styled.label`
  color: ${(props) => props.color};
  position: absolute;
  user-select: none;
  pointer-events: none;
  top: 50%;
  left: 14.95;
  transform: translate(0, -50%);

  ${(props) => props.isNotEmpty} {
    top: 41%;
    padding-bottom: 1.3em;
    font-size: 13px;
    transition: all 0.2s ease-in-out;
  }

  span {
    border: 1px solid black;
    text-align: right;
  }
`

const SymbolValidation = styled.div`
  text-align: right;
  color: ${(props) => (props.error ? 'var(--invalid)' : 'var(--valid)')};
`

export const Input = React.forwardRef((props, ref) => {
  const { value, placeholder, required, pattern, ...inputProps } = props

  const color = !value ? 'var(--dark-grey)' : props.error ? 'var(--invalid)' : 'var(--valid)'
  if (props.disabled) {
    Object.assign(inputProps, { value: '' })
  }

  const showSymbol = props.value && !props.disabled
  return (
    <CustomizedInput color={color} disabled={props.disabled} error={props.error}>
      <PlaceHolder color={color} isNotEmpty={!value}>
        {placeholder}
      </PlaceHolder>
      <SymbolValidation error={props.error}>
        {showSymbol && <span className="material-symbols-outlined">{props.error ? 'close' : 'done'}</span>}
      </SymbolValidation>
      <HiddenInput {...inputProps} ref={ref} />
    </CustomizedInput>
  )
})

export const InputGroup = styled.div`
  width: 80%;
  margin-bottom: 1em;
`

export const ErrorTag = styled.small`
  display: none;
  ${(props) => props.err} {
    display: block;
    content: ${(props) => props.children};
    color: var(--invalid);
  }
`

export const Label = styled.small`
  font-weight: 400;
  font-size: ${(props) => props.size + 'px' || '14px'};
  line-height: 17px;
  color: var(--black);
  mix-blend-mode: normal;
  opacity: 0.6;
`

const Button = styled.div`
  width: 100%;
  height: ${(props) => props.height + 'px'};
  background-color: ${(props) => props.color || 'var(--primary)'};
  border-color: var(--primary);
  color: ${(props) => props.text || 'var(--white)'};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  user-select: none;

  :hover {
    background-color: ${(props) => props.hover || 'var(--dark-primary)'};
  }
`

export const ButtonSelect = ({ children: content, selected, ...rest }) => {
  const props = {
    color: 'var(--white)',
    hover: 'var(--valid)',
    text: 'var(--dark-grey)',
    style: { justifyContent: 'space-between', padding: '1em', border: '1px solid var(--dark-grey)' },
    ...rest,
  }

  if (selected) {
    Object.assign(props, {
      color: 'var(--light-green)',
      hover: 'var(--valid)',
      text: 'var(--black)',
      style: { justifyContent: 'space-between', padding: '1em', border: '1px solid var(--valid)' },
      ...rest,
    })
  }

  return (
    <div style={{ maxWidth: '180px' }}>
      <Button {...props}>
        <div>{content}</div>
        <div style={{ fontSize: '14px', opacity: 0.6, color: 'var(--valid)' }}>
          <span className="material-symbols-outlined">done</span>
        </div>
      </Button>
    </div>
  )
}

export const SubmitButton = ({ paymentMethod }) => {
  const history = useHistory()
  const { pathname } = useLocation()

  const next = '/' + (Number(pathname.split('/')[1]) + 1)

  const content = {
    '/1': 'Continue To Payment',
    '/2': 'Pay with ' + paymentMethod,
  }

  if (!content[pathname]) {
    return <div />
  }

  return (
    <Button height="60" onClick={() => history.push(next)}>
      {content[pathname]}
    </Button>
  )
}
