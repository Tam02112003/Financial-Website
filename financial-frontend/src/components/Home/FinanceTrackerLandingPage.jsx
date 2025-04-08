"use client";
import * as React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
// Header Component
const Header = () => {
    const navigate = useNavigate();
  return (
    <HeaderContainer>
      <HeaderContent>
        <Logo>FinanceTracker</Logo>
        <NavMenu>
          <NavItem>Tính năng</NavItem>
          <NavItem>Lợi ích</NavItem>
          <NavItem>Bắt đầu</NavItem>
        </NavMenu>
        <AuthButtons>
          <LoginButton
          onClick={() => navigate("/login")}
          >Đăng nhập</LoginButton>
          <SignupButton
           onClick={() => navigate("/register")}
          >Đăng ký</SignupButton>
        </AuthButtons>
      </HeaderContent>
    </HeaderContainer>
  );
};

// Hero Section Component
const HeroSection = () => {
    const navigate = useNavigate();
  return (
    <HeroContainer>
      <HeroTitle>Quản lý chi tiêu</HeroTitle>
      <HeroHeadline>
        <h1>
          <span style={{ fontSize: "38px", fontWeight: "900" }}>
            thông minh và hiệu quả
          </span>
        </h1>
      </HeroHeadline>
      <HeroDescription>
        Giúp bạn theo dõi, phân tích và kiểm soát chi tiêu một cách dễ dàng.{" "}
        <br />
        Đạt được mục tiêu tài chính của bạn với công cụ quản lý tài chính thông
        minh
      </HeroDescription>
      <HeroButtons>
        <StartButton 
          onClick={() => navigate("/login")}>Bắt đầu ngay</StartButton>
        <LearnMoreButton>Tìm hiểu thêm</LearnMoreButton>
      </HeroButtons>
    </HeroContainer>
  );
};

// Feature Item Component
const FeatureItem = ({ imageUrl, title }) => {
  return (
    <FeatureItemContainer>
      <FeatureImage src={imageUrl} alt="" />
      <FeatureTitle>{title}</FeatureTitle>
    </FeatureItemContainer>
  );
};

// Features Section Component
const FeaturesSection = () => {
  return (
    <FeaturesSectionContainer>
      <SectionTag>TÍNH NĂNG</SectionTag>
      <SectionTitle>Quản lý tài chính thông minh hơn</SectionTitle>
      <SectionDescription>
        Các tính năng được thiết kế giúp chi tiêu hiệu quả hơn
      </SectionDescription>
      <FeaturesGrid>
        <FeaturesColumn>
          <FeatureItem imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/743d0434a139bc20b4988180e4e6051eeacf6ce5" title="Theo dõi chi tiêu" />
          <FeatureItem imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/0e13bc5e2c15a00f34420c89b74e53e73743bb6a" title="Quản lý danh mục" />
        </FeaturesColumn>
        <FeaturesColumn>
          <FeatureItem imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/23f4ba4195f8cb93dc0dc275b0e7af2e5a9fdf8a" title="Phân tích chi tiết" />
          <FeatureItem imageUrl="https://cdn.builder.io/api/v1/image/assets/TEMP/6dced1f9b18f6361ff42a8f5d91462120cf2c2ed" title="Theo dõi xu hướng" />
        </FeaturesColumn>
      </FeaturesGrid>
    </FeaturesSectionContainer>
  );
};

// Benefit Item Component
const BenefitItem = ({ title }) => {
  return (
    <BenefitItemContainer>
      <BenefitIcon src="https://cdn.builder.io/api/v1/image/assets/TEMP/3efe7ba5521889943c4f89bc342913dfef0dd5fd" alt="" />
      <BenefitText>{title}</BenefitText>
    </BenefitItemContainer>
  );
};

// Benefits Section Component
const BenefitsSection = () => {
  return (
    <BenefitsSectionContainer>
      <SectionTag>LỢI ÍCH</SectionTag>
      <SectionTitle>Tại sao chọn FinanceTracker</SectionTitle>
      <SectionDescription>
        Chúng tôi cung cấp giải pháp toàn diện giúp bạn quản lý tài chính cá
        nhân tốt hơn
      </SectionDescription>
      <BenefitsGrid>
        <BenefitsColumn>
          <BenefitItem title="Tiết kiệm thời gian quản lý chi tiêu" />
          <BenefitItem title="Lập kế hoạch tài chính hiệu quả" />
          <BenefitItem title="Kiểm soát chi tiêu tốt hơn" />
        </BenefitsColumn>
        <BenefitsColumn>
          <BenefitItem title="Hiểu rõ hơn về thói quen chi tiêu" />
          <BenefitItem title="Đạt được mục tiêu tài chính rõ ràng" />
          <BenefitItem title="Theo dõi ngân sách một cách trực quan" />
        </BenefitsColumn>
      </BenefitsGrid>
    </BenefitsSectionContainer>
  );
};

// Main Component
function FinanceTrackerLandingPage() {
  return (
    <PageContainer>
      <Header />
      <MainContent>
        <HeroSection />
        <FeaturesSection />
        <BenefitsSection />
      </MainContent>
    </PageContainer>
  );
}

// Styled Components
const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: screen;
  background-color: #fff;
  font-family: Inter;
`;

const HeaderContainer = styled.header`
  display: flex;
  width: 100%;
  height: 110px;
  align-items: center;
  border-width: 1px;
  border-color: #d1d5db;
  padding-left: 18px;
  padding-right: 18px;
  @media (max-width: 991px) {
    padding-left: 12px;
    padding-right: 12px;
  }
  @media (max-width: 640px) {
    padding-left: 8px;
    padding-right: 8px;
  }
`;

const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const Logo = styled.h1`
  color: #2563eb;
  font-size: 48px;
  font-weight: 700;
  gap: 10px;
  @media (max-width: 991px) {
    font-size: 40px;
  }
  @media (max-width: 640px) {
    font-size: 32px;
  }
`;

const NavMenu = styled.nav`
  display: flex;
  align-items: center;
  gap: 20px;
  @media (max-width: 991px) {
    display: none;
  }
`;

const NavItem = styled.a`
  color: #6b7280;
  font-size: 28px;
  cursor: pointer;
`;

const AuthButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const LoginButton = styled.button`
  padding: 14px 30px;
  background-color: #2563eb;
  border-radius: 8px;
  color: #fff;
  font-size: 32px;
  border: none;
  cursor: pointer;
  @media (max-width: 991px) {
    font-size: 24px;
  }
  @media (max-width: 640px) {
    font-size: 20px;
  }
`;

const SignupButton = styled.button`
  padding: 14px 30px;
  background-color: #2563eb;
  border-radius: 8px;
  color: #fff;
  font-size: 32px;
  border: none;
  cursor: pointer;
  @media (max-width: 991px) {
    font-size: 24px;
  }
  @media (max-width: 640px) {
    font-size: 20px;
  }
`;

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const HeroContainer = styled.section`
  display: flex;
  flex-direction: column;
  padding: 27px 51px;
  @media (max-width: 991px) {
    padding: 30px;
  }
  @media (max-width: 640px) {
    padding: 20px;
  }
`;

const HeroTitle = styled.h2`
  font-weight: 600;
  font-size: 40px;
  @media (max-width: 991px) {
    font-size: 32px;
  }
  @media (max-width: 640px) {
    font-size: 28px;
  }
`;

const HeroHeadline = styled.div`
  color: #2563eb;
  font-weight: 900;
  font-size: 3px;
`;

const HeroDescription = styled.p`
  font-size: 20px;
  margin-top: 20px;
  @media (max-width: 991px) {
    font-size: 18px;
  }
  @media (max-width: 640px) {
    font-size: 16px;
  }
`;

const HeroButtons = styled.div`
  display: flex;
  gap: 20px;
  margin-top: 30px;
`;

const StartButton = styled.button`
  padding: 19px 41px;
  background-color: #2563eb;
  border-radius: 8px;
  color: #fff;
  font-size: 20px;
  border: none;
  cursor: pointer;
`;

const LearnMoreButton = styled.button`
  padding: 14px;
  background-color: #eff6ff;
  border-radius: 8px;
  color: #2563eb;
  font-size: 20px;
  border: none;
  cursor: pointer;
`;

const FeaturesSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  padding: 0 20px;
`;

const SectionTag = styled.p`
  color: #2563eb;
  font-size: 20px;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 28px;
  font-weight: 900;
  text-align: center;
  margin-top: 14px;
`;

const SectionDescription = styled.p`
  color: #6b7280;
  font-size: 20px;
  text-align: center;
  margin-top: 14px;
`;

const FeaturesGrid = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 831px;
  margin-top: 32px;
  @media (max-width: 991px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const FeaturesColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 40px;
`;

const FeatureItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 29px;
`;

const FeatureImage = styled.img`
  width: 52px;
  height: 52px;
  border: 1px solid #2563eb;
  border-radius: 8px;
`;

const FeatureTitle = styled.h3`
  font-size: 24px;
`;

const BenefitsSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 50px;
  padding: 0 20px;
`;

const BenefitsGrid = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1200px;
  margin-top: 32px;
  @media (max-width: 991px) {
    flex-direction: column;
    gap: 30px;
  }
`;

const BenefitsColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const BenefitItemContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 29px;
`;

const BenefitIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const BenefitText = styled.p`
  font-size: 24px;
`;

export default FinanceTrackerLandingPage;
