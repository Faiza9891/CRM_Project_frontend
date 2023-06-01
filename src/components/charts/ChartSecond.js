import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ChartSecond = () => {
    const data = [
        { name: 'Category 1', value: 10 },
        { name: 'Category 2', value: 20 },
        { name: 'Category 3', value: 15 },
        { name: 'Category 4', value: 25 },
        { name: 'Category 5', value: 18 },
      ];
      
  return (
    <div>
    <BarChart width={500} height={300} data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="name" />
    <YAxis />
    <Tooltip />
    <Legend />
    <Bar dataKey="value" fill="#8884d8" />
  </BarChart>
    </div>
  )
}

export default ChartSecond