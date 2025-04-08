"use client";
import * as React from "react";
import styled from "styled-components";

const FormInput = ({
  type = "text",
  name,
  placeholder,
  value,
  onChange,
  iconSrc,
  endIcon = null,
}) => {
  return (
    <InputContainer>
      <InputWrapper>
        <InputIcon src={iconSrc} alt="" />
        <InputField
          type={type}
          name={name}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </InputWrapper>
      {endIcon}
    </InputContainer>
  );
};

const InputContainer = styled.div`
  border-radius: 50px;
  background-color: ${(props) =>
    props.type === "password"
      ? "rgba(244, 235, 235, 1)"
      : "rgba(243, 235, 235, 1)"};
  display: flex;
  margin-top: ${(props) => (props.type === "password" ? "27px" : "45px")};
  width: 100%;
  padding: ${(props) =>
    props.type === "password" ? "17px 29px" : "18px 25px"};
  align-items: start;
  gap: 20px;
  color: #000000;
  font-weight: 400;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 991px) {
    max-width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: ${(props) => (props.type === "password" ? "27px" : "40px")};
  }
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: stretch;
  gap: 16px;
  flex-grow: 1;
`;

const InputIcon = styled.img`
  aspect-ratio: ${(props) => (props.type === "password" ? "1" : "0.97")};
  object-fit: contain;
  object-position: center;
  width: 39px;
  align-self: start;
  flex-shrink: 0;
`;

const InputField = styled.input`
  background: transparent;
  border: none;
  outline: none;
  font-family:
    "Times New Roman",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 32px;
  color: #000000;
  font-weight: 400;
  flex-grow: 1;
  width: 100%;

  &::placeholder {
    color: #000000;
  }
`;

export default FormInput;
