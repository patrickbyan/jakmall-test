import { useMemo } from 'react'
import { useLocation, Link } from 'react-router-dom'
import styled from 'styled-components'
import { MEDIA_SIZES } from './Helpers/constant'

const NavTab = styled.nav`
  position: fixed;
  top: 2em;
  left: 50%;
  z-index: 20;
  transform: translate(-50%, 0);
  background-color: var(--yellow);
  border-radius: 35px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: max-content;
  padding-inline: 1.5em;
  padding-block: 1em;

  @media only screen and (max-width: ${MEDIA_SIZES.sm}) {
    top: 1.25em;
  };
`

const NavPage = styled.div`
  background: var(--primary);
  box-shadow: 0px 2px 4px rgba(255, 138, 0, 0.3);
  border-radius: 50%;
  width: 1.3em;
  height: 1.3em;
  text-align: center;
  margin-right: 1em;
  padding: .2em;
  padding-bottom: .1em;
  color: var(--white);
  font-size: 16px;
  mix-blend-mode: normal;
  opacity: ${props => !props.active? .2 : 1};

  @media only screen and (max-width: ${MEDIA_SIZES.xs}) {
    margin-inline: .3em;
  }
`

const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  pointer-events: none;
`

const NavText = styled.span`
  color: var(--primary);
  font-size: 16px;

  @media only screen and (max-width: ${MEDIA_SIZES.sm}) {
    display: none;
  }
`

const NavArrow = styled.span`
  color: var(--primary);
  margin-inline: .4em;
`

const NavItem = ({ children: text, page, last, step }) => (
    <>
      <NavLink to={`/${page}`}>
        <NavPage active={step >= page}>{page}</NavPage>
        <NavText>{text}</NavText>
        {
          !last && <NavArrow className="material-symbols-outlined text-primary">
            keyboard_arrow_right
          </NavArrow>
        }
      </NavLink>
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
        <NavItem {...nav} key={nav.page} step={location.pathname.split('/')[1]}>
          {nav.title}
        </NavItem>
      ))}
    </NavTab>
  )
}

export default Navigation
