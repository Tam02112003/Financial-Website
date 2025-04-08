"use client";
import React from "react";
import styled from "styled-components";
import Sidebar from "../SidebarFinance";
import DashboardContent from "../Dashboard/DoashboardContent";

function FinanceTracker() {
  return (
    <>
      <link
        href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet"
      />
      <AppContainer>
        <Sidebar />
        <DashboardContent />
      </AppContainer>
    </>
  );
}

const AppContainer = styled.div`
  display: flex;
  width: 100%;
  min-height: 100vh;
  font-family: "Inter", sans-serif;
  background-color: #f9fafb;
  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

export default FinanceTracker;
