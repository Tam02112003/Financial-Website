"use client";
import React from "react";
import styled from "styled-components";
import UserInfoCard from "./UserInfoCard";

function UserAccountInfo() {
  return (
    <AccountContainer>
      <ContentWrapper>
        <BackgroundImage src="https://cdn.builder.io/api/v1/image/assets/434fdd8a623f425eb418e45999caceb8/d642d5792f2765b0c6330bd91952016808ced201?placeholderIfAbsent=true" alt="Background" />
        <UserInfoCard />
      </ContentWrapper>
    </AccountContainer>
  );
}

const AccountContainer = styled.main`
  background-color: #ffffff;
  overflow: hidden;
  font-family:
    Times New Roman,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 36px;
  color: #000000;
  font-weight: 700;
`;

const ContentWrapper = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 1024px;
  width: 100%;
  padding: 20px 80px;
  align-items: center;
  justify-content: center;

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 20px;
  }
`;

const BackgroundImage = styled.img`
  position: absolute;
  inset: 0;
  height: 100%;
  width: 100%;
  object-fit: cover;
  object-position: center;
`;

export default UserAccountInfo;
