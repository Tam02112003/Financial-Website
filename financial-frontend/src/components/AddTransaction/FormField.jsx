import React from "react";
import styled from "styled-components";

const FormField = ({ label, type, placeholder, name, value, onChange, onBlur, error, required }) => {
  return (
    <FieldContainer>
      <FieldLabel>{label}</FieldLabel>
      <Input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        placeholder={placeholder}
        required={required}
         className="form-input"
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FieldContainer>
  );
};
const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 14px;
  margin-top: 4px;
`;
const FieldContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const FieldLabel = styled.label`
  color: #374151;
  font-family: "Inter", sans-serif;
  font-size: 20px;
  font-weight: 400;
  line-height: 20px;
  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

const TextInput = styled.input`
  height: 42px;
  padding: 9px 13px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-family: "Inter", sans-serif;
  font-size: 20px;
  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

const TextAreaInput = styled.textarea`
  height: 91px;
  padding: 9px 13px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-family: "Inter", sans-serif;
  font-size: 20px;
  resize: none;
  @media (max-width: 640px) {
    font-size: 18px;
  }
`;
const Input = styled.input`
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-size: 16px;
  height: 42px;
  &:focus {
    outline: none;
    border-color: #2563eb;
  }
  
  &.error {
    border-color: #ff0000;
  }
`;
export default FormField;
