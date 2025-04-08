import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
function ProfileHeader() {
  const navigate = useNavigate();
  return (
    <HeaderContainer>
      <HeaderIcon

      onClick={() => navigate("/dashboard")}
       src="https://cdn.builder.io/api/v1/image/assets/434fdd8a623f425eb418e45999caceb8/105abd8432c1bb4c12e4334096a3be3d96f66a5e?placeholderIfAbsent=true" alt="Account icon" />
      <HeaderTitle>Thông tin tài khoản</HeaderTitle>
    </HeaderContainer>
  );
}

const HeaderContainer = styled.header`
  display: flex;
  width: 491px;
  max-width: 100%;
  align-items: stretch;
  gap: 20px;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const HeaderIcon = styled.img`
  aspect-ratio: 1.03;
  object-fit: contain;
  object-position: center;
  width: 40px;
  flex-shrink: 0;
`;

const HeaderTitle = styled.h1`
  font-size: 36px;
  font-weight: 700;
  margin: 0;
`;

export default ProfileHeader;
