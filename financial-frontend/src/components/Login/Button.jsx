"use client";
import * as React from "react";
import styled from "styled-components";

const Button = ({
  children,
  type = "button",
  variant = "primary",
  onClick,
}) => {
  return (
    <StyledButton type={type} variant={variant} onClick={onClick}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button`
  border-radius: 50px;
  background-color: ${(props) =>
    props.variant === "primary"
      ? "rgba(95, 95, 213, 1)"
      : "rgba(194, 215, 84, 1)"};
  margin-top: ${(props) => (props.variant === "primary" ? "41px" : "26px")};
  margin-left: ${(props) => (props.variant === "secondary" ? "12px" : "0")};
  padding: ${(props) =>
    props.variant === "primary" ? "15px 70px 32px" : "15px 70px 26px"};
  color: ${(props) =>
    props.variant === "primary"
      ? "rgba(252, 245, 245, 1)"
      : "rgba(0, 0, 0, 1)"};
  text-align: center;
  font-family:
    "Times New Roman",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 32px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  width: 100%;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-right: ${(props) => (props.variant === "secondary" ? "9px" : "0")};
    padding-left: 20px;
    padding-right: 20px;
    margin-top: ${(props) => (props.variant === "primary" ? "40px" : "26px")};
  }
`;

export default Button;
