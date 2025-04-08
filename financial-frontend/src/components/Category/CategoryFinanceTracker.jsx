"use client";
import * as React from "react";
import styled from "styled-components";
import SidebarContainer from "../SidebarTransaction";
import CategoryManager from "./CategoryManager";

function CategoryFinanceTracker() {
  return (
    <Container>
      <SidebarContainer />
      <CategoryManager />
    </Container>
  );
}

const Container = styled.main`
  display: flex;
  min-height: 100vh;
  background-color: #fff;
`;

export default CategoryFinanceTracker;
