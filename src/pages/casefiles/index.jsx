/* eslint-disable no-else-return */
import {
    Outlet,
  } from 'react-router-dom';
  import { useEffect, useState } from 'react';
  import * as moment from 'moment';
  /* This example requires Tailwind CSS v2.0+ */
  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
  }
  function getStatus(value) {
    if (value === 0) {
      return {
        label: 'new',
        classes: 'bg-green-100 text-green-800',
      };
    } else if (value === 1) {
      return {
        label: 'pending',
        classes: 'bg-gray-100 text-green-800',
      };
    } else if (value === 2) {
      return {
        label: 'rejected',
        classes: 'bg-yellow-100 text-yellow-800',
      };
    } else if (value === 3) {
      return {
        label: 'deleted',
        classes: 'bg-red-100 text-red-600',
      };
    } else if (value === 4) {
      return {
        label: 'signed',
        classes: 'bg-green-100 text-green-600',
      };
    } else if (value === 5) {
      return {
        label: 'completed',
        classes: 'bg-green-100 text-green-800',
      };
    } else if (value === 6) {
      return {
        label: 'failed',
        classes: 'bg-red-100 text-red-600',
      };
    }
    return '';
  }
  
  export default function CaseFiles() {
    const [caseFiles, setCaseFiles] = useState([]);
  
    useEffect(() => {
      const getCaseFiles = async () => {
        // Await make wait until that
        // promise settles and return its reult
        const response = await fetch('http://localhost:5000/casefiles', {
          mode: 'cors',
        });
        const data = await response.json();
  
        console.log(data);
        // After fetching data stored it in posts state.
        setCaseFiles(data);
      };
  
      // Call the function
      getCaseFiles();
    }, []);
    return (
      <>
        <div className="flex flex-col">
          <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
              <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Title
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Created / Sensitive
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Status
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Completed
                      </th>
                      <th scope="col" className="relative px-6 py-3">
                        <span className="sr-only">Edit</span>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {caseFiles.map((caseFile) => (
                      <tr key={caseFile.id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <img
                                className="h-10 w-10 rounded-full"
                                src="https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60"
                                alt=""
                              />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {caseFile.title}
                              </div>
                              <div className="text-sm text-gray-500">
                                {caseFile.id}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            ABC {caseFile.sensitiveData ? 'Sensitive' : ''}
                          </div>
                          <div className="text-sm text-gray-500">
                            {caseFile.created !== undefined
                              ? moment.unix(caseFile.created).toISOString()
                              : ''}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={classNames(
                              getStatus(caseFile.status).classes,
                              'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
                            )}
                          >
                            {getStatus(caseFile.status).label}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {caseFile.completed !== undefined
                            ? moment.unix(caseFile.completed).toISOString()
                            : ''}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <a
                            href="/"
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </>
    );
  }
  