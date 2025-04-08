// DateRangeFilter.jsx
"use client";
import React from "react";
import styled from "styled-components";

const DateRangeFilter = ({ onDateRangeChange, selectedRange }) => {
  const handleRangeChange = (range) => {
    onDateRangeChange(range);
  };

  const getDateRangeText = () => {
    if (selectedRange === '7days') return '7 ngày trước';
    if (selectedRange === 'lastMonth') return 'Tháng trước';
    if (selectedRange === 'thisMonth') return 'Tháng này';
    if (selectedRange === 'lastYear') return 'Năm trước';
    return '01/03/2025 - 31/03/2025'; // default
  };

  return (
    <FilterContainer>
      <LabelContainer>
        <div
          dangerouslySetInnerHTML={{
            __html: '<svg id="105:11" layer-name="Label" width="310" height="22" viewBox="0 0 310 22" fill="none" xmlns="http://www.w3.org/2000/svg" class="h-[20px]"> <path d="M9.99716 5.46164H10.4957V6.43014C10.4957 6.60016 10.5531 6.80732 10.7165 6.96514C10.8707 7.1141 11.0599 7.17123 11.2454 7.17123H11.7447C11.9072 7.17123 12.1124 7.12078 12.2736 6.96514C12.4295 6.81455 12.4943 6.62331 12.4943 6.43014V5.46164H12.9929H15.9887H16.4872V6.43014C16.4872 6.60016 16.5446 6.80732 16.708 6.96514C16.8622 7.1141 17.0513 7.17123 17.2369 7.17123H17.7362C17.8987 7.17123 18.1039 7.12078 18.2651 6.96514C18.421 6.81455 18.4858 6.62332 18.4858 6.43014V5.46164H18.9844H19.983C20.1121 5.46164 20.2196 5.50083 20.339 5.60645C20.4456 5.71881 20.4816 5.81456 20.4816 5.93699V7.38767H19.983H8.99858H8.5V5.93699C8.5 5.81883 8.54055 5.71065 8.65251 5.59616L8.29504 5.24658L8.65251 5.59616C8.74073 5.50596 8.84479 5.46164 8.99858 5.46164H9.99716ZM10.5554 3.93954C10.5253 4.01147 10.5078 4.08496 10.5003 4.15491C10.5071 4.07808 10.5251 4.00698 10.5554 3.93954ZM12.4912 4.16898C12.4814 4.06049 12.4481 3.94251 12.3801 3.8345C12.4483 3.93228 12.4833 4.03954 12.4912 4.16898ZM16.5469 3.93955C16.5168 4.01148 16.4993 4.08497 16.4918 4.1549C16.4986 4.07808 16.5166 4.00699 16.5469 3.93955ZM18.4827 4.16896C18.4729 4.0605 18.4396 3.94255 18.3716 3.83455C18.4398 3.93231 18.4748 4.03955 18.4827 4.16896Z" fill="black" stroke="black"></path> <text fill="black" xml:space="preserve" style="white-space: pre" font-family="Inter" font-size="20" letter-spacing="0em"><tspan x="31" y="17.2727">Khoảng thời gian:</tspan></text> </svg>',
          }}
        />
      </LabelContainer>
      <FilterOptions>
        <FilterOption 
          onClick={() => handleRangeChange('7days')}
          active={selectedRange === '7days'}
        >
          7 ngày trước
        </FilterOption>
        <FilterOption 
          onClick={() => handleRangeChange('lastMonth')}
          active={selectedRange === 'lastMonth'}
        >
          Tháng trước
        </FilterOption>
        <FilterOption 
          onClick={() => handleRangeChange('thisMonth')}
          active={selectedRange === 'thisMonth'}
        >
          Tháng này
        </FilterOption>
        <FilterOption 
          onClick={() => handleRangeChange('lastYear')}
          active={selectedRange === 'lastYear'}
        >
          Năm trước
        </FilterOption>
      </FilterOptions>
      <DateRange>{getDateRangeText()}</DateRange>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  border-width: 1px;
  border-color: #e5e7eb;
`;

const LabelContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
`;

const FilterOptions = styled.div`
  display: flex;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const FilterOption = styled.button`
  color: ${props => props.active ? '#2563eb' : '#000'};
  font-size: 20px;
  font-weight: ${props => props.active ? '700' : 'normal'};
  height: 45px;
  padding-left: 13px;
  padding-right: 13px;
  border-radius: 6px;
  border-width: 1px;
  border-color: #d1d5db;
  background-color: ${props => props.active ? '#eff6ff' : '#fff'};
  cursor: pointer;
`;

const DateRange = styled.p`
  color: #000;
  font-size: 20px;
  padding-left: 25px;
  padding-right: 25px;
  padding-top: 5px;
  padding-bottom: 5px;
`;

export default DateRangeFilter;