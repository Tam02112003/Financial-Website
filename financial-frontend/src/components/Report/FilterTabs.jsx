"use client";
import React from "react";
import styled from "styled-components";

const FilterTabs = ({ activeTab, onTabChange }) => {
  return (
    <FilterContainer>
      <FilterTabsRow>
        <TabColumn>
          <TabButton 
            active={activeTab === "day"}
            onClick={() => onTabChange("day")}
          >
            Ngày
          </TabButton>
        </TabColumn>

        <TabColumn>
          <TabButton 
            active={activeTab === "week"}
            onClick={() => onTabChange("week")}
          >
            Tuần
          </TabButton>
        </TabColumn>

        <TabColumn>
          <TabButton 
            active={activeTab === "month"}
            onClick={() => onTabChange("month")}
          >
            Tháng
          </TabButton>
        </TabColumn>
      </FilterTabsRow>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  border-radius: 8px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-color: rgba(209, 213, 219, 1);
  border-style: solid;
  border-width: 1px;
  margin-top: 74px;
  padding: 31px 25px;
  overflow: hidden;
  @media (max-width: 991px) {
    max-width: 100%;
    padding: 31px 20px;
    margin-top: 40px;
  }
`;

const FilterTabsRow = styled.div`
  display: flex;
  gap: 20px;

  @media (max-width: 991px) {
    flex-direction: column;
  }
`;

const TabColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: stretch;
  line-height: normal;
  width: 33%;
  margin-left: ${(props) => (props.index === 0 ? "0px" : "20px")};

  @media (max-width: 991px) {
    width: 100%;
    margin-left: 0;
    margin-top: ${(props) => (props.index === 0 ? "0" : "40px")};
  }
`;

TabColumn.defaultProps = {
  index: 0,
};

const TabButton = styled.button`
  border-radius: 8px;
  background-color: ${props => props.active ? "rgba(59, 130, 246, 1)" : "rgba(229, 231, 235, 1)"};
  border-color: rgba(209, 213, 219, 1);
  border-style: solid;
  border-width: 1px;
  flex-grow: 1;
  padding: 8px 40px;
  overflow: hidden;
  font-family:
    Inter,
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 28px;
  color: ${props => props.active ? "white" : "rgba(0, 0, 0, 1)"};
  font-weight: 400;
  white-space: nowrap;
  width: 100%;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${props => props.active ? "rgba(59, 130, 246, 0.9)" : "rgba(229, 231, 235, 0.8)"};
  }

  @media (max-width: 991px) {
    padding: 8px 20px;
    white-space: initial;
  }
`;

export default FilterTabs;