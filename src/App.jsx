import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landingpage from './pages/landingpage';
import EmployeeCatalog from './pages/employee_catalog';
import CaseFiles from './pages/casefiles';
import IncidentManagement from './pages/incident_mng';
import Users from './pages/users';
import ITProblems from './pages/it_problems';
import AssignmentGroups from './pages/assignment_groups';
import UserForm from './pages/users/form';
import AdminPage from './pages/admin';

import HRHomePage from './pages/hr';
import BenefitsPage from './pages/hr/benefits';
import EmployeeExperiencesPage from './pages/hr/employee_experience';
import PayrollPage from './pages/hr/payroll';
import TalentManagementPage from './pages/hr/talent_management';
import WorkforceManagementPage from './pages/hr/workforce';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Landingpage />} />
          <Route path="/users/*" element={<Users />} />
          <Route path="/users/:uid/*" element={<UserForm />} />
          <Route path="/table/:incident/*" element={<IncidentManagement />} />
          <Route path="/employee_catalog" element={<EmployeeCatalog />} />
          <Route path="/assignment_groups/*" element={<AssignmentGroups />} />
          <Route exact path="/casefiles"> 
            <Route exact index element={<CaseFiles />} />
          </Route>
          <Route path="/it_problems/*" element={<ITProblems />} />
          <Route path="/admin/dictionary/*" element={<AdminPage />} />
          <Route exact path="/hr">
            <Route index element={<HRHomePage />} />
            <Route path="benefits" element={<BenefitsPage />} />
            <Route path="employee_experiences" element={<EmployeeExperiencesPage />} />
            <Route path="payroll" element={<PayrollPage />} />
            <Route path="talent_management" element={<TalentManagementPage />} />
            <Route path="workforce" element={<WorkforceManagementPage />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}