"use client";
import React, { useState } from "react";
import styled from "styled-components";

const FormInput = ({
  label,
  type,
  placeholder,
  leftIcon,
  rightIcon,
  onRightIconClick,
  name,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Xử lý toggle ẩn/hiện mật khẩu
  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  // Nếu là field password, quyết định type dựa trên showPassword
  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <InputContainer>
      <InputLabel>{label}</InputLabel>
      <InputWrapper>
        {leftIcon && <IconWrapper>{leftIcon}</IconWrapper>}
        <StyledInput
          type={inputType}
          placeholder={placeholder}
          name={name}
          onChange={onChange}
        />
        {rightIcon && (
          <IconWrapper
            onClick={type === "password" ? handleTogglePassword : onRightIconClick}
          >
            {rightIcon}
          </IconWrapper>
        )}
      </InputWrapper>
    </InputContainer>
  );
};

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const InputLabel = styled.label`
  font-size: 26px;
  font-weight: 400;
  font-family: "Times New Roman";
  color: #000;
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  background-color: #d9d9d9;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const StyledInput = styled.input`
  background-color: transparent;
  font-size: 32px;
  font-weight: 700;
  font-family: "Times New Roman";
  color: rgba(0, 0, 0, 0.4);
  width: 100%;
  border: none;
  outline: none;

  &::placeholder {
    color: rgba(0, 0, 0, 0.4);
  }
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: ${(props) => (props.onClick ? "pointer" : "default")};
`;

export default FormInput;