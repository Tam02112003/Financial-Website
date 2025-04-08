import React from "react";
import styled from "styled-components";

const SelectField = ({ label, name, value, onChange, options, required }) => {
  return (
    <FieldContainer>
      <FieldLabel>{label}</FieldLabel>
      <SelectContainer>
        <Select name={name} value={value} onChange={onChange} required={required}>
          <option value="">Chọn {label.toLowerCase()}</option>
          {Array.isArray(options) && options.map((option, index) => {
            if (typeof option === 'object' && option.value !== undefined && option.label !== undefined) {
              return (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              );
            } else {
              return (
                <option key={index} value={typeof option === 'string' ? option.toLowerCase() : option}>
                  {option}
                </option>
              );
            }
          })}
        </Select>
      </SelectContainer>
    </FieldContainer>
  );
};

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

const SelectContainer = styled.div`
  height: 42px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  font-family: "Inter", sans-serif;
  font-size: 20px;
  display: flex;
  align-items: center;
  background-color: #fff;
  @media (max-width: 640px) {
    font-size: 18px;
  }
`;

const Select = styled.select`
  width: 100%;
  height: 100%;
  padding: 0 13px;
  border: none;
  background: transparent;
  font-family: inherit;
  font-size: inherit;
  color: #000;
  outline: none;
`;

export default SelectField;