"use client";
import React from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";

const SidebarContainer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <Sidebar>
      <SidebarHeader>FinanceTracker</SidebarHeader>
      <NavigationMenu>
        <NavigationItem 
          onClick={() => navigate("/report-total")} 
          $active={isActive("/report-total")}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1223a6da20969eb47427b79fc18ab13fe2326b39"
            alt="Overview statistics icon"
            className="w-[60px] h-[60px] max-sm:w-[40px] max-sm:h-[40px]"
          />
          <NavItemText>Thống kê tổng quan</NavItemText>
        </NavigationItem>
        <NavigationItem 
          onClick={() => navigate("/category-stats")} 
          $active={isActive("/category-stats")}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/1223a6da20969eb47427b79fc18ab13fe2326b39"
            alt="Category statistics icon"
            className="w-[60px] h-[60px] max-sm:w-[40px] max-sm:h-[40px]"
          />
          <NavItemText>Thống kê theo danh mục</NavItemText>
        </NavigationItem>
        <NavigationItem 
          onClick={() => navigate("/report")} 
          $active={isActive("/report")}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/bc84895a6c7b96a631cca3a06edb62d1b43aced9"
            alt="Detailed report icon"
            className="w-[60px] h-[60px] max-sm:w-[40px] max-sm:h-[40px]"
          />
          <NavItemText>Báo cáo chi tiết</NavItemText>
        </NavigationItem>
        <NavigationItem 
          onClick={() => navigate("/category")} 
          $active={isActive("/category")}
        >
          <AddCategoryIcon>
            <svg
              width="60"
              height="60"
              viewBox="0 0 60 60"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-[60px] h-[60px] max-sm:w-[40px] max-sm:h-[40px]"
            >
              <g clipPath="url(#clip0_118_67)">
                <path
                  d="M30 55C43.8071 55 55 43.8071 55 30C55 16.1929 43.8071 5 30 5C16.1929 5 5 16.1929 5 30C5 43.8071 16.1929 55 30 55Z"
                  stroke="#374151"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M20 30H40"
                  stroke="#374151"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
                <path
                  d="M30 20V40"
                  stroke="#374151"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                ></path>
              </g>
              <defs>
                <clipPath id="clip0_118_67">
                  <rect width="60" height="60" fill="white"></rect>
                </clipPath>
              </defs>
            </svg>
          </AddCategoryIcon>
          <NavItemText>Thêm/sửa danh mục</NavItemText>
        </NavigationItem>
        <NavigationItem 
          onClick={() => navigate("/transaction")} 
          $active={isActive("/transaction")}
        >
          <img
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/99fcd83bea27c508a06f45cb967495a7fb0fee39"
            alt="Category list icon"
            className="w-[60px] h-[60px] max-sm:w-[40px] max-sm:h-[40px]"
          />
          <NavItemText>Danh sách giao dịch</NavItemText>
        </NavigationItem>
      </NavigationMenu>
    </Sidebar>
  );
};

const Sidebar = styled.aside`
  width: 390px;
  border-width: 1px;
  border-color: #e5e7eb;
  display: flex;
  flex-direction: column;
  @media (max-width: 991px) {
    width: 300px;
  }
  @media (max-width: 640px) {
    width: 80px;
  }
`;

const SidebarHeader = styled.header`
  color: #1d61f6;
  font-family: Inter;
  font-size: 40px;
  font-weight: 700;
  height: 90px;
  padding: 22px 66px 20px 21px;
  @media (max-width: 640px) {
    font-size: 24px;
    padding: 22px 10px;
  }
`;

const NavigationMenu = styled.nav`
  display: flex;
  flex-direction: column;
`;

const NavigationItem = styled.div`
  display: flex;
  height: 90px;
  padding: 15px 19px;
  align-items: center;
  gap: 10px;
  cursor: pointer;
  background-color: ${(props) => (props.$active ? "#eff6ff" : "transparent")};
  border-left: ${(props) => (props.$active ? "4px solid #2563eb" : "none")};
  @media (max-width: 640px) {
    padding: 15px 10px;
  }
`;

const NavItemText = styled.span`
  color: #000;
  font-family: Inter;
  font-size: 24px;
  @media (max-width: 640px) {
    display: none;
  }
`;

const AddCategoryIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default SidebarContainer;