import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import {Card} from "react-bootstrap";


ChartJS.register(ArcElement, Tooltip, Legend);



function DoughnutChart({amount}){
    
    const data = {
        labels: ['Local', 'Navigation', 'Training'],
        datasets: [
          {
            label: 'Flights per category',
            data: amount,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)'
            ],
            borderWidth: 1,
          },
        ],
      }

  return (
            <Card className="categoryChart">
              <Card.Header>
                <Card.Title as="h4">Category division</Card.Title>
              </Card.Header>
              <Card.Body>
                <div
                  className="ct-chart ct-perfect-fourth"
                  id="chartPreferences"
                >
                    <Doughnut data={data} options={{
          responsive: true,
          maintainAspectRatio: true,
        }}/>
                </div>
              </Card.Body>
            </Card>
  );
}
export default DoughnutChart;