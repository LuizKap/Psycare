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
  user_id: string
}

export type Psychologist = {
  name: string
  id: string
  created_at: string
  updated_at: string
  phone: string
  user_id: string
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

export type AppointmentFilter = {
  patient_name?: string;
  status?: 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
  notes?: boolean;
  created_at?: {

    gte?: Date,
    lt?: Date

  };
  starts_at?: {

    gte?: Date,
    lt?: Date

  };
}

export type AppointmentPagination = {
  page?: number;
  limit?: number;
}

export type AppointmentSorting = {
  sortBy?: 'created_at' | 'starts_at';
  sortOrder?: 'asc' | 'desc'
}

export type PaginationProperties = {
  totalPages: number;
  totalItems: number;
  page: number;
  limit: number;
}

export type FilteredAppointments = {
  appointments: (Appointment & {
    patient: {
      name: string
    }
  })[],
  pagination: PaginationProperties
}

export type AppointmentQueryConfig = {
    filter: AppointmentFilter
    sorting: AppointmentSorting
    pagination: AppointmentPagination
}


// ====================
// Context
// ====================

export type AuthContextType = {
  user: User | null
  loading: boolean
  refreshAuth: () => Promise<void>
  logout: () => Promise<string>
}

export type ScheduledAppointmentsContextType = {
  appointments: Appointment[]
  loading: boolean,
  error: boolean,
  refreshScheduledAppointments: () => void
}

export type PatientContextType = {
  patient: Patient | null
  loading: boolean
  error: boolean,
  refreshPatient: () => Promise<void>
}

export type PsychologistContextType = {
  psychologist: Psychologist | null
  loading: boolean
  error: boolean,
  refreshPsychologist: () => Promise<void>
}

// ====================
// Errors
// ====================

export type ErrorStateProps = {
  message?: string
  onRetry: () => void
}

export type ApiErrorResponse = {
  message: string
  errors: FormError[]
}

export type FormError = {
  path: (string | number)[]
  message: string
}

export class ApiError extends Error {
  constructor(message: string) {
    super(message)
    this.name = "ApiError"
  }
}

export class ApiValidationError extends ApiError {
  errors: FormError[]

  constructor(message: string, errors: FormError[]) {
    super(message)
    this.name = "ApiValidationError"
    this.errors = errors
  }
}