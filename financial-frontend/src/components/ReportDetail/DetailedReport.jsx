"use client";
import React, { useState } from "react";
import styled from "styled-components";
import DateRangeSelector from "./DateRangeSelector";
import ExportButtons from "./ExportButtons";
import TransactionTable from "./TransactionTable";
import { exportToPdf, exportToExcel } from "../../services/api";

const DetailedReport = ({ transactions, loading, onDateRangeChange }) => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(new Date().setDate(1)), // Đầu tháng
    endDate: new Date() // Hôm nay
  });

  const handleDateRangeChange = (newDateRange) => {
    setDateRange(newDateRange);
    onDateRangeChange(newDateRange);
  };

  const handleExport = async (type, range) => {
    try {
      const blob = await (type === 'pdf' 
        ? exportToPdf(range.startDate, range.endDate)
        : exportToExcel(range.startDate, range.endDate));
      
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      
      const formatDate = (date) => date.toISOString().split('T')[0].replace(/-/g, '');
      const ext = type === 'pdf' ? 'pdf' : 'xlsx';
      link.download = `BaoCao_${formatDate(range.startDate)}_${formatDate(range.endDate)}.${ext}`;
      
      document.body.appendChild(link);
      link.click();
      setTimeout(() => {
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
      }, 100);
    } catch (error) {
      throw error;
    }
  };

  return (
    <ReportContainer>
      <ReportTitle>Báo cáo chi tiết</ReportTitle>
      <ReportContent>
        <FilterSection>
          <DateRangeSelector onDateChange={handleDateRangeChange} />
          <ExportButtons 
        dateRange={dateRange}
        onExport={handleExport}
      />
        </FilterSection>
        <TransactionTable 
          transactions={transactions} 
          loading={loading}
        />
      </ReportContent>
    </ReportContainer>
  );
}
const ReportContainer = styled.section`
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const ReportTitle = styled.h2`
  color: #000;
  font-size: 32px;
  font-weight: 600;
  padding: 10px 20px;
  border-width: 1px;
  border-color: #e5e7eb;
`;

const ReportContent = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const FilterSection = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 17px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #e5e7eb;
  background-color: #fff;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  @media (max-width: 991px) {
    flex-wrap: wrap;
  }
`;

export default DetailedReport;
