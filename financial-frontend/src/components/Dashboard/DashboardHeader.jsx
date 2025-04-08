"use client";
import React, { onRefresh, useState } from "react";
import styled from "styled-components";
import { RefreshIcon } from "./Icons";

function DashboardHeader() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = async () => {
    setIsRefreshing(true);
    try {
      // Gọi hàm callback từ prop
      await onRefresh?.();
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <HeaderContainer>
      <HeaderTitle>Dashboard</HeaderTitle>
      <RefreshButton 
        onClick={handleRefresh}
        disabled={isRefreshing}
      >
        <RefreshIcon $spinning={isRefreshing} />
        <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
      </RefreshButton>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  @media (max-width: 640px) {
    flex-direction: column;
    gap: 16px;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 32px;
  font-weight: 700;
  color: #1f2937;
  margin: 0;
`;

const RefreshButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px 8px 12px;
  border-radius: 6px;
  color: #2563eb;
  font-size: 20px;
  cursor: pointer;
  background-color: #eff6ff;
  border: none;
  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
  }
`;

export default DashboardHeader;
