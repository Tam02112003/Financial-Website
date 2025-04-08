import React from "react";
import styled from "styled-components";
import TransactionRow from "./TransactionRow";

function TransactionTable({ transactions = [], loading }) {
  if (loading) {
    return <div>Loading...</div>;
  }

  if (!transactions.length) {
    return <div>No transactions found</div>;
  }

  // Format transaction data for display
  const formattedTransactions = transactions.map(transaction => ({
    id: transaction.id,
    date: new Date(transaction.date).toLocaleDateString('vi-VN'),
    description: transaction.description,
    category: transaction.categoryName,
    amount: transaction.amount.toLocaleString('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }),
    type: transaction.type === 'income' ? 'Thu' : 'Chi'
  }));

  return (
    <TableContainer>
      <TableHeader>
        <IdHeader>ID</IdHeader>
        <DateHeader>Ngày</DateHeader>
        <DescriptionHeader>Mô tả</DescriptionHeader>
        <CategoryHeader>Danh mục</CategoryHeader>
        <AmountHeader>Số tiền</AmountHeader>
        <TypeHeader>Loại</TypeHeader>
      </TableHeader>

      {formattedTransactions.map((transaction, index) => (
        <TransactionRow
          key={transaction.id}
          id={transaction.id}
          date={transaction.date}
          description={transaction.description}
          category={transaction.category}
          amount={transaction.amount}
          type={transaction.type}
          isLastRow={index === transactions.length - 1}
        />
      ))}
    </TableContainer>
  );
}

// Helper functions
function formatCurrency(amount) {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND'
  }).format(amount);
}

function translateType(type) {
  return type === 'income' ? 'Thu' : 'Chi';
}

const TableContainer = styled.div`
  border-radius: 8px;
  border-width: 1px;
  border-color: #e5e7eb;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 60px 1fr 1fr 1fr 1fr 1fr;
  border-width: 1px;
  border-color: #d1d5db;
  color: #b5b8bf;
  font-size: 24px;
  @media (max-width: 991px) {
    font-size: 20px;
  }
  @media (max-width: 640px) {
    font-size: 16px;
  }
`;

const HeaderCell = styled.div`
  padding: 30px 0;
  text-align: center;
`;

const IdHeader = styled(HeaderCell)`
  padding: 30px 18px;
  text-align: center;
  border-width: 1px;
  border-color: #d1d5db;
`;

const DateHeader = styled(HeaderCell)``;
const DescriptionHeader = styled(HeaderCell)``;
const CategoryHeader = styled(HeaderCell)``;
const AmountHeader = styled(HeaderCell)``;
const TypeHeader = styled(HeaderCell)``;

export default TransactionTable;
