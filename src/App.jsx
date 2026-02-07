import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Layout from './components/Layout'
import HomePage from './pages/HomePage'
import SearchPage from './pages/SearchPage'
import ResultsPage from './pages/ResultsPage'
import BookingPage from './pages/BookingPage'
import IBEPage from './pages/IBEPage'
import LoginPage from './pages/LoginPage'
import SignUpPage from './pages/SignUpPage'
import BookingSuccessPage from './pages/BookingSuccessPage'
// Footer pages
import TermsConditionsPage from './pages/TermsConditionsPage'
import TermsOfUsePage from './pages/TermsOfUsePage'
import PrivacyPolicyPage from './pages/PrivacyPolicyPage'
import AccessibilityStatementPage from './pages/AccessibilityStatementPage'
import MediaRoomPage from './pages/MediaRoomPage'
import SecurityPage from './pages/SecurityPage'
import LegalWhistleblowingPage from './pages/LegalWhistleblowingPage'
import ContactUsPage from './pages/ContactUsPage'
import AboutPage from './pages/AboutPage'
import ProductPage from './pages/ProductPage'
import PeoplePage from './pages/PeoplePage'
import CompanyInfoPage from './pages/CompanyInfoPage'
import JobsPage from './pages/JobsPage'
import GuaranteePage from './pages/GuaranteePage'
import DisruptionProtectionPage from './pages/DisruptionProtectionPage'
import MobileAppPage from './pages/MobileAppPage'
import SiteMapPage from './pages/SiteMapPage'
import FAQPage from './pages/FAQPage'
import CheapFlightsPage from './pages/CheapFlightsPage'
import CountriesPage from './pages/CountriesPage'
import AirportsPage from './pages/AirportsPage'
import AirlinesPage from './pages/AirlinesPage'
import MyBookingsPage from './pages/MyBookingsPage'
import ProfileEditPage from './pages/ProfileEditPage'
import ProfilePage from './pages/ProfilePage'
import HotelsPage from './pages/HotelsPage'
import VisasPage from './pages/VisasPage'
import VisaDetailPage from './pages/VisaDetailPage'
import VisaApplicationPage from './pages/VisaApplicationPage'
import VisaStatusPage from './pages/VisaStatusPage'
import AdminLayout from './components/AdminLayout'
import AdminDashboardPage from './pages/admin/AdminDashboardPage'
import AdminVisaRulesPage from './pages/admin/AdminVisaRulesPage'
import AdminVisaApplicationsPage from './pages/admin/AdminVisaApplicationsPage'
import AdminBookingsPage from './pages/admin/AdminBookingsPage'
import AdminUsersPage from './pages/admin/AdminUsersPage'
import AdminPaymentsPage from './pages/admin/AdminPaymentsPage'
import AdminReportsPage from './pages/admin/AdminReportsPage'
import AdminSettingsPage from './pages/admin/AdminSettingsPage'
import AdminDocumentsPage from './pages/admin/AdminDocumentsPage'
import AdminClientRequestsPage from './pages/admin/AdminClientRequestsPage'

function App() {
  return (
    <BrowserRouter
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/search" element={<Navigate to="/ibe" replace />} />
          <Route path="/results" element={<ResultsPage />} />
          <Route path="/booking/:id" element={<BookingPage />} />
          <Route path="/ibe" element={<IBEPage />} />
          <Route path="/booking-success" element={<BookingSuccessPage />} />
          {/* Footer pages */}
          <Route path="/terms-conditions" element={<TermsConditionsPage />} />
          <Route path="/terms-of-use" element={<TermsOfUsePage />} />
          <Route path="/privacy-policy" element={<PrivacyPolicyPage />} />
          <Route path="/accessibility" element={<AccessibilityStatementPage />} />
          <Route path="/media-room" element={<MediaRoomPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/legal-whistleblowing" element={<LegalWhistleblowingPage />} />
          <Route path="/contact" element={<ContactUsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/product" element={<ProductPage />} />
          <Route path="/people" element={<PeoplePage />} />
          <Route path="/company-info" element={<CompanyInfoPage />} />
          <Route path="/jobs" element={<JobsPage />} />
          <Route path="/guarantee" element={<GuaranteePage />} />
          <Route path="/disruption-protection" element={<DisruptionProtectionPage />} />
          <Route path="/mobile-app" element={<MobileAppPage />} />
          <Route path="/sitemap" element={<SiteMapPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/cheap-flights" element={<CheapFlightsPage />} />
          <Route path="/countries" element={<CountriesPage />} />
          <Route path="/airports" element={<AirportsPage />} />
          <Route path="/airlines" element={<AirlinesPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/edit" element={<ProfileEditPage />} />
          <Route path="/hotels" element={<HotelsPage />} />
          <Route path="/visas" element={<VisasPage />} />
          <Route path="/visas/:country" element={<VisaDetailPage />} />
          <Route path="/visas/:country/apply" element={<VisaApplicationPage />} />
          <Route path="/visa-status" element={<VisaStatusPage />} />
        </Route>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path="settings" element={<AdminSettingsPage />} />
          <Route path="visa-handle" element={<AdminVisaRulesPage />} />
          <Route path="visa-hub" element={<AdminReportsPage />} />
          <Route path="visa-apply-requests" element={<AdminVisaApplicationsPage />} />
          <Route path="documents" element={<AdminDocumentsPage />} />
          <Route path="client-requests" element={<AdminClientRequestsPage />} />
          <Route path="visas" element={<AdminVisaRulesPage />} />
          <Route path="visa-applications" element={<AdminVisaApplicationsPage />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
          <Route path="users" element={<AdminUsersPage />} />
          <Route path="payments" element={<AdminPaymentsPage />} />
          <Route path="reports" element={<AdminReportsPage />} />
        </Route>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

