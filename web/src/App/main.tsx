import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import { AuthProvider } from '../contexts/Auth.context.tsx'
import { AppointmentsProvider } from '../contexts/Appointments.context.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <AppointmentsProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AppointmentsProvider>
    </AuthProvider>
  </StrictMode>
)
