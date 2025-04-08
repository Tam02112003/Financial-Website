"use client";
import React from "react";
import styled from "styled-components";
import Sidebar from "../SidebarTransaction";
import CategoryStats from "./CategoryStats";

const CategoryTableFinanceTracker = () => {
  return (
    <Container>
      <Sidebar />
      <CategoryStats />
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  font-family: Inter;
  background-color: #fff;
  width: 100%;
`;

export default CategoryTableFinanceTracker;
