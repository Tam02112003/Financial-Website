import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

// Helper function to get auth header
const getAuthHeader = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// Transaction endpoints
export const fetchTransactions = async (startDate, endDate) => {
  try {
    const params = new URLSearchParams();
    if (startDate) params.append('startDate', startDate.toISOString());
    if (endDate) params.append('endDate', endDate.toISOString());

    const response = await axios.get(`${API_BASE_URL}/transactions`, {
      params,
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const addTransaction = async (transactionData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/transactions`, transactionData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error adding transaction:', error);
    throw error;
  }
};

export const updateTransaction = async (id, transactionData) => {
  try {
    const response = await axios.put(`${API_BASE_URL}/transactions/${id}`, transactionData, {
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};


export const deleteTransaction = async (id) => {
  try {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('No authentication token found');
    }

    const response = await axios.delete(`${API_BASE_URL}/transactions/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting transaction:', error);
    throw new Error(error.response?.data?.message || 'Failed to delete transaction');
  }
};


// Report endpoints
export const getDetailedReport = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/reports/detailed`, {
      params: { startDate: startDate.toISOString(), endDate: endDate.toISOString() },
      headers: getAuthHeader()
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching detailed report:', error);
    throw error;
  }
};

export const exportToPdf = async (startDate, endDate) => {
  try {
    // Format dates to YYYY-MM-DD for API
    const params = {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };

    const response = await axios.get(`${API_BASE_URL}/reports/details/export-pdf`, {
      params,
      headers: getAuthHeader(),
      responseType: 'blob'
    });
    
    return response.data;
  } catch (error) {
    console.error('Error exporting PDF:', error);
    throw new Error('Không thể xuất PDF. Vui lòng kiểm tra lại dữ liệu.');
  }
};

export const exportToExcel = async (startDate, endDate) => {
  try {
    // Format dates to YYYY-MM-DD for API
    const params = {
      startDate: startDate.toISOString().split('T')[0],
      endDate: endDate.toISOString().split('T')[0]
    };

    const response = await axios.get(`${API_BASE_URL}/reports/details/export-excel`, {
      params,
      headers: getAuthHeader(),
      responseType: 'blob'
    });
    
    return response.data;
  } catch (error) {
    console.error('Error exporting Excel:', error);
    throw new Error('Không thể xuất Excel. Vui lòng kiểm tra lại dữ liệu.');
  }
};


const API_URL = 'http://localhost:8080/api';

export const getCategoryStats = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_URL}/transactions/category-stats`, {
      params: {
        startDate: startDate.toISOString().split('T')[0], // Format YYYY-MM-DD
        endDate: endDate.toISOString().split('T')[0]
      },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching category stats:', error);
    throw error;
  }
};
export const getCategories = async () => {
  try {
    const response = await axios.get(`${API_URL}/categories`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const getStatistics = async (startDate, endDate) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/transactions/category-stats`, {
      params: {
        startDate: startDate.toISOString().split('T')[0], // Định dạng YYYY-MM-DD
        endDate: endDate.toISOString().split('T')[0],
      },
      headers: getAuthHeader(), // Sử dụng hàm lấy header
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching statistics:', error);
    throw new Error('Không thể lấy dữ liệu thống kê.');
  }
};



