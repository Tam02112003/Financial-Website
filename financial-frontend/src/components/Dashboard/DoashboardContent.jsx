"use client";
import React, { useEffect, useState, } from "react";
import styled from "styled-components";
import api from "../../utils/api";
import DashboardHeader from "./DashboardHeader";
import StatsCards from "./StatsCards";
import ExpenseChart from "./ExpenseChart";
import TransactionsTable from "./TransactionsTable";

function DashboardContent() {
  const [refreshKey, setRefreshKey] = useState(0);
  const [dashboardData, setDashboardData] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [expenseByCategory, setExpenseByCategory] = useState([]);
  const handleRefresh = async () => {
    // Tăng refreshKey để trigger useEffect
    setRefreshKey(prev => prev + 1);
  };
  const [stats, setStats] = useState({
    totalIncome: 0,
    totalExpense: 0, // Lưu ý tên trường khớp với DTO
    balance: 0
  });
    useEffect(() => {
      // Lấy token từ localStorage hoặc nơi bạn lưu trữ token
      const token = localStorage.getItem("token"); // Giả sử token được lưu trong localStorage
  
      api.get("/dashboard", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => {
          
          setDashboardData(response.data);
        })
        .catch((err) => console.error("Error fetching dashboard:", err.response?.data || err.message));
          // Gọi API để lấy dữ liệu thống kê
          api.get("reports/summary?timeRange=month", {
            headers: { 
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
           
            setStats({
              totalIncome: response.data.totalIncome || 0,
              totalExpense: response.data.totalExpense || 0,
              balance: response.data.balance || 0
            });
          })
          .catch(error => {
            console.error("Full error details:", error);
            console.error("Error response:", error.response?.data);
          });
      api.get("/transactions", {
        headers: { Authorization: `Bearer ${token}` }
      })
        .then((response) => {
       
          setTransactions(response.data);
        })
        .catch((err) => console.error("Error fetching transactions:", err.response?.data || err.message));
  
      api.get("/reports/by-category?timeRange=month", {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then((response) => {
        const expenseObj = response.data?.expenseByCategory || {};
      
        const expenseArray = Object.entries(expenseObj).map(([category, amount]) => ({
          category,
          amount
        }));
      
        setExpenseByCategory(expenseArray);
      })
      .catch((err) => {
        console.error("Error fetching expense by category:", err);
        setExpenseByCategory([]);
      });
    }, [refreshKey]);

  return (
    <ContentContainer>

      <DashboardHeader onRefresh={handleRefresh} />
      {dashboardData &&    <StatsCards stats={stats} />}
      <ChartsContainer>
        {expenseByCategory.length > 0 && <ExpenseChart expenseByCategory={expenseByCategory} />}
        {transactions.length > 0 && <TransactionsTable transactions={transactions} />}
      </ChartsContainer>
    </ContentContainer>
  );
}

const ContentContainer = styled.main`
  flex: 1;
  padding: 24px;
  max-width: 1090px;
`;

const ChartsContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 23px;
`;

export default DashboardContent;