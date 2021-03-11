import React, { memo, FC, ReactText } from 'react'
import styled from 'styled-components'

import Svg from '../Svg'
import Placeholder from './Placeholder'
import {
  STYLE_FIELD_UNDERLINE,
  STYLE_FIELD_UNDERLINE_HAS_VALUE,
  STYLE_HAS_VALUE_PADDING,
  STYLE_HEIGHT,
} from './shared'

export const CN_FIELD_SVG = 'field-svg'

const Wrap = styled.div`
  display: flex;
  position: relative;
`
const Input = styled.input<{ value: ReactText }>`
  width: 13rem;
  height: ${STYLE_HEIGHT};
  box-shadow: ${STYLE_FIELD_UNDERLINE};
  color: var(--sonic-silver);
  ${p => p.value && `padding: ${STYLE_HAS_VALUE_PADDING}`};

  &:hover {
    box-shadow: ${STYLE_FIELD_UNDERLINE_HAS_VALUE};

    & ~ .${CN_FIELD_SVG} {
      fill: var(--sonic-silver);
    };
  };
`
const SvgStyled = styled(Svg)`
  position: absolute;
  right: var(--size-xsm);
  transform: translate(0, -50%);
  top: 50%;
  fill: var(--gray-x11);
`

interface Props {
  name: string;
  type?: string;
  placeholder: string;
  value: string | number;
  svg?: string;
  onChange(event: React.ChangeEvent<HTMLInputElement>): void;
  className?: string;
}
const Field: FC<Props> = ({ name, type = 'text', placeholder, value, svg, onChange, className }) => {
  const hasValue = (value !== undefined && value !== '')

  return (
    <Wrap className={className}>
      <Placeholder hasValue={hasValue}>{placeholder}</Placeholder>
      <Input name={name} type={type} value={value} onChange={onChange} />
      {svg && <SvgStyled svg={svg} size={1.2} className={CN_FIELD_SVG} />}
    </Wrap>
  )
}

export default memo(Field)
