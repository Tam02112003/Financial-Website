import React, { useState } from "react";
import styled from "styled-components";

function ExportButtons({ dateRange, onExport }) {
  const [loading, setLoading] = useState(false);
  const [exportType, setExportType] = useState(null);

  const handleExport = async (type) => {
    if (!dateRange?.startDate || !dateRange?.endDate) {
      alert("Vui lòng chọn khoảng thời gian");
      return;
    }

    try {
      setLoading(true);
      setExportType(type);
      await onExport(type, dateRange);
    } catch (error) {
      console.error(`Export ${type} failed:`, error);
      alert(`Xuất ${type} thất bại: ${error.message}`);
    } finally {
      setLoading(false);
      setExportType(null);
    }
  };

  return (
    <ButtonGroup>
      <PdfButton 
        onClick={() => handleExport('pdf')}
        disabled={loading && exportType === 'pdf'}
      >
        {loading && exportType === 'pdf' ? 'Đang xuất...' : 'Xuất PDF'}
      </PdfButton>
      
      <ExcelButton 
        onClick={() => handleExport('excel')}
        disabled={loading && exportType === 'excel'}
      >
        {loading && exportType === 'excel' ? 'Đang xuất...' : 'Xuất Excel'}
      </ExcelButton>
    </ButtonGroup>
  );
}

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
`;

const BaseButton = styled.button`
  padding: 10px 20px;
  border-radius: 6px;
  font-size: 16px;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  align-items: center;
  gap: 8px;

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const PdfButton = styled(BaseButton)`
  background-color: #dc2626;
  color: white;
  &:hover:not(:disabled) {
    background-color: #b91c1c;
  }
`;

const ExcelButton = styled(BaseButton)`
  background-color: #10b981;
  color: white;
  &:hover:not(:disabled) {
    background-color: #0d9f6e;
  }
`;

export default ExportButtons;