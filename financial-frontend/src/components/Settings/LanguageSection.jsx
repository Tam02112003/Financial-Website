"use client";
import React from "react";
import styled from "styled-components";

const LanguageSection = () => {
  return (
    <>
      <SectionTitle>Ngôn ngữ</SectionTitle>
      <LanguageToggle>
        <ToggleIcon src="https://cdn.builder.io/api/v1/image/assets/434fdd8a623f425eb418e45999caceb8/461993607f4ca3fadd990e0e0ae8e6577d8dc742?placeholderIfAbsent=true" alt="Language Toggle" />
      </LanguageToggle>
    </>
  );
};

const SectionTitle = styled.h2`
  color: #000000;
  font-size: 32px;
  font-family:
    "Times New Roman",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-weight: 700;
  align-self: flex-start;
  margin-top: 95px;
  margin-bottom: 0;

  @media (max-width: 991px) {
    margin-top: 40px;
  }
`;

const LanguageToggle = styled.div`
  border-radius: 25px;
  background-color: #d9d9d9;
  border: 1px solid #000000;
  display: flex;
  margin-top: 31px;
  padding: 26px 80px;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 26px 20px;
  }
`;

const ToggleIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 39px;
`;

export default LanguageSection;
