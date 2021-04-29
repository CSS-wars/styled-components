import React, { FC, useState } from 'react'
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { reset, media, BOX_SHADOW_LIGHT } from '../styles'

import { STYLE_HEADER_HEIGHT } from './styles'
import { Themes } from '../shared/enums'
import Header from './Header'
import Home from '../pages/Home/Home'

const GlobalStyle = createGlobalStyle<{ activeTheme: string }>`
  ${reset};

  html {
    font-size: ${({ activeTheme }) => activeTheme === Themes.normal
    ? '62.5%' : activeTheme === Themes.compact ? '50%' : '70%'};
  };
`
const PageWrap = styled.div`
  height: 100vh;
`
const PageSpacer = styled.div`
  margin: 0 auto;
  padding: var(--size-sm);
  height: ${`calc(100% - ${STYLE_HEADER_HEIGHT})`};
  max-width: 140rem;

  ${media.sm} {
    padding: var(--size-xlg);
  };

  ${media.md} {
    padding: 6rem 8.2rem;
  };
`

const ContentWrap = styled.div`
  position: relative;
  height: 100%;
  background-color: var(--white);
  box-shadow: ${BOX_SHADOW_LIGHT};
`

const Application: FC = () => {
  const [activeTheme, setActiveTheme] = useState(Themes.normal as string)

  return (
    <Router>
      <GlobalStyle activeTheme={activeTheme} />
      <PageWrap>
        <Header activeTheme={activeTheme} setActiveTheme={setActiveTheme} />
        <PageSpacer>
          <ContentWrap>
            <Route exact path="/" component={Home} />
            <Redirect to="/" />
          </ContentWrap>
        </PageSpacer>
      </PageWrap>
    </Router>
  )
}

export default Application
