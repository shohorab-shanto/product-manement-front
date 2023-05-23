import React from 'react';
import { Bar } from 'react-chartjs-2'
const BarChart = ({chartData}) => {
    return <div>
        <Bar data={chartData} height={100} width={200}/> 
        {/* <h1>barchart</h1> */}
    </div>
}

export default BarChart;