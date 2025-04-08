import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegistrationForm from './components/Register/RegistrationForm';
import LoginPage from './components/Login/LoginPage';
import Layout from "./components/Layout";
import FinanceTracker from './components/Dashboard/FinanceTracker';
import TransactionFinanceTracker from './components/Transaction/TransactionFinanceTracker';
import CategoryFinanceTracker from './components/Category/CategoryFinanceTracker';
import AddFinanceTracker from './components/AddTransaction/AddFinanceTracker';
import UserAccountInfo from './components/User/UserAccountInfo';
import AccountEdit from  './components/EditAccount/AccountEdit';
import SettingsPage from './components/Settings/SettingsPage';
import ReportFinanceTracker from './components/ReportDetail/ReportFinanceTracker';
import FinanceTrackerLandingPage from './components/Home/FinanceTrackerLandingPage';
import CategoryTableFinanceTracker from './components/CategoryTable/CategoryFinanceTracker';
import FinanceDashboard from './components/Report/FinanceDashboard';
function App() {
    return (
        <Router>
             
            <Layout>
                <Routes>
                <Route path="/" element={<FinanceTrackerLandingPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/dashboard" element={<FinanceTracker />} />
                <Route path="/transaction" element={<TransactionFinanceTracker />} />
                <Route path="/category" element={<CategoryFinanceTracker />} />
                <Route path="/add-transaction" element={<AddFinanceTracker />} />
                <Route path="/account-info" element={<UserAccountInfo />} />
                <Route path="/account-info/edit" element={<AccountEdit />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/report" element={<ReportFinanceTracker />} />
                <Route path="/category-stats" element={<CategoryTableFinanceTracker />} />
                <Route path="/report-total" element={<FinanceDashboard />} />
                </Routes>
            </Layout>
        </Router>
    );
}

export default App;
