"use client";
import * as React from "react";
import styled from "styled-components";
import LoginForm from "./LoginForm";

const LoginPage = () => {
  
  return (
    <PageContainer>
      <PageContent>
        <BackgroundImage
          src="https://cdn.builder.io/api/v1/image/assets/TEMP/d642d5792f2765b0c6330bd91952016808ced201?placeholderIfAbsent=true&apiKey=434fdd8a623f425eb418e45999caceb8"
          alt="Background"
        />
        <ContentWrapper>
          <ContentRow>
            <LeftColumn>
              <ImageContainer>
                <IllustrationImage
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/f1ec9350812bf82aac1562d8d9160f2f346e038a?placeholderIfAbsent=true&apiKey=434fdd8a623f425eb418e45999caceb8"
                  alt="Login illustration"
                />
              </ImageContainer>
            </LeftColumn>
            <RightColumn>
              <LoginForm />
            </RightColumn>
          </ContentRow>
        </ContentWrapper>
      </PageContent>
    </PageContainer>
  );
};

const PageContainer = styled.main`
  background-color: rgba(255, 255, 255, 1);
  overflow: hidden;
`;

const PageContent = styled.section`
  display: flex;
  flex-direction: column;
  position: relative;
  min-height: 1024px;
  width: 100%;
  padding: 152px 15px;
  align-items: stretch;
  justify-content: center;

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 100px 20px;
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

const ContentWrapper = styled.div`
  position: relative;
  margin-bottom: -28px;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-bottom: 10px;
  }
`;

const ContentRow = styled.div`
  gap: 20px;
  display: flex;

  @media (max-width: 991px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0px;
  }
`;

const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 50%;
  margin-left: 0px;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

const ImageContainer = styled.div`
  border-radius: 25px;
  background-color: rgba(155, 164, 204, 1);
  position: relative;
  display: flex;
  margin-top: 14px;
  flex-grow: 1;
  padding: 78px 0;
  flex-direction: column;
  align-items: stretch;
  justify-content: center;
  width: 100%;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const IllustrationImage = styled.img`
  aspect-ratio: 1.27;
  object-fit: contain;
  object-position: center;
  width: 100%;
  border-radius: 25px;

  @media (max-width: 991px) {
    max-width: 100%;
  }
`;

const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 100%;
  margin-left: 20px;

  @media (max-width: 991px) {
    width: 100%;
  }
`;

export default LoginPage;
