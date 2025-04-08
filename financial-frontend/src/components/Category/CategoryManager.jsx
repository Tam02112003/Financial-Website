"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import CategoryItem from "./CategoryItem";

function CategoryManager() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:8080/api/categories", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCategories(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;

    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:8080/api/categories",
        { name: newCategory },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNewCategory("");
      fetchCategories(); // Làm mới danh sách sau khi thêm
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleUpdateCategory = async (id, name) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://localhost:8080/api/categories/${id}`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchCategories(); // Làm mới danh sách sau khi cập nhật
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleDeleteCategory = async (id) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa danh mục này?")) {
      try {
        const token = localStorage.getItem("token");
        await axios.delete(`http://localhost:8080/api/categories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchCategories(); // Làm mới danh sách sau khi xóa
      } catch (err) {
        setError(err.response?.data?.message || err.message);
      }
    }
  };

  return (
    <Container>
      <Title>THÊM DANH MỤC</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <AddCategoryForm>
        <CategoryInput
          type="text"
          placeholder="Thêm danh mục mới"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
        />
        <AddButton onClick={handleAddCategory}>Thêm</AddButton>
      </AddCategoryForm>
      {loading ? (
        <LoadingText>Đang tải danh sách...</LoadingText>
      ) : (
        <CategoryList>
          {categories.map((category) => (
            <CategoryItem
              key={category.id}
              id={category.id}
              name={category.name}
              onUpdate={handleUpdateCategory} // Truyền hàm cập nhật
              onDelete={handleDeleteCategory} // Truyền hàm xóa
            />
          ))}
        </CategoryList>
      )}
    </Container>
  );
}
const Container = styled.section`
  flex: 1;
  padding: 29px;
`;

const Title = styled.h2`
  color: #000;
  font-family: Inter, sans-serif;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 46px;
  margin-top: 0;
`;

const AddCategoryForm = styled.div`
  display: flex;
  gap: 11px;
  margin-bottom: 47px;
`;

const CategoryInput = styled.input`
  flex: 1;
  height: 66px;
  border-radius: 4px;
  border-width: 1px;
  border-color: #000;
  background-color: #fff;
  padding-left: 13px;
  padding-right: 13px;
  font-size: 32px;
  font-weight: 300;
  color: #000;

  &::placeholder {
    color: #d9d9d9;
  }
`;

const AddButton = styled.button`
  width: 176px;
  height: 69px;
  border-radius: 8px;
  border-width: 1px;
  border-color: #000;
  background-color: #4c9ce1;
  color: #fff;
  font-family: Inter, sans-serif;
  font-size: 36px;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: #3a8cd2;
  }
`;

const CategoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 53px;
`;

const ErrorMessage = styled.div`
  color: #ff0000;
  font-size: 18px;
  margin-bottom: 20px;
`;

const LoadingText = styled.div`
  font-size: 24px;
  text-align: center;
  padding: 20px;
`;

export default CategoryManager;