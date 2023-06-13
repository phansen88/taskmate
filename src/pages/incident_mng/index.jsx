/* eslint-disable no-else-return */
const API_ENDPOINT = import.meta.env.VITE_API_END_POINT;
import { useEffect, useState } from 'react';
import { Link, useSearchParams, Outlet } from 'react-router-dom';
import moment from 'moment';
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

      // eslint-disable-next-line react-hooks/rules-of-hooks
      // eslint-disable-next-line no-template-curly-in-string,
      const response = await fetch(
        `${API_ENDPOINT}/api/table/it_incidents${query}`,
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
      <div className="py-6">
        <div className="mx-auto px-4 sm:px-6 md:px-8">
          <h4 className="text-sm uppercase hidden lg:inline-block font-semibold text-gray-900 py-4">
            IT Incidents
          </h4>
        </div>
        <div className="mx-auto px-4 sm:px-6 md:px-8">
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
                          State
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
                          SLA
                        </th>
                        <th
                          scope="col"
                          className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                        >
                          Created
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
                              <Link className="text-orchid-700 hover:text-orchid-950" to={`/it_incidents/${incident.uid}`}>{incident.number}</Link>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm text-gray-500">
                                  {incident.short_description}
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
                                  {incident.state_dv}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm text-gray-500">
                                  <Link className="text-orchid-700 hover:text-orchid-950" to={`/users/${incident.assigned_to}`}>{incident.assigned_to_dv}</Link>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="ml-4">
                                <div className="text-sm text-gray-500">
                                  <Link className="text-orchid-700 hover:text-orchid-950" to={`/assignment_groups/${incident.assignment_group}`}>{incident.assignment_group_dv}</Link>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4 align-middle text-xs whitespace-nowrap p-4">
                            <div className="flex items-center">
                              <div className="relative w-full">
                                <div className="overflow-hidden h-2 text-xs flex rounded bg-red-200">
                                  <div className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-red-500" style={{width: '60%'}}></div>
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
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                            <Link className="text-orchid-700 hover:text-orchid-950" to={`/it_incidents/${incident.uid}`}>Edit</Link>
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
        </div>
      </div>
    </>
  );
}
