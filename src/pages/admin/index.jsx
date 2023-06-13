/* eslint-disable no-else-return */
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, Outlet } from 'react-router-dom';
import DatabaseSessionsChart from '../../components/DatabaseSessions';
import BarChart from '../../components/BarChart';
import Loader from '../../components/Loader';
import {
  PresentationChartBarIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FaceSmileIcon
} from '@heroicons/react/24/solid';

const API_ENDPOINT = import.meta.env.VITE_API_END_POINT;

export default function AdminPage() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [slowQueriesData, setSlowQueriesData] = useState({ labels: [], datasets: [] });

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
  }, []);

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
          minRotation: 90,
        },
      },
    },
  };

  return (
    <>
      <div className="py-6">
        <div className="mx-auto px-4 sm:px-6 md:px-8">
          <h4 className="text-sm uppercase hidden lg:inline-block font-semibold text-gray-900 py-4">
            Admin
          </h4>
        </div>
        <div className="mx-auto px-4 sm:px-6 md:px-8">
          <div className='flex flex-wrap pt-12 pb-12 md:pt-8 -mx-4'>
          <div className='w-full lg:w-6/12 xl:w-3/12 px-4'>
              <div className='relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg'>
                <div className='flex-auto p-4'>
                  <div className='flex flex-wrap'>
                    <div className='relative w-full pr-4 max-w-full flex-grow flex-1'>
                        <h5 className='text-orchid-600 uppercase font-bold text-xs'>Traffic</h5>
                        <span className='font-semibold text-xl text-orchid-950'></span>
                    </div>
                    <div className='relative w-auto pl-4 flex-initial'> 
                     <div className='text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-orchid-600'>
                      <PresentationChartBarIcon />
                     </div>
                    </div>
                  </div>
                  <p className="text-sm text-orchid-700 mt-4">
                    <span className="text-emerald-500 mr-2">3.48%</span>
                    <span className="whitespace-nowrap">Since last month</span>
                  </p>
                </div>
              </div>
            </div>
            <div className='w-full lg:w-6/12 xl:w-3/12 px-4'>
              <div className='relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg'>
                <div className='flex-auto p-4'>
                  <div className='flex flex-wrap'>
                    <div className='relative w-full pr-4 max-w-full flex-grow flex-1'>
                        <h5 className='text-chestnut-400 uppercase font-bold text-xs'>SLAs met</h5>
                        <span className='font-semibold text-xl text-chestnut-300'></span>
                    </div>
                    <div className='relative w-auto pl-4 flex-initial'> 
                     <div className='text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-chestnut-400'>
                      <ChartPieIcon />
                     </div>
                    </div>
                  </div>
                  <p className="text-sm text-orchid-300 mt-4">
                    <span className="text-emerald-500 mr-2">3.48%</span>
                    <span className="whitespace-nowrap">Since last month</span> 
                  </p>
                </div>
              </div>
            </div>
            <div className='w-full lg:w-6/12 xl:w-3/12 px-4'>
              <div className='relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg'>
                <div className='flex-auto p-4'>
                  <div className='flex flex-wrap'>
                    <div className='relative w-full pr-4 max-w-full flex-grow flex-1'>
                        <h5 className='text-slate-400 uppercase font-bold text-xs'>Interactions</h5>
                        <span className='font-semibold text-xl text-slate-300'></span>
                    </div>
                    <div className='relative w-auto pl-4 flex-initial'> 
                     <div className='text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-slate-600'>
                      <CursorArrowRaysIcon />
                     </div>
                    </div>
                  </div>
                  <p className="text-sm text-orchid-300 mt-4">
                    <span className="text-emerald-500 mr-2">3.48%</span>
                    <span className="whitespace-nowrap">Since last month</span>
                  </p>
                </div>
              </div>
            </div>
            <div className='w-full lg:w-6/12 xl:w-3/12 px-4'>
              <div className='relative flex flex-col min-w-0 break-words bg-white rounded mb-6 xl:mb-0 shadow-lg'>
                <div className='flex-auto p-4'>
                  <div className='flex flex-wrap'>
                    <div className='relative w-full pr-4 max-w-full flex-grow flex-1'>
                        <h5 className='text-lime-600 uppercase font-bold text-xs'>CSAT score</h5>
                        <span className='font-semibold text-xl text-lime-300'></span>
                    </div>
                    <div className='relative w-auto pl-4 flex-initial'> 
                     <div className='text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full bg-lime-600'>
                      <FaceSmileIcon />
                     </div>
                    </div>
                  </div>
                  <p className="text-sm text-orchid-300 mt-4">
                    <span className="text-emerald-500 mr-2">3.48%</span>
                    <span className="whitespace-nowrap">Since last month</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden border-b border-gray-200 sm:rounded-lg">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4"> {/* Updated grid layout for mobile responsiveness */}
                    <div className="rounded-t break-words bg-white shadow-lg p-4">
                      {loading ? (
                        <Loader /> // Display a loading indicator while data is being fetched
                      ) : error ? (
                        <div className="text-red-500">{error}</div> // Display an error message if data fetching fails
                      ) : (
                        <DatabaseSessionsChart />
                      )}
                    </div>
                    <div className="bg-white shadow-lg p-4">
                      {loading ? (
                        <Loader /> // Display a loading indicator while data is being fetched
                      ) : error ? (
                        <div className="text-red-500">{error}</div> // Display an error message if data fetching fails
                      ) : (
                        <BarChart data={slowQueriesData} options={chartOptions} />
                      )}
                    </div>
                    <div className="bg-white shadow-lg p-4">
                      <h2>Coming Soon</h2> {/* Placeholder content for future feature */}
                    </div>
                    <div className="bg-white shadow-lg p-4">
                      <h2>Coming Soon</h2> {/* Placeholder content for future feature */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}