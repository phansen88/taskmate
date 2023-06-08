import React from 'react';

const TalentManagementPage = () => {


  // Placeholder/demo data for the HR cases
  const hrCases = [
    {
      ticketNumber: 'HR001',
      shortDescription: 'Payroll inquiry',
      subjectPerson: 'John Doe',
      created: '2023-06-01',
      lastUpdated: '2023-06-03',
    },
    {
      ticketNumber: 'HR002',
      shortDescription: 'Training request',
      subjectPerson: 'Jane Smith',
      created: '2023-06-02',
      lastUpdated: '2023-06-04',
    },
    // Add more demo data as needed
  ];

  return (
    <div className="py-6">
      <div className="mx-auto px-4 sm:px-6 md:px-8">
        <h4 className="text-sm uppercase hidden lg:inline-block font-semibold text-gray-900 py-4">
          HR - Talent Management
        </h4>
      </div>
      <div className="mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-gray-100 min-h-screen">
          <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Talent Management</h1>
            <p className="mb-8">
              Talent management is a comprehensive approach to attracting, developing, and retaining top talent within an organization. It encompasses various aspects to optimize the workforce and ensure long-term success. Here are some key areas of talent management:
            </p>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">1. Recruiting and Hiring</h2>
              <p>
                Talent management includes streamlining the recruiting and hiring process to identify and select the best candidates for open positions. It involves job posting, applicant tracking, resume screening, interviewing, and ultimately making offers to suitable candidates. The goal is to efficiently fill open positions with qualified individuals who align with the organization's goals and culture.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">2. Onboarding</h2>
              <p>
                Effective onboarding is crucial for connecting with new hires and making a lasting first impression. It involves providing essential information, introducing company policies and culture, and facilitating a smooth transition into the organization. Onboarding programs aim to help new employees feel welcomed, supported, and prepared to contribute to their roles from day one.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">3. Talent Development</h2>
              <p>
                Talent development focuses on increasing employee engagement and inspiring continuous growth and development. It includes various initiatives such as training programs, mentorship opportunities, career development plans, and performance management processes. Talent development aims to enhance skills, knowledge, and capabilities of employees, enabling them to reach their full potential and contribute effectively to organizational success.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">4. Compensation Planning</h2>
              <p>
                Compensation planning involves strategizing, managing, and executing pay increases and rewards for employees. It includes evaluating job roles, market benchmarks, performance metrics, and other factors to ensure fair and competitive compensation. Compensation planning aims to attract, motivate, and retain top talent while aligning with the organization's financial goals and industry standards.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Talent Management Cases</h2>
              <p>
                Below, you can find a listing of talent management cases that can be managed using a SaaS solution. These cases represent various scenarios and tasks related to talent management, allowing HR professionals to streamline processes and optimize talent management practices.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Talent Management Case List</h3>
              {/* Render your talent management case list component here */}
              <div className="bg-white p-4 rounded shadow">Talent Management Case List Component</div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Talent Management Cases</h2>
              <p>
                Below, you can find a listing of talent management cases that can be managed using a SaaS solution. These cases represent various scenarios and tasks related to talent management, allowing HR professionals to streamline processes and optimize talent management practices.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Talent Management Case List</h3>
              <div className="bg-white overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ticket Number
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Short Description
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Subject Person
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Created
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Last Updated
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {hrCases.map((caseItem) => (
                      <tr key={caseItem.ticketNumber}>
                        <td className="px-6 py-4 whitespace-nowrap">{caseItem.ticketNumber}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{caseItem.shortDescription}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{caseItem.subjectPerson}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{caseItem.created}</td>
                        <td className="px-6 py-4 whitespace-nowrap">{caseItem.lastUpdated}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentManagementPage;
