import React, { memo, FC } from 'react'
import styled from 'styled-components'

const Wrap = styled.span<{ size: number }>`
  display: flex;
  flex-shrink: 0;
  width: ${p => p.size}rem;
  height: ${p => p.size}rem;

  svg {
    width: 100%;
    height: 100%;
  };
`

interface Props {
  svg: string;
  size?: number;
  className?: string;
  onClick?(event: React.MouseEvent<HTMLSpanElement, MouseEvent>): void;
}
const Svg: FC<Props> = ({ svg, size = 1.6, className, onClick }) => (
  <Wrap
    size={size}
    className={className}
    onClick={onClick}
    dangerouslySetInnerHTML={{ __html: svg }}
  />
)

export default memo(Svg)
