"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import SidebarContainer from "../SidebarTransaction";
import { deleteTransaction } from '../../services/api';

function TransactionFinanceTracker() {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false); // Thêm state cho trạng thái xóa

  const [formData, setFormData] = useState({
    amount: '',
    description: '',
    categoryName: '',
    date: new Date().toISOString().split('T')[0],
    type: 'expense'
  });

  useEffect(() => {
    fetchTransactions();
    fetchCategories();
  }, []);

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8080/api/transactions', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setTransactions(response.data);
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

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

  const handleDelete = async (transactionId) => {
    if (window.confirm('Bạn chắc chắn muốn xóa giao dịch này?')) {
      setIsDeleting(true);
      try {
        await deleteTransaction(transactionId);
        setTransactions(transactions.filter(t => t.id !== transactionId));
        alert('Xóa giao dịch thành công');
      } catch (error) {
        console.error('Delete error:', error);
        alert(`Xóa thất bại: ${error.message}`);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  const handleEditClick = (transaction) => {
    setEditingId(transaction.id);
    setFormData({
      amount: transaction.amount.toString(),
      description: transaction.description,
      categoryName: transaction.categoryName,
      date: new Date(transaction.date).toISOString().split('T')[0],
      type: transaction.type
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      amount: '',
      description: '',
      categoryName: '',
      date: new Date().toISOString().split('T')[0],
      type: 'expense'
    });
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
    
    if (!editingId) {
      setError("ID giao dịch không hợp lệ");
      return;
    }
  
    try {
      const data = {
        ...formData,
        amount: parseFloat(formData.amount),
        date: new Date(formData.date),
        categoryId: categories.find(category => category.name === formData.categoryName)?.id
      };
  
      await axios.put(`http://localhost:8080/api/transactions/${editingId}`, data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
  
      fetchTransactions();
      handleCancelEdit();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <AppContainer>
      <SidebarContainer></SidebarContainer>
      <MainContent>
        <ContentHeader>DANH SÁCH GIAO DỊCH</ContentHeader>
        
        {editingId !== null && (
          <EditForm onSubmit={handleSubmit}>
            {/* Form edit giữ nguyên */}
          </EditForm>
        )}

        <CategoryTable>
          <TableHeader>
            <DateHeader>Ngày</DateHeader>
            <CategoryHeader>Danh mục</CategoryHeader>
            <DescriptionHeader>Mô tả</DescriptionHeader>
            <AmountHeader>Số tiền</AmountHeader>
            <ActionHeader>Hành động</ActionHeader>
          </TableHeader>
          
          {loading ? (
            <TableRow>
              <DescriptionCell colSpan="5">Đang tải dữ liệu...</DescriptionCell>
            </TableRow>
          ) : error ? (
            <TableRow>
              <DescriptionCell colSpan="5">Lỗi: {error}</DescriptionCell>
            </TableRow>
          ) : transactions.length > 0 ? (
            transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <DateCell>
                  {new Date(transaction.date).toLocaleDateString('vi-VN')}
                </DateCell>
                <CategoryCell>
                  <span>{transaction.categoryName}</span>
                </CategoryCell>
                <DescriptionCell>{transaction.description}</DescriptionCell>
                <AmountCell>
                  {transaction.amount.toLocaleString('vi-VN')}đ
                </AmountCell>
                <ActionCell>
                  <img
                    src="https://cdn.builder.io/api/v1/image/assets/TEMP/468d634132c54fd9cd9a57d44bc18b792673c5bb"
                    alt="Edit"
                    className="w-[27px] h-[37px]"
                    onClick={() => handleEditClick(transaction)}
                  />
                  <DeleteButton 
                    onClick={() => handleDelete(transaction.id)} 
                    disabled={isDeleting}
                  >
                    <img
                      src="https://cdn.builder.io/api/v1/image/assets/TEMP/9aa2cadc0b37d8f09bea49cc0d571a2f6c4a772c"
                      alt="Delete"
                      className="w-[31px] h-[33px]"
                    />
                    {isDeleting && transaction.id === editingId ? 'Đang xóa...' : ''}
                  </DeleteButton>
                </ActionCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <DescriptionCell colSpan="5">Không có dữ liệu giao dịch</DescriptionCell>
            </TableRow>
          )}
        </CategoryTable>
      </MainContent>
    </AppContainer>
  );
}

// Thêm styled component cho nút xóa
const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-left: 10px;
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
`;


// Các styled components giữ nguyên như trước
const AppContainer = styled.div`
  display: flex;
  min-height: screen;
  background-color: #fff;
`;



// Thêm styled components cho form
const EditForm = styled.form`
  background: #f3f4f6;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
  align-items: end;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const FormLabel = styled.label`
  margin-bottom: 5px;
  font-weight: 500;
`;

const FormInput = styled.input`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 16px;
`;

const FormSelect = styled.select`
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 16px;
`;

const FormActions = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 10px;
`;

const FormButton = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background-color: ${props => props.type === 'button' ? '#f3f4f6' : '#1d4ed8'};
  color: ${props => props.type === 'button' ? '#374151' : 'white'};
  cursor: pointer;
  font-weight: 500;
  
  &:hover {
    background-color: ${props => props.type === 'button' ? '#e5e7eb' : '#1e40af'};
  }
`;

const MainContent = styled.main`
  flex: 1;
  padding: 10px 33px;
  @media (max-width: 991px) {
    padding: 10px 20px;
  }
  @media (max-width: 640px) {
    padding: 10px;
  }
`;

const ContentHeader = styled.h1`
  color: #000;
  font-family: Inter;
  font-size: 32px;
  font-weight: 700;
  margin-bottom: 49px;
`;

const CategoryTable = styled.section`
  border-radius: 8px;
  border-width: 1px;
  border-color: #e5e7eb;
  box-shadow:
    0px 4px 4px 0px rgba(0, 0, 0, 0.25),
    0px 4px 4px 0px rgba(0, 0, 0, 0.25),
    0px 4px 4px 0px rgba(0, 0, 0, 0.25);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 194px 195px 239px 195px 173px;
  border-width: 1px;
  border-color: #d1d5db;
  @media (max-width: 991px) {
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const HeaderCell = styled.div`
  padding: 30px 0px;
  text-align: center;
  color: #b5b8bf;
  font-family: Inter;
  font-size: 24px;
  @media (max-width: 991px) {
    font-size: 20px;
  }
  @media (max-width: 640px) {
    font-size: 16px;
  }
`;

const DateHeader = styled(HeaderCell)``;
const CategoryHeader = styled(HeaderCell)``;
const DescriptionHeader = styled(HeaderCell)``;

const AmountHeader = styled(HeaderCell)`
  @media (max-width: 640px) {
    display: none;
  }
`;

const ActionHeader = styled(HeaderCell)`
  @media (max-width: 640px) {
    display: none;
  }
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 194px 195px 239px 195px 173px;
  border-width: 1px;
  border-color: #d1d5db;
  @media (max-width: 991px) {
    grid-template-columns: 1fr 1fr 1fr 1fr auto;
  }
  @media (max-width: 640px) {
    grid-template-columns: 1fr 1fr 1fr;
  }
`;

const DateCell = styled.div`
  padding: 29px 0px;
  text-align: center;
  color: #6b7280;
  font-family: Inter;
  font-size: 24px;
  @media (max-width: 991px) {
    font-size: 20px;
  }
  @media (max-width: 640px) {
    font-size: 16px;
  }
`;

const CategoryCell = styled.div`
  text-align: center;
  align-items: center;
  gap: 9px;
  padding: 26px 10px 26px 22px;
  color: #6b7280;
  font-family: Inter;
  font-size: 24px;
  @media (max-width: 991px) {
    font-size: 20px;
  }
  @media (max-width: 640px) {
    font-size: 16px;
  }
`;

const DescriptionCell = styled.div`
  padding: 29px 0px;
  text-align: center;
  color: #6b7280;
  font-family: Inter;
  font-size: 24px;
  @media (max-width: 991px) {
    font-size: 20px;
  }
  @media (max-width: 640px) {
    font-size: 16px;
  }
`;

const AmountCell = styled.div`
  padding: 29px 0px;
  text-align: center;
  color: #000;
  font-family: Inter;
  font-size: 24px;
  @media (max-width: 991px) {
    font-size: 20px;
  }
  @media (max-width: 640px) {
    display: none;
  }
`;

const ActionCell = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 26.756px;
  padding: 18px 0px;
  @media (max-width: 640px) {
    display: none;
  }
`;

export default TransactionFinanceTracker;
