import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Clients from './pages/Clients'
import Proposals from './pages/Proposals'
import Finance from './pages/Finance'
import Settings from './pages/Settings'

function App() {
  return (
    <AuthProvider>
      <Routes>
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
        <Route path="/finance" element={
          <ProtectedRoute><Finance /></ProtectedRoute>
        } />
        <Route path="/settings" element={
          <ProtectedRoute><Settings /></ProtectedRoute>
        } />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </AuthProvider>
  )
}

export default App