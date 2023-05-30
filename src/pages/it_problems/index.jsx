/* eslint-disable no-else-return */
const API_ENDPOINT = import.meta.env.VITE_API_END_POINT;
import { useEffect, useState } from 'react';
import { useSearchParams, Outlet } from 'react-router-dom';
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

export default function ITProblems() {
  const [problems, setProblems] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  let query = '';
  if (searchParams.get('query') !== null) {
    // eslint-disable-next-line prefer-template
    query = '?' + searchParams.get('query');
  }
  console.log('Before DB Query' + query);
  useEffect(() => {
    const getProblems = async () => {
      // Await make wait until that
      // promise settles and return its reult

      // eslint-disable-next-line react-hooks/rules-of-hooks
      // eslint-disable-next-line no-template-curly-in-string,
      const response = await fetch(
        `${API_ENDPOINT}/api/it_problems${query}`,
        {
          mode: 'cors',
        }
      );
      const data = await response.json();

      console.log(data);
      // After fetching data stored it in posts state.
      setProblems(data);
    };

    // Call the function
    getProblems();
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
                      Problem statement
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
                      Workaround
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
                      Assigned to
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
                  {problems.map((problem) => (
                    <tr key={problem.uid}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <div className="text-sm font-medium text-gray-900">
                          {problem.number}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {problem.short_description}
                            </div>
                            <div className="text-sm text-gray-500">
                              {problem.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm text-gray-500">
                              {problem.description}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm text-gray-500">
                              {problem.assigned_to}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="ml-4">
                            <div className="text-sm text-gray-500">
                              {problem.assignment_group}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {problem.sensitiveData ? 'Sensitive' : ''}
                        </div>
                        <div className="text-sm text-gray-500">
                          
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {problem.created !== undefined
                            ? `${moment(problem.created)
                                .utc()
                                .format('DD-MM-YYYY HH:mm:SS')} UTC`
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
