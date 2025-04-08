"use client";
import React from "react";
import styled from "styled-components";

const SettingsHeader = () => {
  return (
    <HeaderContainer>
      <SettingsIcon 

      onClick={() => window.location.href = "/dashboard"}
      src="https://cdn.builder.io/api/v1/image/assets/434fdd8a623f425eb418e45999caceb8/bcddda185ea367f2a25d479736f71dd3c72afe66?placeholderIfAbsent=true" alt="Settings Icon" />
      <SettingsTitle>Cài đặt</SettingsTitle>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.header`
  display: flex;
  margin-left: 12px;
  width: 351px;
  max-width: 100%;
  align-items: center;
  gap: 20px;
  font-family:
    "Times New Roman",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 36px;
  color: #000000;
  font-weight: 700;
  justify-content: space-between;

  @media (max-width: 991px) {
    margin-left: 10px;
  }
`;

const SettingsIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 39px;
  flex-shrink: 0;
`;

const SettingsTitle = styled.h1`
  margin: 0;
  font-size: 36px;
  font-weight: 700;
  font-family:
    "Times New Roman",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  color: #000000;
`;

export default SettingsHeader;
