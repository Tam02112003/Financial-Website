import React from "react";
import styled, { css } from "styled-components";

const Button = ({ children, type, variant }) => {
  return (
    <StyledButton type={type} variant={variant}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 10px 7px 7px;
  border-radius: 6px;
  font-family: "Inter", sans-serif;
  font-size: 20px;
  cursor: pointer;

  ${(props) =>
    props.variant === "primary" &&
    css`
      background-color: #2563eb;
      color: #fff;
      border: none;
    `}

  ${(props) =>
    props.variant === "secondary" &&
    css`
      background: transparent;
      color: #374151;
      border: 1px solid #d1d5db;
      width: 81px;
      height: 42px;
      justify-content: center;
    `}

  @media (max-width: 640px) {
    font-size: 18px;
    width: 100%;
  }
`;

export default Button;
