"use client";
import styled from "styled-components";
import { DashboardIcon, TransactionsIcon, AddTransactionIcon, LogoutIcon } from "./Dashboard/Icons";
import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <SidebarContainer>
      <LogoText>FinanceTracker</LogoText>
      <NavMenu>
        <NavItem 
          onClick={() => navigate("/dashboard")} 
          $active={isActive("/dashboard")}
        >
          <DashboardIcon />
          <span>Dashboard</span>
        </NavItem>
        <NavItem 
          onClick={() => navigate("/transaction")} 
          $active={isActive("/transaction")}
        >
          <TransactionsIcon />
          <span>Transactions</span>
        </NavItem>
        <NavItem 
          onClick={() => navigate("/add-transaction")} 
          $active={isActive("/add-transaction")}
        >
          <AddTransactionIcon />
          <span>Add Transaction</span>
        </NavItem>
        <LogoutButton
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/login";
          }}
        >
          <LogoutIcon />
          <span>Logout</span>
        </LogoutButton>
      </NavMenu>
    </SidebarContainer>
  );
}

const SidebarContainer = styled.nav`
  width: 350px;
  border-right: 1px solid #e5e7eb;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  @media (max-width: 991px) {
    width: 100%;
    height: auto;
  }
`;

const LogoText = styled.h1`
  height: 80px;
  font-size: 40px;
  font-weight: 700;
  color: #2563eb;
`;

const NavMenu = styled.ul`
  display: flex;
  flex-direction: column;
  padding-top: 24px;
  list-style-type: none;
  margin: 0;
  padding-left: 0;
  @media (max-width: 991px) {
    flex-direction: row;
    justify-content: space-around;
    padding: 10px;
  }
`;

const NavItem = styled.li`
  display: flex;
  align-items: center;
  padding: 15px 25px;
  gap: 13px;
  cursor: pointer;
  font-size: 24px;
  color: #374151;
  background-color: ${(props) => (props.$active ? "#eff6ff" : "transparent")};
  border-left: ${(props) => (props.$active ? "4px solid #2563eb" : "none")};
  @media (max-width: 991px) {
    padding: 10px;
  }
`;

const LogoutButton = styled.button`
  margin-top: auto;
  border-top: 1px solid #e5e7eb;
  padding: 15px 25px;
  display: flex;
  align-items: center;
  gap: 13px;
  font-size: 24px;
  color: #374151;
  cursor: pointer;
  background: none;
  border: none;
  text-align: left;
`;

export default Sidebar;