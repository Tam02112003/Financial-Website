"use client";
import React from "react";
import styled from "styled-components";

const TableRow = ({
    name,
    totalSpending,
    monthlyAverage,
    comparison,
    isLastRow,
  }) => {
    
  
    return (
      <RowContainer isLastRow={isLastRow}>
        <CategoryName>{name}</CategoryName>
        <TotalSpending>{totalSpending}</TotalSpending>
        <MonthlyAverage>{monthlyAverage}</MonthlyAverage>
        <ComparisonCell>
        {comparison?.svg ? (
          <div dangerouslySetInnerHTML={{ __html: comparison.svg }} />
        ) : (
          <span>{comparison?.value || '0%'}</span>
        )}
        </ComparisonCell>
      </RowContainer>
    );
  };

const RowContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  border-width: ${(props) => (props.isLastRow ? "0" : "1px")};
  border-color: ${(props) => (props.isLastRow ? "transparent" : "#d9d9d9")};
`;

const CategoryName = styled.p`
  color: #6b7280;
  font-size: 24px;
  padding: 25px;
  gap: 15px;
`;

const TotalSpending = styled.p`
  padding: 29px;
  color: #6b7280;
  font-size: 24px;
  text-align: center;
`;

const MonthlyAverage = styled.p`
  padding: 29px;
  color: #000;
  font-size: 24px;
  text-align: center;
`;

const ComparisonCell = styled.div`
  padding: 26px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  font-size: 24px;
`;

export default TableRow;
