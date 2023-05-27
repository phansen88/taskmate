/* eslint-disable no-else-return */
import { useEffect, useState } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
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

export default function IncidentManagement() {
  const [incidents, setIncidents] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  let query = '';
  if (searchParams.get('query') !== null) {
    // eslint-disable-next-line prefer-template
    query = '?' + searchParams.get('query');
  }
  console.log('Before DB Query' + query);
  useEffect(() => {
    const getCaseFiles = async () => {
      // Await make wait until that
      // promise settles and return its reult
      console.log(`http://localhost:5000/table/incident${query}`);

      // eslint-disable-next-line react-hooks/rules-of-hooks
      // eslint-disable-next-line no-template-curly-in-string,
      const response = await fetch(
        `http://taskmate.dk/api/table/incident${query}`,
        {
          mode: 'cors',
        }
      );
      const data = await response.json();

      console.log(data);
      // After fetching data stored it in posts state.
      setIncidents(data);
    };

    // Call the function
    getCaseFiles();
  }, [query]);
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
                      Number
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Short description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Assigned to
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Assignment group
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Created
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
                  {incidents.map((incident) => (
                    <tr key={incident.uid}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="text-sm font-medium text-gray-900">
                          {incident.number}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {incident.short_description}
                            </div>
                            <div className="text-sm text-gray-500">
                              {incident.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm text-gray-500">
                              {incident.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm text-gray-500">
                              {incident.assigned_to}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm text-gray-500">
                              {incident.assignment_group}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {incident.sensitiveData ? 'Sensitive' : ''}
                        </div>
                        <div className="text-sm text-gray-500">
                          {incident.created !== undefined
                            ? `${moment(incident.created)
                                .utc()
                                .format('DD-MM-YYYY HH:mm:SS')} UTC`
                            : ''}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {incident.completed !== undefined
                          ? moment.unix(incident.completed).toISOString()
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
