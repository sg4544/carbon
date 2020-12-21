import React, { FunctionComponent } from "react";
import styled from "styled-components";

interface IErrorMessageProps {
  message?: string;
}

const Message = styled.p`
  color: #9f3a38;
`;

const ErrorMessage: FunctionComponent<IErrorMessageProps> = ({
  message,
  children,
}) => (
  <Message>
    {message}
    {children}
  </Message>
);

export default ErrorMessage;
