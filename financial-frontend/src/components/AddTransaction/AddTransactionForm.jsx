"use client";
import React from "react";
import styled from "styled-components";
import FormField from "./FormField";
import SelectField from "./SelectField";
import Button from "./Button";

const AddTransactionForm = ({ categories, formData, onInputChange, onSubmit }) => {



 

  return (
    <Form onSubmit={onSubmit}>
      <FieldRow>
        <FormField 
          label="Amount *" 
          type="number" 
          placeholder="0.00" 
          name="amount" 
          value={formData.amount} 
          onChange={onInputChange} 
          required 
        />
        <SelectField
          label="Type *"
          name="type"
          value={formData.type}
          onChange={onInputChange}
          options={["expense", "income"]}
          required
        />
      </FieldRow>
      <FieldRow>
        <SelectField
          label="Category *"
          name="categoryId"
          value={formData.categoryId}
          onChange={onInputChange}
          options={categories.map(category => ({
            value: category.id,
            label: category.name
          }))}
          required
        />
        <FormField
          label="Description *"
          type="textarea"
          placeholder="Enter transaction description"
          name="description"
          value={formData.description}
          onChange={onInputChange}
          required
        />
      </FieldRow>

      <ButtonGroup>
        <Button type="submit" variant="primary">
          Save Transaction
        </Button>
      </ButtonGroup>
    </Form>
  );
};

// Styled components
const Form = styled.form`
  width: 100%;
  max-width: 997px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const FieldRow = styled.div`
  display: flex;
  gap: 46px;
  margin-bottom: 25px;
  @media (max-width: 991px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 41px;
  margin-top: 25px;
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 15px;
  }
`;


;
export default AddTransactionForm;