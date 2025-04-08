import React from "react";
import styled from "styled-components";

function TransactionRow({ id, date, description, category, amount, type }) {
  const isLastRow = id === 3; // Assuming we know there are 3 rows total

  return (
    <RowContainer isLastRow={isLastRow}>
      <IdCell>{id}</IdCell>
      <DateCell>{date}</DateCell>
      <DescriptionCell>{description}</DescriptionCell>
      <CategoryCell>{category}</CategoryCell>
      <AmountCell>{amount}</AmountCell>
      <TypeCell>{type}</TypeCell>
    </RowContainer>
  );
}

const RowContainer = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 1fr 1fr 1fr 1fr;
  border-width: ${(props) => (props.isLastRow ? "0" : "1px")};
  border-color: #d1d5db;
  color: #000;
  font-size: 24px;
  @media (max-width: 991px) {
    font-size: 20px;
  }
  @media (max-width: 640px) {
    font-size: 16px;
  }
`;

const Cell = styled.div`
  padding: 30px 0;
  text-align: center;
`;

const IdCell = styled(Cell)`
  padding: 30px 18px;
  text-align: center;
  border-width: 1px;
  border-color: #d1d5db;
`;

const DateCell = styled(Cell)`
  color: #6b7280;
`;

const DescriptionCell = styled(Cell)``;
const CategoryCell = styled(Cell)``;
const AmountCell = styled(Cell)``;
const TypeCell = styled(Cell)``;

export default TransactionRow;
