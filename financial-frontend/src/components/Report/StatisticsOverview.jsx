"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import FilterTabs from "./FilterTabs";
import StatisticsCard from "./StatisticsCard";
import { getStatistics } from "../../services/api";

const StatisticsOverview = () => {
  const [statsData, setStatsData] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState("month");
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date()
  });

  useEffect(() => {
    calculateDateRange();
  }, [activeTab]);

  useEffect(() => {
    fetchStatistics();
  }, [dateRange]);

  const calculateDateRange = () => {
    const today = new Date();
    let startDate, endDate = today;

    switch (activeTab) {
      case "day":
        startDate = new Date(today);
        startDate.setHours(0, 0, 0, 0);
        break;
      case "week":
        startDate = new Date(today);
        startDate.setDate(today.getDate() - today.getDay());
        startDate.setHours(0, 0, 0, 0);
        break;
      case "month":
        startDate = new Date(today.getFullYear(), today.getMonth(), 1);
        break;
      default:
        startDate = new Date(today);
    }

    setDateRange({ startDate, endDate });
  };

  const fetchStatistics = async () => {
    try {
      setLoading(true);
      const stats = await getStatistics(dateRange.startDate, dateRange.endDate);
      
     
  
      // Tính tổng thu nhập
      let totalIncome = 0;
      if (stats.incomeByCategory) {
        totalIncome = Object.values(stats.incomeByCategory).reduce((sum, amount) => sum + amount, 0);
      }
  
      // Tính tổng chi tiêu - xử lý cả trường hợp expenseByCategory rỗng
      let totalExpense = 0;
      if (stats.expenseByCategory && Object.keys(stats.expenseByCategory).length > 0) {
        // Nếu có dữ liệu trong expenseByCategory
        totalExpense = Object.values(stats.expenseByCategory).reduce((sum, amount) => sum + amount, 0);
      } else if (stats.categoryStats) {
        // Nếu không có expenseByCategory, tính từ categoryStats (giả sử expense có totalAmount âm)
        totalExpense = Math.abs(stats.categoryStats
          .filter(item => item.totalAmount < 0)
          .reduce((sum, item) => sum + item.totalAmount, 0));
      }
  
      setStatsData({
        totalIncome,
        totalExpense,
        balance: totalIncome - totalExpense
      });
    } catch (err) {
      console.error(err);
      setError('Không thể tải dữ liệu thống kê.');
    } finally {
      setLoading(false);
    }
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN').format(amount) + 'đ';
  };

  if (loading) return <LoadingMessage>Đang tải dữ liệu...</LoadingMessage>;
  if (error) return <ErrorMessage>{error}</ErrorMessage>;

  return (
    <ContentColumn>
      <ContentContainer>
        <SectionTitle>THỐNG KÊ TỔNG QUAN</SectionTitle>

        <FilterTabs activeTab={activeTab} onTabChange={handleTabChange} />

        <StatisticsRow>
          <StatisticsCard
            title="Tổng thu"
            amount={formatCurrency(statsData.totalIncome)}
            color="rgba(0, 196, 159, 1)"
            iconSrc="https://cdn.builder.io/api/v1/image/assets/434fdd8a623f425eb418e45999caceb8/0c66c9d689d2ab5ea4ec67833e84e08300ee0c49?placeholderIfAbsent=true"
          />

          <StatisticsCard
            title="Tổng chi"
            amount={formatCurrency(statsData.totalExpense)}
            color="rgba(220, 38, 38, 1)"
            iconSrc="https://cdn.builder.io/api/v1/image/assets/434fdd8a623f425eb418e45999caceb8/df03d70224ca3a1bc81e65fd8da84c6684ff58ed?placeholderIfAbsent=true"
          />
        </StatisticsRow>

        <BalanceCardWrapper>
          <StatisticsCard
            title="Số dư"
            amount={formatCurrency(statsData.balance)}
            color={statsData.balance >= 0 ? "rgba(37, 99, 235, 1)" : "rgba(220, 38, 38, 1)"}
            iconSrc="https://cdn.builder.io/api/v1/image/assets/434fdd8a623f425eb418e45999caceb8/3f53f4532ced3e7db674b7e34fa37a5583092c51?placeholderIfAbsent=true"
            isBalanceCard
          />
        </BalanceCardWrapper>
      </ContentContainer>
    </ContentColumn>
  );
};

// Các styled components giữ nguyên...
const LoadingMessage = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 18px;
  color: #666;
`;

const ErrorMessage = styled.div`
  padding: 20px;
  text-align: center;
  font-size: 18px;
  color: #dc2626;
`;

const ContentColumn = styled.section`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 72%;
  margin-left: 20px;
  @media (max-width: 991px) {
    width: 100%;
  }
`;

const ContentContainer = styled.div`
  display: flex;
  margin-top: 20px;
  width: 100%;
  flex-direction: column;
  align-items: stretch;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-top: 40px;
  }
`;

const SectionTitle = styled.h2`
  color: rgba(0, 0, 0, 1);
  font-size: 32px;
  font-family:
    Inter,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-weight: 700;
  align-self: start;
  @media (max-width: 991px) {
    margin-left: 2px;
  }
`;

const StatisticsRow = styled.div`
  margin-top: 76px;
  margin-right: 20px;
  width: 100%;
  display: flex;
  @media (max-width: 991px) {
    max-width: 100%;
    margin-right: 10px;
    margin-top: 40px;
    flex-direction: column;
  }
`;

const BalanceCardWrapper = styled.div`
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-color: rgba(209, 213, 219, 1);
  border-style: solid;
  border-width: 1px;
  align-self: center;
  margin-top: 67px;
  width: 456px;
  max-width: 100%;
  padding: 17px 20px;
  overflow: hidden;
  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

export default StatisticsOverview;