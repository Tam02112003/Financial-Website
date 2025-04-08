"use client";
import React from "react";
import styled from "styled-components";
import axios from "axios";
import { TableIcon } from "./Icons";

function TransactionsTable({ transactions }) {
  const exportToPDF = () => {
    const token = localStorage.getItem("token");
    const config = { headers: { Authorization: `Bearer ${token}` }, responseType: "blob" };
    const startDate = "2025-01-01"; // Thay bằng ngày thực tế
    const endDate = "2025-04-30";

    axios
      .get(`http://localhost:8080/api/reports/details/export-pdf?startDate=${startDate}&endDate=${endDate}`, config)
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "report.pdf");
        document.body.appendChild(link);
        link.click();
      });
  };

  return (
    <TableContainer>
      <TableHeader>
        <TableIcon />
        <TableTitle>Recent Transactions</TableTitle>
        <ExportButton onClick={exportToPDF}>Export PDF</ExportButton>
      </TableHeader>
      <Table>
        <TableHead>
          <DescriptionHeader>Description</DescriptionHeader>
          <CategoryHeader>Category</CategoryHeader>
          <AmountHeader>Amount</AmountHeader>
        </TableHead>
        {transactions.map((t) => {
          // Xác định loại giao dịch dựa trên trường type
          const isIncome = t.type === 'income';
          const amountDisplay = isIncome
            ? `+${t.amount.toLocaleString()}₫`
            : `-${t.amount.toLocaleString()}₫`;
  
          return (
            <TableRow key={t.id}>
              <Description>{t.description}</Description>
              <Category>{t.categoryName}</Category>
              <Amount positive={isIncome}>
                {amountDisplay}
              </Amount>
            </TableRow>
          );
        })}
      </Table>
    </TableContainer>
  );
}

const ExportButton = styled.button`
  padding: 8px 16px;
  background-color: #2563eb;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
`;



const TableContainer = styled.section`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  background-color: #fff;
`;

const TableHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 24px;
`;

const TableTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

const Table = styled.div`
  width: 100%;
`;

const TableHead = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  border-bottom: 1px solid #b4b8c1;
  font-size: 24px;
  padding-bottom: 8px;
  @media (max-width: 640px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
    font-size: 16px;
  }
`;

const DescriptionHeader = styled.div`
  width: 320px;
  color: #111827;
  font-weight: 600;
  @media (max-width: 640px) {
    width: 100%;
  }
`;

const CategoryHeader = styled.div`
  width: 240px;
  color: #6b7280;
  font-weight: 600;
  @media (max-width: 640px) {
    width: 100%;
  }
`;

const AmountHeader = styled.div`

  width: 400px;
  
  text-align: right;
  font-weight: 600;
  @media (max-width: 640px) {
    width: 100%;
    text-align: left;
  }
`;

const TableRow = styled.div`
  display: flex;
  border-bottom: 1px solid #b4b8c1;
  font-size: 24px;
  padding: 12px 0;
  @media (max-width: 640px) {
    flex-direction: column;
    font-size: 16px;
  }
`;

const Description = styled.div`
  width: 320px;
  color: #111827;
  @media (max-width: 640px) {
    width: 100%;
  }
`;

const Category = styled.div`
  width: 240px;
  color: #6b7280;
  @media (max-width: 640px) {
    width: 100%;
  }
`;

const Amount = styled.div`
  width: 450px;
  text-align: right;
  color: ${(props) => (props.positive ? "#16A34A" : "#DC2626")};
  @media (max-width: 640px) {
    width: 100%;
    text-align: left;
  }
`;

export default TransactionsTable;
