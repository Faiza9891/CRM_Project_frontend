import React from 'react'
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const ChartOne = () => {
    const data = [
        { name: 'Category 1', value: 10 },
        { name: 'Category 2', value: 20 },
        { name: 'Category 3', value: 15 },
        { name: 'Category 4', value: 25 },
        { name: 'Category 5', value: 18 },
      ];
      
      const COLORS = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c'];
  return (
    <div>
    <PieChart width={500} height={300}>
    <Pie
      data={data}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
      innerRadius={60}
      outerRadius={80}
      fill="#8884d8"
      label
    >
      {data.map((entry, index) => (
        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
      ))}
    </Pie>
    <Tooltip />
    <Legend />
  </PieChart>
    </div>
  )
}

export default ChartOne