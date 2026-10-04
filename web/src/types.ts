// ====================
// Component Props
// ====================

export interface NavbarProps {
  toggleSidebar: () => void
}

export interface SidebarProps {
  isOpen: boolean
}

export type ProviderProps = {
  children: React.ReactNode
}


// ====================
// User & Profile
// ====================

export type User = {
  id: string
  email: string
  role: 'PATIENT' | 'PSYCHOLOGIST'
}

export type Patient = {
  name: string
  id: string
  phone: string | null
  profile_image_url: string | null
  created_at: string
  updated_at: string

  user: User & {
    role: 'PATIENT'
  }
}

export type Psychologist = {
  name: string
  id: string
  created_at: string
  updated_at: string
  phone: string

  user: User & {
    role: 'PSYCHOLOGIST'
  }
}


// ====================
// Appointments
// ====================

export type Appointment = {
  id: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  starts_at: string;
  ends_at: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  rescheduled_at: string | null;
  patient_id: string;
}

export type NextAppointment = {
  id: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  starts_at: string;
  ends_at: string;
  notes: string | null;
  created_at: string;
  updated_at: string;
  rescheduled_at: string | null;
  patient_id: string;
  patient: {
    name: string
  }
}


// ====================
// Context
// ====================

export type AuthContextType = {
  user: User | null
  loading: boolean
  refreshAuth: () => Promise<void>
}

export type AppointmentsContextType = {
  appointments: Appointment[]
  setAppointments: React.Dispatch<React.SetStateAction<Appointment[]>>
  loading: boolean
}

// ====================
// Errors
// ====================

export type ApiErrorResponse = {
  message: string
  errors: FormError[]
}

export type FormError = {
  path: (string | number)[]
  message: string
}

export class ApiError extends Error {
    errors?: FormError[]

    constructor(message: string, errors?: FormError[]) {
        super(message)
        this.name = "ApiError"
        this.errors = errors
    }
}