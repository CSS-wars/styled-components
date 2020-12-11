import React from 'react'
import styled from 'styled-components'

const Github = styled.a`
  margin-left: var(--size-md);
  padding: var(--size-sm) var(--size-md);
  background-color: var(--white-smoke);
  border-radius: 2px;
`
const Wrap = styled.div`
  display: flex;
  justify-content: center;
  grid-area: header;
  padding: var(--size-lg);
  background-color: var(--white);
  box-shadow: var(--box-shadow-light);
`

const Header = () => (
  <Wrap>
    <Github href="https://github.com/vincentbollaert/react-boilerplate-simple" target="_blank" rel="noopener noreferrer">
      GitHub
    </Github>
  </Wrap>
)

export default Header
