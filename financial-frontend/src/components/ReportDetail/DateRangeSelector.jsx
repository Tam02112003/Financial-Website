"use client";
import React, { useState } from "react";
import styled from "styled-components";

function DateRangeSelector({ onDateChange }) {
  const [dates, setDates] = useState({
    startDate: '',
    endDate: ''
  });

  const handleDateChange = (e, type) => {
    const newDates = {
      ...dates,
      [type]: e.target.value
    };
    setDates(newDates);
    
    // Convert to Date objects before passing up
    onDateChange({
      startDate: newDates.startDate ? new Date(newDates.startDate) : null,
      endDate: newDates.endDate ? new Date(newDates.endDate) : null
    });
  };

  return (
    <>
      <DateInputGroup>
        <DateLabel>Từ ngày</DateLabel>
        <DateInput 
          type="date" 
          value={dates.startDate}
          onChange={(e) => handleDateChange(e, 'startDate')}
        />
      </DateInputGroup>

      <DateInputGroup>
        <DateLabel>Đến ngày</DateLabel>
        <DateInput 
          type="date" 
          value={dates.endDate}
          onChange={(e) => handleDateChange(e, 'endDate')}
          min={dates.startDate}
        />
      </DateInputGroup>
    </>
  );
}

const DateInputGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1;
  min-width: 280px;
`;

const DateLabel = styled.label`
  color: #374151;
  font-size: 20px;
`;

const DateInput = styled.input`
  padding: 9px 13px;
  border-radius: 6px;
  border: 1px solid #d1d5db;
  font-size: 20px;
`;

export default DateRangeSelector;