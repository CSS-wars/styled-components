import React, { memo, FC } from "react";
import styled from "styled-components";

const Wrap = styled.div<{ isInfoVariant: boolean }>`
  display: flex;
  align-items: baseline;
  padding: var(--size-lg);
  text-align: left;
  font-weight: bold;
  color: ${p => (p.isInfoVariant ? "var(--very-light-tangelo)" : "var(--sunset-orange)")};
`;

const ErrorMessage = styled.p`
  font-size: var(--font-size-md);
`;

interface Props {
  isInfoVariant?: boolean;
  infoMessage?: string;
  className?: string;
}
const ErrorInline: FC<Props> = ({ isInfoVariant = false, infoMessage, className }) => {
  return isInfoVariant ? (
    <Wrap isInfoVariant={isInfoVariant} className={className}>
      <ErrorMessage>{infoMessage}</ErrorMessage>
    </Wrap>
  ) : null;
};

export default memo(ErrorInline);
