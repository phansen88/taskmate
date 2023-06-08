import React from 'react';
import { Link } from 'react-router-dom';

const HRHomePage = () => {
  const pages = [
    {
      title: 'Payroll',
      description: 'Manage pay processing, employee expenses, and pay-related inquiries.',
      image: 'payroll.jpg',
      link: '/payroll',
    },
    {
      title: 'Talent Management',
      description: 'Streamline recruiting, onboarding, talent development, and compensation planning.',
      image: 'talent-management.jpg',
      link: '/talent-management',
    },
    {
      title: 'Workforce Management',
      description: 'Reduce labor spend, manage overtime, and maximize productivity across your workforce.',
      image: 'workforce-management.jpg',
      link: '/workforce-management',
    },
    {
      title: 'Employee Experiences',
      description: 'Gather employee feedback, provide personalized learning content, and enhance engagement.',
      image: 'employee-experiences.jpg',
      link: '/employee-experiences',
    },
    {
      title: 'Benefits Administration',
      description: 'Transform benefits enrollment, simplify administration, and maximize benefit programs.',
      image: 'benefits-administration.jpg',
      link: '/benefits-administration',
    },
  ];

  return (
    <div className="py-6">
      <div className="mx-auto px-4 sm:px-6 md:px-8">
        <h4 className="text-sm uppercase hidden lg:inline-block font-semibold text-gray-900 py-4">
          Human Resources
        </h4>
      </div>
      <div className="mx-auto px-4 sm:px-6 md:px-8">
        <div className="container mx-auto py-8">
          <h1 className="text-3xl font-bold mb-8">HR Solutions</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {pages.map((page, index) => (
              <Link to={page.link} key={index} className="bg-white rounded shadow-lg overflow-hidden">
                <img src={page.image} alt={page.title} className="w-full h-40 object-cover" />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{page.title}</h2>
                  <p className="text-gray-600">{page.description}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HRHomePage;