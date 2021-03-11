import React, { memo, FC } from 'react'
import styled from 'styled-components'

const Wrap = styled.button`
  border: 1px solid;
  padding: 8px 12px;
  height: 32px;
  margin-left: 32px;
  border-radius: 2px;
  text-transform: uppercase;
  cursor: pointer;
  font-weight: bold;
  color: var(--medium-sky-blue);
  white-space: nowrap;

  &:hover {
    color: var(--white);
    background: var(--medium-sky-blue);
    border-color: var(--medium-sky-blue);
  };
`

interface Props {
  children: any;
  onClick?(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void;
}
const Button: FC<Props> = ({ children, onClick }) => (
  <Wrap onClick={onClick}>{children}</Wrap>
)

export default memo(Button)
