import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Landing from './pages/Landing'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Proposals from './pages/Proposals'
import NewProposal from './pages/NewProposal'
import Finance from './pages/Finance'
import Settings from './pages/Settings'
import Outreach from './pages/Outreach'

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={
          <ProtectedRoute><Dashboard /></ProtectedRoute>
        } />
        <Route path="/clients" element={
          <ProtectedRoute><Clients /></ProtectedRoute>
        } />
        <Route path="/proposals" element={
          <ProtectedRoute><Proposals /></ProtectedRoute>
        } />
        <Route path="/proposals/new" element={
          <ProtectedRoute><NewProposal /></ProtectedRoute>
        } />
        <Route path="/outreach" element={
          <ProtectedRoute><Outreach /></ProtectedRoute>
        } />
        <Route path="/finance" element={
          <ProtectedRoute><Finance /></ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute><Settings /></ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App