"use client";
import * as React from "react";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

function CategoryItem({ id, name,onUpdate, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(name);
  const [error, setError] = useState(null);

  const handleEditClick = () => {
    setIsEditing(true);
    setEditName(name);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setEditName(name);
    setError(null);
  };

  const handleUpdate = () => {
    onUpdate(id, editName); // Gọi hàm từ component cha
    setIsEditing(false);
  };

  const handleDelete = () => {
    onDelete(id); // Gọi hàm từ component cha
  };

  return (
    <Container>
      {isEditing ? (
        <>
          <EditInput
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleUpdate()}
          />
          <ActionButtons>
            <SaveButton onClick={handleUpdate}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/473ccc9233c5015b3c9a0b8f2041d328f693db02"
                alt="Save"
                style={{ width: "27px", height: "37px" }}
              />
            </SaveButton>
            <CancelButton onClick={handleCancelEdit}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ad2f7bdb0614a65677b71ef7d8e782dbb8253e2"
                alt="Cancel"
                style={{ width: "31px", height: "33px" }}
                onClick={() => setIsEditing(false)}
              />
            </CancelButton>
          </ActionButtons>
        </>
      ) : (
        <>
          <CategoryName>{name}</CategoryName>
          <ActionButtons>
            <EditButton onClick={handleEditClick}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/473ccc9233c5015b3c9a0b8f2041d328f693db02"
                alt="Edit"
                style={{ width: "27px", height: "37px" }}
                
              />
            </EditButton>
            <DeleteButton onClick={handleDelete}>
              <img
                src="https://cdn.builder.io/api/v1/image/assets/TEMP/8ad2f7bdb0614a65677b71ef7d8e782dbb8253e2"
                alt="Delete"
                style={{ width: "31px", height: "33px" }}
              />
            </DeleteButton>
          </ActionButtons>
        </>
      )}
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </Container>
  );
}

const Container = styled.article`
  display: flex;
  align-items: center;
  padding: 13px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #000;
  background-color: #fff;
  position: relative;
`;

const CategoryName = styled.h3`
  flex: 1;
  color: #000;
  font-family: Inter, sans-serif;
  font-size: 32px;
  margin: 0;
`;

const EditInput = styled.input`
  flex: 1;
  height: 40px;
  font-size: 32px;
  font-family: Inter, sans-serif;
  padding: 0 10px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 21px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  padding: 0;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const EditButton = styled(IconButton)`
  &:hover img {
    opacity: 0.8;
  }
`;

const DeleteButton = styled(IconButton)`
  &:hover img {
    opacity: 0.8;
  }
`;

const SaveButton = styled(IconButton)`
  &:hover img {
    opacity: 0.8;
  }
`;

const CancelButton = styled(IconButton)`
  &:hover img {
    opacity: 0.8;
  }
`;

const ErrorMessage = styled.div`
  position: absolute;
  bottom: -25px;
  left: 0;
  color: #ff0000;
  font-size: 14px;
`;

export default CategoryItem;