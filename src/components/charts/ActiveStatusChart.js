import React from 'react'
import { PieChart, Pie, Tooltip, Legend, Cell } from 'recharts';

const ActiveStatusChart = ({activeCustomers,inactiveCustomers}) => {
    const data = [
        { name: 'Active', value: activeCustomers },
        { name: 'Inactive', value: inactiveCustomers },
       
      ];
      
      const COLORS = [ '#82ca9d', '#a4de6c'];
  return (
    <div>
    <PieChart width={350} height={300}>
    <Pie
      data={data}
      dataKey="value"
      nameKey="name"
      cx="50%"
      cy="50%"
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

export default ActiveStatusChart