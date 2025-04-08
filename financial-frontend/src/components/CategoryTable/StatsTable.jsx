// StatsTable.jsx
"use client";
import React from "react";
import styled from "styled-components";
import TableRow from "./TableRow";

const StatsTable = ({ categories }) => {
    return (
      <TableContainer>
        <TableHeader>
          <HeaderCell>Danh mục</HeaderCell>
          <HeaderCell>Tổng chi tiêu</HeaderCell>
          <HeaderCell>Trung bình/tháng</HeaderCell>
          <HeaderCell>So với tháng trước</HeaderCell>
        </TableHeader>
  
        {categories.map((category, index) => (
          <TableRow
            key={`${category.name}-${index}`}
            name={category.name}
            totalSpending={category.totalSpending}
            monthlyAverage={category.monthlyAverage}
            comparison={category.comparison}
            isLastRow={index === categories.length - 1}
          />
        ))}
      </TableContainer>
    );
  };

const TableContainer = styled.section`
  background-color: #fff;
  border-radius: 8px;
  border-width: 1px;
  border-color: #e5e7eb;
  box-shadow:
    0px 4px 4px 0px rgba(0, 0, 0, 0.25),
    0px 4px 4px 0px rgba(0, 0, 0, 0.25),
    0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-width: 1px;
  border-color: #d1d5db;
`;

const HeaderCell = styled.h3`
  padding: 30px;
  color: #b5b8bf;
  font-size: 24px;
  text-align: center;
  padding-bottom: 10px;
  padding-top: 45px;
`;

export default StatsTable;