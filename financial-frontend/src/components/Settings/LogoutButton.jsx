"use client";
import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const LogoutButton = () => {
    const navigate = useNavigate();
  
    const handleLogout = async () => {
      try {
        // Gọi API logout từ phía backend (nếu có)
        await axios.post("http://localhost:8080/api/auth/logout", {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`
          }
        });
        
        // Xóa token và thông tin người dùng khỏi localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        
        // Chuyển hướng về trang đăng nhập
        navigate("/login");
        
        // Reload trang để đảm bảo state ứng dụng được reset
        window.location.reload();
        
      } catch (error) {
        console.error("Logout error:", error);
        // Nếu có lỗi vẫn xóa token và chuyển hướng
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login");
      }
    };
  
    return (
      <StyledLogoutButton onClick={handleLogout}>
        Đăng Xuất
      </StyledLogoutButton>
    );
  };

const StyledLogoutButton = styled.button`
  border-radius: 15px;
  background-color: #d24747;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 179px;
  margin-bottom: -30px;
  padding: 23px 70px;
  font-family:
    "Times New Roman",
    -apple-system,
    Roboto,
    Helvetica,
    sans-serif;
  font-size: 36px;
  color: #000000;
  font-weight: 700;
  text-align: center;
  border: none;
  cursor: pointer;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-bottom: 10px;
    padding: 23px 20px;
    margin-top: 40px;
  }
`;

export default LogoutButton;
