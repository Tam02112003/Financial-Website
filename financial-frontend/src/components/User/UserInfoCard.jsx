"use client";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProfileHeader from "./ProfileHeader";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function UserInfoCard() {
  const [userData, setUserData] = useState({
    username: "",
    email: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/account", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setUserData(response.data);
      setError("");
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Không thể tải thông tin tài khoản");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = () => {
    // Chuyển hướng sang trang chỉnh sửa
    navigate("/account-info/edit");
  };

  if (loading) {
    return <LoadingText>Đang tải thông tin...</LoadingText>;
  }

  if (error) {
    return <ErrorMessage>{error}</ErrorMessage>;
  }

  return (
    <CardContainer>
      <ProfileHeader />
      <UserNameField>{userData.username}</UserNameField>
      
      <UsernameLabel>Username:</UsernameLabel>
      <UsernameInput>{userData.username}</UsernameInput>
      
      <EmailLabel>Email:</EmailLabel>
      <EmailInput>{userData.email}</EmailInput>
      
      <EditButton onClick={handleEditClick}>Chỉnh sửa</EditButton>
    </CardContainer>
  );
}

// Thêm styled components mới
const LoadingText = styled.div`
  text-align: center;
  font-size: 24px;
  margin-top: 50px;
`;

const ErrorMessage = styled.div`
  color: red;
  text-align: center;
  font-size: 24px;
  margin-top: 50px;
`;

// Giữ nguyên các styled components cũ
const CardContainer = styled.article`
  position: relative;
  border-radius: 25px;
  background-color: #fffbfb;
  display: flex;
  width: 680px;
  max-width: 100%;
  padding: 91px 20px 147px;
  flex-direction: column;
  align-items: stretch;

  @media (max-width: 991px) {
    padding-bottom: 100px;
  }
`;

const UserNameField = styled.div`
  border-radius: 10px;
  background-color: #fbeeed;
  align-self: center;
  margin-top: 92px;
  width: 560px;
  max-width: 100%;
  padding: 12px 27px 29px;
  font-size: 32px;
  text-align: center;

  @media (max-width: 991px) {
    padding: 13px 20px 31px;
    margin-top: 40px;
  }
`;

const UsernameLabel = styled.label`
  align-self: flex-start;
  margin-top: 57px;
  margin-left: 35px;

  @media (max-width: 991px) {
    margin-left: 10px;
    margin-top: 40px;
  }
`;

const UsernameInput = styled.div`
  border-radius: 10px;
  background-color: #f6eded;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  align-self: center;
  margin-top: 52px;
  width: 580px;
  max-width: 100%;
  padding: 12px 27px 29px;
  font-size: 32px;


  @media (max-width: 991px) {
    padding: 12px 20px 29px;
    margin-top: 40px;
  }
`;

const EmailLabel = styled.label`
  align-self: flex-start;
  margin-top: 58px;
  margin-left: 40px;

  @media (max-width: 991px) {
    margin-left: 10px;
    margin-top: 40px;
  }
`;

const EmailInput = styled.div`
  border-radius: 10px;
  background-color: #f6eded;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  align-self: center;
  margin-top: 42px;
  width: 580px;
  max-width: 100%;
   padding: 12px 27px 29px;
  font-size: 32px;
  color: #000000;
  font-weight: 400;
  white-space: nowrap;
  text-indent: 27px;

  @media (max-width: 991px) {
    padding-right: 20px;
    margin-top: 40px;
    white-space: initial;
  }
`;

const EditButton = styled.button`
  border-radius: 10px;
  background-color: #8dbee9;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-top: 92px;
  margin-left: 20px;
  margin-bottom: -29px;
  padding: 8px 70px 31px;
  text-align: center;
  cursor: pointer;
  border: none;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  color: inherit;

  @media (max-width: 991px) {
    max-width: 100%;
    margin-bottom: 10px;
    padding: 8px 20px 31px;
    margin-top: 40px;
  }
`;

export default UserInfoCard;