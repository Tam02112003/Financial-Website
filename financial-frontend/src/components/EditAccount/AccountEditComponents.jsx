"use client";
import { useState } from "react";
import styled from "styled-components";

// Form field component with label and input
export const FormField = ({ label, children }) => {
  return (
    <>
      <FieldLabel>{label}</FieldLabel>
      {children}
    </>
  );
};

// Password field component with toggle visibility icon
export const PasswordField = ({ 
    placeholder, 
    icon, 
    name, 
    value, 
    onChange 
  }) => {
    const [showPassword, setShowPassword] = useState(false);
  
    return (
      <PasswordInputContainer>
        <PasswordInput
          type={showPassword ? "text" : "password"}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
        />
        <VisibilityToggle 
          onClick={() => setShowPassword(!showPassword)}
          title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
        >
          <VisibilityIcon 
            src={icon} 
            alt={showPassword ? "Hide password" : "Show password"} 
          />
        </VisibilityToggle>
      </PasswordInputContainer>
    );
  };
  
  const VisibilityToggle = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0;
    margin: 0;
    display: flex;
    align-items: center;
  `;
  
  const PasswordInput = styled.input`
    border: none;
    background: transparent;
    width: 90%;
    font-size: 32px;
    font-family: "Times New Roman", -apple-system, Roboto, Helvetica, sans-serif;
    color: rgb(0, 0, 0);
    outline: none;
  
    &::placeholder {
      color: rgba(151, 147, 147, 1);
    }
  `;

// Styled components
export const FormContainer = styled.section`
  position: relative;
  border-radius: 25px;
  background-color: rgba(255, 255, 255, 1);
  display: flex;
  width: 668px;
  max-width: 100%;
  padding: 55px 32px 98px;
  flex-direction: column;
  align-items: stretch;

  @media (max-width: 991px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export const HeaderContainer = styled.header`
  display: flex;
  width: 419px;
  max-width: 100%;
  align-items: stretch;
  gap: 20px;
  text-align: center;
  justify-content: space-between;
`;

export const HeaderIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 39px;
  flex-shrink: 0;
`;

export const HeaderTitle = styled.h1`
  align-self: start;
  font-family:
    "Times New Roman",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 32px;
  color: rgba(0, 0, 0, 1);
  font-weight: 700;
`;

export const FieldLabel = styled.label`
  font-size: 30px;
  align-self: start;
  margin-top: 30px;
  font-family:
    "Times New Roman",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-weight: 700;
  color: rgba(0, 0, 0, 1);

  &:first-of-type {
    margin-top: 39px;
  }
`;

export const EmailDisplay = styled.p`
  border-radius: 10px;
  background-color: rgba(243, 238, 238, 1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 27px;
  padding: 20px;
  color: #000000;
  font-weight: 400;
  white-space: nowrap;
  font-family:
    "Times New Roman",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 32px;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-right: 2px;
    white-space: initial;
  }
`;

export const PasswordInputContainer = styled.div`
  border-radius: 10px;
  background-color: rgba(243, 238, 238, 1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  display: flex;
  margin-top: 15px;
  padding: 19px 17px;
  align-items: center;
  gap: 20px;
  color: rgba(151, 147, 147, 1);
  flex-wrap: wrap;
  justify-content: space-between;
  font-family:
    "Times New Roman",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 32px;
  font-weight: 400;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-right: 2px;
  }
`;

export const PasswordPlaceholder = styled.p`
  margin: 0;
  color: rgba(151, 147, 147, 1);
  font-family:
    "Times New Roman",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 32px;
  font-weight: 400;
`;

export const VisibilityIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 39px;
  flex-shrink: 0;
`;

export const UpdateButton = styled.button`
  border-radius: 10px;
  background-color: rgba(64, 153, 232, 1);
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 82px;
  padding: 24px 70px;
  color: rgba(255, 251, 251, 1);
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

  @media (max-width: 991px) {
    max-width: 100%;
    padding-left: 20px;
    padding-right: 20px;
    margin-top: 40px;
  }
`;

export const PageWrapper = styled.main`
  background-color: rgba(255, 255, 255, 1);
  overflow: hidden;
  font-family:
    "Times New Roman",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 32px;
  color: rgba(0, 0, 0, 1);
  font-weight: 700;
`;

export const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 1024px;
  width: 100%;
  padding: 20px 80px;
  align-items: center;
  justify-content: center;

  @media (max-width: 991px) {
    max-width: 100%;
    padding-left: 20px;
    padding-right: 20px;
  }
`;

export const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;
