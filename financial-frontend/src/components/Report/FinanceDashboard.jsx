"use client";
import React from "react";
import styled from "styled-components";
import SidebarContainer from "../SidebarTransaction";
import StatisticsOverview from "./StatisticsOverview";

const FinanceDashboard = () => {
  return (
    <DashboardContainer>
      <DashboardLayout>
        <SidebarContainer />
        <StatisticsOverview />
      </DashboardLayout>
    </DashboardContainer>
  );
};

const DashboardContainer = styled.main`
  background-color: rgba(255, 255, 255, 1);
  padding-right: 19px;
  overflow: hidden;
`;

const DashboardLayout = styled.div`
  gap: 20px;
  display: flex;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

export default FinanceDashboard;
