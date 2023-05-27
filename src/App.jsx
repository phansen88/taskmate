import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Landingpage from './pages/landingpage';
import EmployeeCatalog from './pages/employee_catalog';
import CaseFiles from './pages/casefiles';
import IncidentManagement from './pages/incident_mng';
import Users from './pages/users';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Landingpage />} />
          <Route path="users" element={<Users />} />
          <Route path="/table/:incident/*" element={<IncidentManagement />} />
          <Route path="employee_catalog" element={<EmployeeCatalog />} />
          <Route exact path="casefiles">
            <Route exact index element={<CaseFiles />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}