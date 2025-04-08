"use client";
import React from "react";
import styled from "styled-components";
import { IncomeIcon, ExpenseIcon, BalanceIcon } from "./Icons";

function StatsCards({ stats }) {
  // Hàm format tiền tệ
  const formatMoney = (amount, showSign = false) => {
    if (amount === undefined || amount === null) return '0 ₫';
    
    const sign = showSign ? (amount >= 0 ? '+' : '-') : '';
    const absoluteValue = Math.abs(amount);
    return `${sign}${absoluteValue.toLocaleString('vi-VN')} ₫`;
  };

  return (
    <StatsContainer>
      <StatCard>
        <IconContainer>
          <IncomeIcon />
        </IconContainer>
        <StatInfo>
          <StatLabel>Total Income</StatLabel>
          <StatValue positive>
            {formatMoney(stats?.totalIncome)}
          </StatValue>
        </StatInfo>
      </StatCard>

      <StatCard>
        <IconContainer>
          <ExpenseIcon />
        </IconContainer>
        <StatInfo>
          <StatLabel>Total Expense</StatLabel>
          <StatValue negative>
           {formatMoney(stats?.totalExpense)}
          </StatValue>
        </StatInfo>
      </StatCard>

      <StatCard>
        <IconContainer>
          <BalanceIcon />
        </IconContainer>
        <StatInfo>
          <StatLabel>Balance</StatLabel>
          <StatValue positive={stats?.balance >= 0}>
            {formatMoney(stats?.balance, true)}
          </StatValue>
        </StatInfo>
      </StatCard>
    </StatsContainer>
  );
}
const StatsContainer = styled.section`
  display: flex;
  gap: 24px;
  margin-bottom: 24px;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const StatCard = styled.article`
  flex: 1;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 30px 25px;
  display: flex;
  align-items: center;
  gap: 20px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  background-color: #fff;
`;

const IconContainer = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 9999px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 12px;
`;

const StatInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const StatLabel = styled.p`
  color: #6b7280;
  font-size: 20px;
  margin: 0;
`;

const StatValue = styled.p`
  color: #1f2937;
  font-size: 20px;
  font-weight: 700;
  margin: 0;
`;

export default StatsCards;
