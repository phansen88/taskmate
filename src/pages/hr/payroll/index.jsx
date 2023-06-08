import React from 'react';

const PayrollPage = () => {
  return (
    <div className="py-6">
      <div className="mx-auto px-4 sm:px-6 md:px-8">
        <h4 className="text-sm uppercase hidden lg:inline-block font-semibold text-gray-900 py-4">
          HR - Payroll
        </h4>
      </div>
      <div className="mx-auto px-4 sm:px-6 md:px-8">
        <div className="bg-gray-100 min-h-screen">
          <div className="container mx-auto py-8">
            <h1 className="text-3xl font-bold mb-4">Payroll Management</h1>
            <p className="mb-8">
              Payroll management is a crucial function within the HR department. It involves ensuring that employee salaries are processed correctly and on time. Additionally, it involves addressing employee inquiries and concerns related to their pay and managing employee expenses. Here are some key features of payroll management:
            </p>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">1. Processing Payroll</h2>
              <p>
                The payroll system calculates employee salaries based on various factors such as hours worked, overtime, deductions, and bonuses. It ensures accurate calculations and generates pay stubs for employees. The system may integrate with time tracking tools and attendance records to automate the payroll process.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">2. Employee Pay Inquiries</h2>
              <p>
                Payroll professionals handle employee inquiries regarding their pay, including questions about salary, deductions, tax withholdings, and other related matters. They provide prompt and accurate responses to address employee concerns and ensure transparency in pay-related matters.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">3. Expense Management</h2>
              <p>
                Payroll management also involves reviewing, approving, and reimbursing employee expenses. This includes verifying expense reports, ensuring compliance with company policies, and processing reimbursements in a timely manner. It helps ensure that employees are reimbursed for legitimate business expenses they have incurred.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">4. Reporting and Compliance</h2>
              <p>
                Payroll professionals generate reports related to employee compensation, taxes, and other payroll-related metrics. These reports are used for financial analysis, budgeting, and compliance purposes. They ensure that the organization meets legal and regulatory requirements regarding payroll and tax filings.
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-2">Payroll Cases and Employee Expenses</h2>
              <p>
                Below, you can find a sample payroll table displaying employee salaries and related information. It showcases how the payroll system manages employee pay. Additionally, there is a section to review and manage employee expenses, ensuring timely reimbursements and tracking expenses.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Payroll Table</h3>
              {/* Render your payroll table component here */}
              <div className="bg-white p-4 shadow-lg">Payroll Table Component</div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4">Employee Expenses</h3>
              {/* Render your employee expenses component here */}
              <div className="bg-white p-4 shadow-lg">Employee Expenses Component</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollPage;