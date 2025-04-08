"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  PageWrapper,
  ContentWrapper,
  BackgroundImage,
  FormContainer,
  HeaderContainer,
  HeaderIcon,
  HeaderTitle,
  EmailDisplay,
  FormField,
  PasswordField,
  UpdateButton,
} from "./AccountEditComponents";

function AccountEdit() {
  const [formData, setFormData] = useState({
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/account", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setFormData(prev => ({
        ...prev,
        email: response.data.email
      }));
      setLoading(false);
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Không thể tải thông tin tài khoản");
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    // Validate inputs
    if (!formData.currentPassword) {
      setError("Vui lòng nhập mật khẩu hiện tại");
      return;
    }

    if (!formData.newPassword) {
      setError("Vui lòng nhập mật khẩu mới");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("Mật khẩu mới và xác nhận mật khẩu không khớp");
      return;
    }

    // Validate password strength
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.newPassword)) {
      setError("Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký tự đặc biệt");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const updateData = {
        email: formData.email,
        password: formData.newPassword,
        currentPassword: formData.currentPassword
      };

  

      await axios.put("http://localhost:8080/api/account", updateData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });

      alert("Cập nhật tài khoản thành công!");
      navigate("/account-info");
    } catch (err) {
      console.error("Error updating account:", err);
      setError(err.response?.data?.message || "Có lỗi xảy ra khi cập nhật");
    }
  };

  if (loading) {
    return (
      <PageWrapper>
        <ContentWrapper>
          <BackgroundImage src="https://cdn.builder.io/api/v1/image/assets/434fdd8a623f425eb418e45999caceb8/d642d5792f2765b0c6330bd91952016808ced201?placeholderIfAbsent=true" alt="Background" />
          <FormContainer>
            <p>Đang tải thông tin...</p>
          </FormContainer>
        </ContentWrapper>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <ContentWrapper>
        <BackgroundImage src="https://cdn.builder.io/api/v1/image/assets/434fdd8a623f425eb418e45999caceb8/d642d5792f2765b0c6330bd91952016808ced201?placeholderIfAbsent=true" alt="Background" />
        <FormContainer>
          <HeaderContainer>
            <HeaderIcon 
            onClick={() => navigate("/account-info")}
            src="https://cdn.builder.io/api/v1/image/assets/434fdd8a623f425eb418e45999caceb8/ec3b09bd3136bb4febf92ccffa311ed370b18c47?placeholderIfAbsent=true" alt="Account icon" />
            <HeaderTitle>Chỉnh sửa tài khoản</HeaderTitle>
          </HeaderContainer>

          {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

          <FormField label="Email">
            <EmailDisplay>{formData.email}</EmailDisplay>
          </FormField>

          <FormField label="Mật khẩu hiện tại">
            <PasswordField 
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              placeholder="Nhập mật khẩu hiện tại"
              icon="https://cdn.builder.io/api/v1/image/assets/434fdd8a623f425eb418e45999caceb8/7aeb89eb413c232f1c9d5c2aff92d116d297c885?placeholderIfAbsent=true"
            />
          </FormField>

          <FormField label="Mật khẩu mới">
            <PasswordField 
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              placeholder="Nhập mật khẩu mới"
              icon="https://cdn.builder.io/api/v1/image/assets/434fdd8a623f425eb418e45999caceb8/7aeb89eb413c232f1c9d5c2aff92d116d297c885?placeholderIfAbsent=true"
            />
          </FormField>

          <FormField label="Nhập lại mật khẩu">
            <PasswordField
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Xác nhận lại mật khẩu mới"
              icon="https://cdn.builder.io/api/v1/image/assets/434fdd8a623f425eb418e45999caceb8/7aeb89eb413c232f1c9d5c2aff92d116d297c885?placeholderIfAbsent=true"
            />
          </FormField>

          <UpdateButton onClick={handleSubmit}>Cập nhật tài khoản</UpdateButton>
        </FormContainer>
      </ContentWrapper>
    </PageWrapper>
  );
}

export default AccountEdit;