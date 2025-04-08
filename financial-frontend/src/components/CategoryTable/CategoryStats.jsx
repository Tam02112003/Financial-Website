// CategoryStats.jsx
"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DateRangeFilter from "./DateRangeFilter";
import StatsTable from "./StatsTable";
import { getCategoryStats } from "../../services/api"; // Adjust the import path as necessary

const CategoryStats = () => {
  const [selectedRange, setSelectedRange] = useState();
  const [categoryData, setCategoryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategoryStats();
  }, [selectedRange]);

  const fetchCategoryStats = async () => {
    try {
        setLoading(true);
        setError(null);
        
        const { startDate, endDate } = calculateDateRange(selectedRange);
        const data = await getCategoryStats(startDate, endDate);
        
       
        
        const transformedData = transformCategoryData(data);
        setCategoryData(transformedData);
    } catch (error) {
        console.error('Error fetching category stats:', error);
        setError('Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại.');
    } finally {
        setLoading(false);
    }
};

  const calculateDateRange = (range) => {
    const now = new Date();
    let startDate, endDate;
    
    switch (range) {
      case '7days':
        startDate = new Date(now);
        startDate.setDate(now.getDate() - 7);
        endDate = new Date(now);
        break;
      case 'lastMonth':
        startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        endDate = new Date(now.getFullYear(), now.getMonth(), 0);
        break;
      case 'thisMonth':
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        break;
      case 'lastYear':
        startDate = new Date(now.getFullYear() - 1, 0, 1);
        endDate = new Date(now.getFullYear() - 1, 11, 31);
        break;
      default:
        startDate = new Date(now.getFullYear(), now.getMonth(), 1);
        endDate = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    }
  
    return { startDate, endDate };
  };

  const transformCategoryData = (apiData) => {
    if (!apiData || !apiData.categoryStats) {
        return [];
    }

    return apiData.categoryStats.map(item => ({
        name: item.categoryName || "Khác",
        totalSpending: formatCurrency(item.totalAmount || 0),
        monthlyAverage: formatCurrency(item.averageAmount || 0),
        comparison: {
            value: `${item.percentageChange || 0}%`,
            trend: (item.percentageChange || 0) >= 0 ? 'up' : 'down',
            svg: generateComparisonSVG(item.percentageChange || 0)
        }
    }));
};
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
    })
      .format(amount)
      .replace("₫", "đ");
  };

  const generateComparisonSVG = (percentage) => {
    const isPositive = percentage >= 0;
    const color = isPositive ? "#40FF0C" : "#DC2626";
    const arrowPath = isPositive
      ? "M61.7071 25.2929C61.3166 24.9024 60.6834 24.9024 60.2929 25.2929L53.9289 31.6569C53.5384 32.0474 53.5384 32.6805 53.9289 33.0711C54.3195 33.4616 54.9526 33.4616 55.3431 33.0711L61 27.4142L66.6569 33.0711C67.0474 33.4616 67.6805 33.4616 68.0711 33.0711C68.4616 32.6805 68.4616 32.0474 68.0711 31.6569L61.7071 25.2929ZM62 52V26H60V52H62Z"
      : "M62.2929 52.7071C62.6834 53.0976 63.3166 53.0976 63.7071 52.7071L70.0711 46.3431C70.4616 45.9526 70.4616 45.3195 70.0711 44.9289C69.6805 44.5384 69.0474 44.5384 68.6569 44.9289L63 50.5858L57.3431 44.9289C56.9526 44.5384 56.3195 44.5384 55.9289 44.9289C55.5384 45.3195 55.5384 45.9526 55.9289 46.3431L62.2929 52.7071ZM62 26V52H64V26H62Z";

    return `
      <svg width="244" height="78" viewBox="0 0 244 78" fill="none" xmlns="http://www.w3.org/2000/svg" class="w-[244px] h-[78px]">
        <mask id="path-1-inside-1" fill="white">
          <path d="M0 0H246V78H0V0Z"></path>
        </mask>
        <path d="M246 77H0V79H246V77Z" fill="#D1D5DB" mask="url(#path-1-inside-1)"></path>
        <text fill="${color}" fill-opacity="0.82" stroke="${color}" stroke-opacity="0.88" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="24" font-weight="500" letter-spacing="0em">
          <tspan x="90.0664" y="47.7273">${Math.abs(percentage)}%</tspan>
        </text>
        <path d="${arrowPath}" fill="${color}" fill-opacity="0.88"></path>
      </svg>
    `;
  };

  const handleDateRangeChange = (range) => {
    setSelectedRange(range);
  };

  return (
    <StatsContainer>
      <StatsTitle>THỐNG KÊ THEO DANH MỤC</StatsTitle>
      <DateRangeFilter 
        onDateRangeChange={handleDateRangeChange} 
        selectedRange={selectedRange}
      />
      
      {error ? (
        <ErrorText>{error}</ErrorText>
      ) : loading ? (
        <LoadingText>Đang tải dữ liệu...</LoadingText>
      ) : categoryData.length > 0 ? (
        <StatsTable categories={categoryData} />
      ) : (
        <EmptyMessage>Không có dữ liệu thống kê</EmptyMessage>
      )}
    </StatsContainer>
  );
  
};

const DebugInfo = styled.div`
  margin-top: 10px;
  padding: 10px;
  background-color: #f3f4f6;
  border-radius: 4px;
  font-size: 14px;
  color: #4b5563;
`;

const EmptyMessage = styled.p`
  text-align: center;
  font-size: 20px;
  color: #6b7280;
  margin-top: 20px;
`;
const ErrorText = styled.p`
  text-align: center;
  font-size: 20px;
  color: #dc2626;
  margin-top: 20px;
`;
const StatsContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 20px;
  @media (max-width: 640px) {
    padding: 16px;
  }
`;

const StatsTitle = styled.h2`
  color: #000;
  font-size: 32px;
  font-weight: 700;
  text-align: center;
  margin-bottom: 20px;
  @media (max-width: 991px) {
    font-size: 28px;
  }
  @media (max-width: 640px) {
    font-size: 24px;
  }
`;

const LoadingText = styled.p`
  text-align: center;
  font-size: 20px;
  color: #6b7280;
  margin-top: 20px;
`;

export default CategoryStats;
