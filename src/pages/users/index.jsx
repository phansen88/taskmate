import { useEffect, useState } from 'react';
/*
import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
*/

function isActive(val) {
  return !!Number(val);
}
function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Users() {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      // Till the data is fetch using API
      // the Loading page will show.
      setLoading(true);

      // Await make wait until that
      // promise settles and return its reult
      const response = await fetch('http://localhost:5000/home', {
        mode: 'cors',
      });
      const data = await response.json();

      setTimeout(function () {
        // After fetching data stored it in posts state.
        setUsers(data);

        // Closed the loading page
        setLoading(false);
      }, 300);
    };

    // Call the function
    loadData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex flex-col">
        <div className="py-2 align-middle inline-block lg:w-full">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            {loading ? (
              <div className="simple-loader" />
            ) : (
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Name
                    </th>
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
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Role
                    </th>
                    <th scope="col" className="relative px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((user) => (
                    <tr key={user.uid}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <img
                              className="h-10 w-10 rounded-full"
                              alt=""
                              src={user.photo}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {user.full_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">
                          {user.user_name}
                        </div>
                        <div className="text-sm text-gray-500">
                          Department of Justice
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={classNames(
                            isActive(user.active)
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800',
                            'px-2 inline-flex text-xs leading-5 font-semibold rounded-full'
                          )}
                        >
                          {isActive(user.active) ? 'Online' : 'Offline'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {user.role}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <a
                          href="/home"
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Edit
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
