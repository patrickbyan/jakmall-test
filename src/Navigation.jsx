import { useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'
import styled from 'styled-components'

const NavTab = styled.nav`
  background-color: var(--yellow);
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 30%;
  padding-inline: 1.5em;
  padding-block: 0.5em;
`

const Number = styled.div`
  background: var(--primary);
  box-shadow: 0px 2px 4px rgba(255, 138, 0, 0.3);
  border-radius: 1em;
  width: max-content;
  padding: 0.3em;
`

const NavItem = ({ children: text, page, pathname, last, active }) => (
  <>
    <Number page={page}>1</Number>
    <Link to={`/${page}`}>{text}</Link>
  </>
)

const Navigation = () => {
  const location = useLocation()

  const navigators = useMemo(() => {
    return [
      { page: 1, title: 'Delivery', pathname: '/1' },
      { page: 2, title: 'Payment', pathname: '/2' },
      { page: 3, title: 'Finish', pathname: '/3', last: true },
    ]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  return (
    <NavTab>
      {navigators.map((nav) => (
        <NavItem {...nav} key={nav.page} active={location.pathname === nav.pathname}>
          {nav.title}
        </NavItem>
      ))}
    </NavTab>
  )
}

export default Navigation
