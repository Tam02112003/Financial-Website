"use client";
import React from "react";
import styled from "styled-components";
import SettingsHeader from "./SettingsHeader";
import LanguageSection from "./LanguageSection";
import ModeSection from "./ModeSection";
import LogoutButton from "./LogoutButton";

const SettingsPage = () => {
  return (
    <PageContainer>
      <ContentWrapper>
        <BackgroundImage src="https://cdn.builder.io/api/v1/image/assets/434fdd8a623f425eb418e45999caceb8/d642d5792f2765b0c6330bd91952016808ced201?placeholderIfAbsent=true" alt="Background" />
        <SettingsContainer>
          <SettingsHeader />
          <LanguageSection />
          <ModeSection />
          <LogoutButton />
        </SettingsContainer>
      </ContentWrapper>
    </PageContainer>
  );
};

const PageContainer = styled.main`
  background-color: #ffffff;
  overflow: hidden;
`;

const ContentWrapper = styled.div`
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

const SettingsContainer = styled.section`
  position: relative;
  border-radius: 25px;
  background-color: #fffbfb;
  display: flex;
  width: 690px;
  max-width: 100%;
  padding: 80px 35px 149px;
  flex-direction: column;
  align-items: stretch;

  @media (max-width: 991px) {
    padding: 80px 20px 100px;
  }
`;

export default SettingsPage;
