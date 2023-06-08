import React from 'react';
import { Bar } from 'react-chartjs-2';

const EmployeeExperiencesPage = () => {
  // Sample survey data
  const surveyData = {
    labels: ['Job Satisfaction', 'Work-Life Balance', 'Career Growth', 'Team Collaboration'],
    datasets: [
      {
        label: 'Survey Results',
        data: [75, 80, 65, 70],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: (value) => `${value}%`,
        },
      },
    },
  };

  return (
    <div className="py-6">
      <div className="mx-auto px-4 sm:px-6 md:px-8">
        <h4 className="text-sm uppercase hidden lg:inline-block font-semibold text-gray-900 py-4">
          HR - Employee Experiences
        </h4>
      </div>
      <div className="mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-gray-100 min-h-screen">
          <div className="container mx-auto py-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold mb-4">HR Employee Experiences</h1>
              <p>
                We strive to create a great place to work where employees can show up, make a difference, and win together. We value employee feedback and continuously work on improving their experiences and engagement.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Employee Feedback and Insights</h2>
              <p>
                Gathering employee feedback is crucial in understanding their needs and improving their experiences. We conduct regular surveys to gather feedback and convert it into valuable insights. Here are the results from our recent employee satisfaction survey:
              </p>
              <div className="mt-4">
                <Bar data={surveyData} options={chartOptions} />
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Maximizing Training and Development</h2>
              <p>
                We believe in continuous learning and development to help our employees grow and thrive. Our personalized training and development programs provide employees with access to relevant and engaging content to enhance their skills and knowledge. Together, we can maximize training and development opportunities and empower our employees to reach their full potential.
              </p>
              <div className="mt-4">
                {/* Add your personalized content for learning and development */}
                <h3 className="text-xl font-bold mb-2">Learning Resources</h3>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeExperiencesPage;