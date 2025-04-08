import React from "react";
import styled from "styled-components";

const NavItem = ({ icon, label }) => {
  return (
    <NavItemContainer>
      <IconWrapper>{icon}</IconWrapper>
      <Label>{label}</Label>
    </NavItemContainer>
  );
};

const NavItemContainer = styled.button`
  display: flex;
  align-items: center;
  height: 90px;
  padding: 15px 25px;
  cursor: pointer;
  gap: 13px;
  background: none;
  border: none;
  width: 100%;
  text-align: left;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Label = styled.span`
  color: #374151;
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: 400;
  line-height: 24px;
  @media (max-width: 640px) {
    font-size: 20px;
  }
`;

export default NavItem;
