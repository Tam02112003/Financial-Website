import React, { useState } from "react";
import styled from "styled-components";
import FormInput from "./FormInput";
import Button from "./Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({
    username: "",
    password: "",
  });
  const [error, setError] = React.useState("");
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(false);
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

// Đoạn mã đăng nhập
const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!formData.username || !formData.password) {
    setError("Vui lòng nhập đầy đủ tên đăng nhập và mật khẩu");
    return;
  }

  try {
    setIsLoading(true);
    setError(null);

    const response = await axios.post(
      "http://localhost:8080/api/auth/login",
      {
        username: formData.username.trim(),
        password: formData.password
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    if (response.data?.token) {
      // Lưu token vào localStorage
      localStorage.setItem("token", response.data.token);
    
      
      // Chuyển hướng bằng navigate
      navigate("/dashboard", { replace: true });
      // Hoặc
      window.location.href = "/dashboard";
    } else {
      throw new Error("Không nhận được token từ server");
    }
  } catch (err) {
    console.error("Login error:", err);
    setError(err.response?.data?.message || "Đăng nhập thất bại");
    localStorage.removeItem("token");
  } finally {
    setIsLoading(false);
  }
};


  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormTitle>Web quản lý chi tiêu</FormTitle>
      <FormSubtitle>Đăng nhập</FormSubtitle>

      {error && <ErrorMessage>{error}</ErrorMessage>}

      <FormInput
        type="text"
        name="username"
        placeholder="Tên đăng nhập"
        value={formData.username}
        onChange={handleInputChange}
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/47fcd893213110b308ce348327f67d96964c3f38?placeholderIfAbsent=true&apiKey=434fdd8a623f425eb418e45999caceb8"
      />

      <FormInput
        type={showPassword ? "text" : "password"}
        name="password"
        placeholder="Mật khẩu"
        value={formData.password}
        onChange={handleInputChange}
        iconSrc="https://cdn.builder.io/api/v1/image/assets/TEMP/1f6591cffb7ea5e5606900edacdee1e5cba61a34?placeholderIfAbsent=true&apiKey=434fdd8a623f425eb418e45999caceb8"
        endIcon={
          <PasswordToggleIcon
            src="https://cdn.builder.io/api/v1/image/assets/TEMP/c96b35a0afabb3905836e66e4248631010b4b06e?placeholderIfAbsent=true&apiKey=434fdd8a623f425eb418e45999caceb8"
            alt="Toggle password visibility"
            onClick={togglePasswordVisibility}
          />
        }
      />

      <Button type="submit" variant="primary">
        Đăng Nhập
      </Button>
      <Button type="button" variant="secondary" onClick={handleRegisterClick}>
        Đăng Ký
      </Button>
    </FormContainer>
  );
};

// Styled components giữ nguyên
const FormContainer = styled.form`
  border-radius: 25px;
  background-color: rgba(254, 250, 250, 1);
  position: relative;
  display: flex;
  margin-left: auto;
  margin-right: auto;
  width: 80%;
  padding: 90px 64px;
  flex-direction: column;
  align-items: stretch;
  font-family: "Times New Roman", -apple-system, Roboto, Helvetica, sans-serif;
  font-size: 32px;
  color: rgba(0, 0, 0, 1);
  font-weight: 700;

  @media (max-width: 991px) {
    max-width: 100%;
    padding: 100px 20px;
  }
`;

const FormTitle = styled.h1`
  font-size: 40px;
  align-self: center;
  margin: 0;
`;

const FormSubtitle = styled.h2`
  align-self: center;
  margin-top: 37px;
  margin-bottom: 0;
`;

const PasswordToggleIcon = styled.img`
  aspect-ratio: 1;
  object-fit: contain;
  object-position: center;
  width: 39px;
  margin-top: 4px;
  flex-shrink: 0;
  cursor: pointer;
`;

const ErrorMessage = styled.p`
  color: red;
  font-size: 18px;
  text-align: center;
  margin: 10px 0;
`;

export default LoginForm;