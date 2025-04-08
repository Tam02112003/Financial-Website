"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Sidebar from "../SidebarFinance";
import AddTransactionForm from "./AddTransactionForm";
import axios from "axios";

const AddFinanceTracker = () => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    categoryId: "",
    date: new Date().toISOString().split("T")[0],
    type: "expense", 
  });
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/categories', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setCategories(response.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra dữ liệu bắt buộc - phiên bản cải tiến
    const errors = [];
    if (!formData.amount || formData.amount.trim() === '') errors.push('amount');
    if (!formData.description || formData.description.trim() === '') errors.push('description');
    if (!formData.categoryId || formData.categoryId.trim() === '') errors.push('categoryId');
    if (!formData.date || formData.date.trim() === '') errors.push('date');
  
    if (errors.length > 0) {
      setError(`Vui lòng điền đầy đủ thông tin. Thiếu: ${errors.join(', ')}`);
      return;
    }
  
    // Kiểm tra số tiền hợp lệ
    if (isNaN(parseFloat(formData.amount)) || parseFloat(formData.amount) <= 0) {
      setError("Số tiền phải là số dương");
      return;
    }
  
    try {
      // Format lại ngày theo ISO (YYYY-MM-DD)
      let formattedDate;
      if (formData.date.includes('/')) {
        const [month, day, year] = formData.date.split('/');
        formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      } else {
        formattedDate = formData.date;
      }
  
      const data = {
        amount: parseFloat(formData.amount),
        description: formData.description.trim(),
        type: formData.type.toLowerCase(),
        categoryId: parseInt(formData.categoryId),
        date: new Date(formattedDate)
      };
  
      
  
      const response = await axios.post('http://localhost:8080/api/transactions', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
    
  
      // Reset form
      setFormData({
        amount: "",
        description: "",
        categoryId: "",
        date: new Date().toLocaleDateString('en-US'), // MM/DD/YYYY
        type: "expense",
      });
      setError(null);
      
      // Hiển thị thông báo thành công (tuỳ chọn)
      alert("Giao dịch đã được thêm thành công!");
      
    } catch (err) {
      console.error("Lỗi khi thêm giao dịch:", err);
      let errorMsg = "Có lỗi xảy ra khi thêm giao dịch";
      
      if (err.response) {
        errorMsg = err.response.data.message || errorMsg;
        console.error("Chi tiết lỗi:", err.response.data);
      }
      
      setError(errorMsg);
    }
  };

  return (
    <Container>
      <Sidebar />
      <MainContent>
        <PageTitle>Add Transaction</PageTitle>
        {error && <ErrorMessage>{error}</ErrorMessage>}
        <FormContainer>
          <AddTransactionForm
            categories={categories}
            formData={formData}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
          />
        </FormContainer>
      </MainContent>
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  width: 100%;
  height: 100vh;
  background-color: #f9fafb;
`;

const MainContent = styled.section`
  flex: 1;
  padding: 27px 16px 31px 27px;
  @media (max-width: 991px) {
    padding: 20px;
  }
  @media (max-width: 640px) {
    padding: 15px;
  }
`;

const PageTitle = styled.h1`
  color: #1f2937;
  font-family: "Inter", sans-serif;
  font-size: 24px;
  font-weight: 700;
  line-height: 32px;
  margin-bottom: 24px;
`;

const FormContainer = styled.div`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.05);
  background-color: #fff;
  @media (max-width: 640px) {
    padding: 15px;
  }
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 18px;
  margin-bottom: 20px;
`;

export default AddFinanceTracker;