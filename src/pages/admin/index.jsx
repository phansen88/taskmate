/* eslint-disable no-else-return */
import React, { useState, useEffect } from 'react';
import DatabaseSessionsChart from '../../components/DatabaseSessions';
//import BarChart from '../../components/BarChart';
const API_ENDPOINT = import.meta.env.VITE_API_END_POINT;


export default function AdminPage() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [slowQueriesData, setSlowQueriesData] = useState({labels: [], datasets: []});

    const fetchSessionsData = async () => {
        
    
        try {
          const response = await fetch(`${API_ENDPOINT}/api/slowqueries`);
          if (!response.ok) {
            throw new Error('Error fetching sessions data');
          }
    
          const data = await response.json();
          
          
          const updatedData = {
            labels: [],
            datasets: [
              {
                label: 'Slow queries',
                data: [],
                backgroundColor: 'rgba(177,99,163,0.6)',
                borderColor: 'rgba(177,99,163,1)',
                borderWidth: 1,
              },
            ],
          };
        
          data.forEach((item) => {
            updatedData.labels.push(item.query);
            updatedData.datasets[0].data.push(item.total_time);
          });
        
          setSlowQueriesData(updatedData);
          setLoading(false);
        } catch (error) {
          setError(error.message);
          setLoading(false);
        }
      };

      useEffect(() => {
        fetchSessionsData();
      }, []); // The empty dependency array ensures that the effect is only triggered once, when the component mounts


      const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            ticks: {
                maxRotation: 90,
                minRotation: 90
            }
        }
        },
      };

    return (
        <>
            <div className="flex flex-col">
                <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                        <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">

                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white shadow-lg p-4">
                                    <DatabaseSessionsChart />
                                </div>
                                <div className="bg-white shadow-lg p-4">
                                <h2>soon.jpg</h2>
                                </div>
                                <div className="bg-white shadow-lg p-4">
                                    <h2>soon.jpg</h2>
                                </div>
                                <div className="bg-white shadow-lg p-4">
                                    <h2>soon.jpg</h2>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
