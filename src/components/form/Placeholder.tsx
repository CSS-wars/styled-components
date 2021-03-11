import styled from 'styled-components'
import { STYLE_FIELD_PLACEHOLDER_COLOR } from './shared'

export default styled.div<{ isError?: boolean; hasValue: boolean }>`
  position: absolute;
  top: 50%;
  left: 0;
  color: ${p => p.isError ? 'var(--sunset-orange)' : STYLE_FIELD_PLACEHOLDER_COLOR};
  pointer-events: none;
  transform: translateY(-50%);
  transition: top 0.1s ease-out, transform 0.1s ease-out, font-size 0.1s ease-out;

  ${p => p.hasValue && `
    top: 2px;
    font-size: var(--font-size-xsm);
    transform: translateY(0);
  `};
`
