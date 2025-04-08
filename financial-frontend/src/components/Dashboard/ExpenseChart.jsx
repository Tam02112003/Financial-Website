// ExpenseChart.jsx
import React from "react";
import styled from "styled-components";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import { ChartIcon } from "./Icons";

function ExpenseChart({ expenseByCategory }) {
  const colors = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A28EFF"];

  // Tính tổng chi phí
  const totalExpense = expenseByCategory.reduce((sum, item) => sum + item.amount, 0);

  // Tránh chia cho 0 nếu không có chi phí
  if (totalExpense === 0) {
    return <div>No expenses available for this period.</div>;
  }

  // Chuyển đổi dữ liệu thành phần trăm
  const chartData = expenseByCategory.map((item, index) => ({
    name: item.category,
    value: item.amount,
    color: colors[index % colors.length], // Gán màu tương ứng
  }));

  return (
    <ChartContainer>
      <ChartHeader>
        <ChartIcon />
        <ChartTitle>Expense by Category</ChartTitle>
      </ChartHeader>
      <ChartContent>
        <LegendContainer>
          {chartData.map((item) => (
            <LegendItem key={item.name}>
              <LegendColor color={item.color} />
              <LegendText>
                {item.name} - {((item.value / totalExpense) * 100).toFixed(1)}%
              </LegendText>
            </LegendItem>
          ))}
        </LegendContainer>
        <PieChartSvg>
          <PieChart width={500} height={400}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(1)}%`}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </PieChartSvg>
      </ChartContent>
    </ChartContainer>
  );
}

// Styled Components
const ChartContainer = styled.section`
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.05);
  background-color: #fff;
`;

const ChartHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 32px;
  margin-bottom: 24px;
`;

const ChartTitle = styled.h2`
  font-size: 24px;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
`;

const ChartContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  @media (max-width: 991px) {
    flex-direction: column;
    align-items: center;
  }
`;

const LegendContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  @media (max-width: 640px) {
    align-items: center;
  }
`;

const LegendItem = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const LegendColor = styled.div`
  width: 24px;
  height: 24px;

  background-color: ${(props) => props.color};
`;

const LegendText = styled.span`
  font-size: 18px;
  color: #555;
`;

const PieChartSvg = styled.div`
  @media (max-width: 991px) {
    transform: scale(0.8);
  }
  @media (max-width: 640px) {
    transform: scale(0.6);
  }
`;

export default ExpenseChart;
