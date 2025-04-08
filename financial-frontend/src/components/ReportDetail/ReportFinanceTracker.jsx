"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import SidebarContainer  from "../SidebarTransaction";
import DetailedReport from "./DetailedReport";
import { fetchTransactions } from "../../services/api";

function ReportFinanceTracker() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dateRange, setDateRange] = useState({
    startDate: null,
    endDate: null
  });

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchTransactions(dateRange.startDate, dateRange.endDate);
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
      }
    };
    
    loadData();
  }, [dateRange]);

  return (
    <AppContainer>
      <SidebarContainer />
      <DetailedReport 
        transactions={transactions} 
        loading={loading}
        onDateRangeChange={setDateRange}
      />
    </AppContainer>
  );
}


const AppContainer = styled.main`
  display: flex;
  width: 100%;
  min-height: screen;
  background-color: #fff;
  font-family: Inter;
`;

export default ReportFinanceTracker;
