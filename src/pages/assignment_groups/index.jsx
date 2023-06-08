/* eslint-disable no-else-return */
const API_ENDPOINT = import.meta.env.VITE_API_END_POINT;
import { useEffect, useState } from 'react';
import { Link, useSearchParams, Outlet } from 'react-router-dom';


function classNames(...classes) {
    return classes.filter(Boolean).join(' ');
}

export default function AssignmentGroups() {
    const [assignment_groups, setAssignmentGroups] = useState([]);
    const [searchParams, setSearchParams] = useSearchParams();
    const [selectAll, setSelectAll] = useState(false);
    const [selectedItems, setSelectedItems] = useState([]);

    const handleSelectAll = () => {
        setSelectAll(!selectAll);
        setSelectedItems(selectAll ? [] : [...assignment_groups.map((group) => group.uid)]);
    };

    const handleCheckboxChange = (event, uid) => {
        const isChecked = event.target.checked;
        if (isChecked) {
            setSelectedItems([...selectedItems, uid]);
        } else {
            setSelectedItems(selectedItems.filter((item) => item !== uid));
        }
    };

    let query = '';
    if (searchParams.get('query') !== null) {
        // eslint-disable-next-line prefer-template
        query = '?' + searchParams.get('query');
    }
    console.log('Before DB Query' + query);
    useEffect(() => {
        const getAssignmentGroups = async () => {
            // Await make wait until that
            // promise settles and return its reult

            // eslint-disable-next-line react-hooks/rules-of-hooks
            // eslint-disable-next-line no-template-curly-in-string,
            const response = await fetch(
                `${API_ENDPOINT}/api/assignment_groups${query}`,
                {
                    mode: 'cors',
                }
            );
            const data = await response.json();

            console.log(data);
            // After fetching data stored it in posts state.
            setAssignmentGroups(data);
        };

        // Call the function
        getAssignmentGroups();
    }, [query]);
    return (
        <>
            <div className="py-6">
                <div className="mx-auto px-4 sm:px-6 md:px-8">
                    <h4 className="text-sm uppercase hidden lg:inline-block font-semibold text-gray-900 py-4">
                        Assignment groups
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
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    <span className="sr-only">Select</span>
                                                    <input
                                                        type="checkbox"
                                                        className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4"
                                                        checked={selectedItems.length === assignment_groups.length}
                                                        onChange={handleSelectAll}
                                                    />
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Name
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Manager
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Email
                                                </th>
                                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Description
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {assignment_groups.map((assignment_group) => (
                                                <tr key={assignment_group.uid}>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                                        <input type="checkbox"
                                                            checked={selectedItems.includes(assignment_group.uid)}
                                                            onChange={(event) => handleCheckboxChange(event, assignment_group.uid)}
                                                            className="rounded text-indigo-600 focus:ring-indigo-500 h-4 w-4" />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{assignment_group.name}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900"><Link className="text-indigo-600 hover:text-indigo-900" to={`/users/${assignment_group.manager}`}>{assignment_group.manager_dv}</Link></div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{assignment_group.email}</div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div className="text-sm text-gray-900">{assignment_group.description}</div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div >
                    <Outlet />
                </div>
            </div>
        </>
    );
}