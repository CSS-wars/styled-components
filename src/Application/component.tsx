import React from 'react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import styled, { createGlobalStyle } from 'styled-components'
import { reset, media } from '../styles'

import { homePath } from './paths'
import Header from './Header/component'
import Home from '../pages/Home/component'

const GlobalStyle = createGlobalStyle`
  ${reset};
`
const PageWrap = styled.div`
  display: grid;
  grid-template:
    "header header" 6rem
    "main main" auto
    / 16rem auto;
  height: 100vh;
`
const PageSpacer = styled.div`
  grid-area: main;
  margin: 0 auto;
  padding: var(--size-xlg) 4.2rem;
  width: 100%;
  max-width: 92rem;

  ${media.sm} {
    padding: 6rem 8.2rem;
  };
`
const ContentWrap = styled.div`
  position: relative;
  padding: 2.8rem 0;
  height: 100%;
  background-color: var(--white);
  box-shadow: var(--box-shadow-light);
`

const Application = () => {
  return (
    <Router>
      <GlobalStyle />
      <PageWrap>
        <Header />
        <PageSpacer>
          <ContentWrap>
            <Switch>
              <Route exact path={homePath()} component={Home} />
              <Redirect to={homePath()} />
            </Switch>
          </ContentWrap>
        </PageSpacer>
      </PageWrap>
    </Router>
  )
}

export default Application
