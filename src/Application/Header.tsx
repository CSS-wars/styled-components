import React, { memo, FC } from 'react'
import styled from 'styled-components'
import { BOX_SHADOW_LIGHT } from '../styles'
import logo from '../assets/logo.png'
import { Themes } from '../shared/enums'
import { Dropdown, CN_DROPDOWN_CHEVRON } from '../components/form'

import { STYLE_HEADER_HEIGHT } from './styles'

const Wrap = styled.div`
  display: flex;
  height: ${STYLE_HEADER_HEIGHT};
  align-items: center;
  padding: var(--size-lg);
  background-color: var(--white);
  box-shadow: ${BOX_SHADOW_LIGHT};
`
const LogoLink = styled.a`
  &:hover {
    fill: var(--medium-sky-blue);
  };
`
const Logo = styled.img`
  height: ${STYLE_HEADER_HEIGHT};
`
const DropdownStyled = styled(Dropdown)`
  margin-left: auto;

  .${CN_DROPDOWN_CHEVRON} {
    margin-left: var(--size-md);
  };
`
const Github = styled.a`
  margin-left: var(--size-md);
  padding: var(--size-sm) var(--size-md);
  background-color: var(--white-smoke);
  border-radius: 2px;
`

interface Props {
  activeTheme: string;
  setActiveTheme(selectedTheme: string): void;
}
const Header: FC<Props> = ({ activeTheme, setActiveTheme }) => (
  <Wrap>
    <LogoLink href="" target="_blank" rel="noopener noreferrer">
      <Logo src={logo} />
    </LogoLink>
    <DropdownStyled
      list={Object.values(Themes)}
      activeItem={activeTheme}
      placeholder="Theme"
      onItemSelect={selectedTheme => setActiveTheme(selectedTheme)}
    />
    <Github href="https://github.com/vincentbollaert/react-boilerplate-simple" target="_blank" rel="noopener noreferrer">
      GitHub
    </Github>
  </Wrap>
)

export default memo(Header)
