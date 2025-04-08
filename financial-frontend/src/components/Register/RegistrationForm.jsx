"use client";
import React, { useState } from "react";
import styled from "styled-components";
import FormInput from "./FormInput";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(""); // Thêm state cho thông báo thành công
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset lỗi trước khi gửi request
    setSuccess(""); // Reset thành công trước khi gửi request
    try {
      const response = await axios.post(
        "http://localhost:8080/api/auth/register",
        formData,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setSuccess(response.data.message); // Hiển thị thông báo thành công
      setTimeout(() => {
        navigate("/login"); // Chuyển hướng sau 2 giây
      }, 2000);
    } catch (err) {
      setError(err.response?.data?.error || "Đăng ký thất bại"); // Hiển thị lỗi
    }
  };

  return (
    <PageContainer>
      <FormContainer>
        <FormContent>
          <FormTitle>Đăng ký</FormTitle>
          <FormSubtitle>Tạo tài khoản mới</FormSubtitle>
          {success && <SuccessText>{success}</SuccessText>} {/* Hiển thị thông báo thành công */}
          {error && <ErrorText>{error}</ErrorText>} {/* Hiển thị thông báo lỗi */}

          <Form onSubmit={handleSubmit}>
            <FormInput
              label="Tên đăng nhập"
              type="text"
              placeholder="Nhập tên đăng nhập"
              leftIcon={
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/926565d8803c15bec4cf409198f45c0c6e44e128?placeholderIfAbsent=true"
                  alt=""
                />
              }
              name="username"
              onChange={handleChange}
            />

            <FormInput
              label="Email"
              type="email"
              placeholder="Nhập địa chỉ email"
              leftIcon={
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/e97802de33f643ef84fa67ace8c4a1b22498c40e?placeholderIfAbsent=true"
                  alt=""
                />
              }
              name="email"
              onChange={handleChange}
            />

            <FormInput
              label="Mật khẩu"
              type="password"
              placeholder="Nhập mật khẩu"
              leftIcon={
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/926565d8803c15bec4cf409198f45c0c6e44e128?placeholderIfAbsent=true"
                  alt=""
                />
              }
              rightIcon={
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/fcbb2b3044ddf0e5a0400647c78d4bae26ae6644?placeholderIfAbsent=true"
                  alt=""
                />
              }
              name="password"
              onChange={handleChange}
            />

            <FormInput
              label="Xác nhận mật khẩu"
              type="password"
              placeholder="Nhập lại mật khẩu"
              leftIcon={
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/926565d8803c15bec4cf409198f45c0c6e44e128?placeholderIfAbsent=true"
                  alt=""
                />
              }
              rightIcon={
                <img
                  src="https://cdn.builder.io/api/v1/image/assets/TEMP/fcbb2b3044ddf0e5a0400647c78d4bae26ae6644?placeholderIfAbsent=true"
                  alt=""
                />
              }
              name="confirmPassword"
              onChange={handleChange}
            />

            <SubmitButton type="submit">Đăng ký</SubmitButton>

            <LoginPrompt>
              <PromptText>bạn đã có tài khoản?</PromptText>
              <LoginLink href="/login">Đăng nhập</LoginLink>
            </LoginPrompt>
          </Form>
        </FormContent>
      </FormContainer>
    </PageContainer>
  );
};

// Styled components
const PageContainer = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: screen;
  width: 100%;
  background-color: center;
  background-image: url("https://cdn.builder.io/api/v1/image/assets/TEMP/4e6a484e8563ad8e439645be5c322e2f8fd95871?placeholderIfAbsent=true");
`;

const FormContainer = styled.div`
  width: 900px;
  background-color: #fffcfc;
  border-radius: 25px;
  padding: 40px;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);

  @media (max-width: 991px) {
    width: 90%;
    padding: 30px;
  }

  @media (max-width: 640px) {
    width: 95%;
    padding: 20px;
  }
`;

const FormContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
`;

const FormTitle = styled.h1`
  font-size: 40px;
  font-weight: 700;
  font-family: "Times New Roman";
  color: #000;
`;

const FormSubtitle = styled.h2`
  font-size: 24px;
  font-weight: 400;
  font-family: "Times New Roman";
  color: #000;
  text-align: center;
`;

const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 30px;

  @media (max-width: 991px) {
    gap: 25px;
  }

  @media (max-width: 640px) {
    gap: 20px;
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  background-color: #5f5fd5;
  color: #fff7f7;
  font-size: 28px;
  font-weight: 700;
  font-family: "Times New Roman";
  border-radius: 10px;
  padding-top: 16px;
  padding-bottom: 16px;
  margin-top: 20px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #4b4bc7;
  }
`;

const LoginPrompt = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  margin-top: 20px;
`;

const PromptText = styled.span`
  font-size: 24px;
  font-weight: 400;
  font-family: "Times New Roman";
  color: #000;
`;

const LoginLink = styled.a`
  font-size: 24px;
  font-weight: 400;
  font-family: "Times New Roman";
  color: #5f58e2;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const ErrorText = styled.p`
  color: red;
  font-size: 20px;
  font-family: "Times New Roman";
  text-align: center;
`;

const SuccessText = styled.p`
  color: green;
  font-size: 20px;
  font-family: "Times New Roman";
  text-align: center;
`;

export default RegistrationForm;