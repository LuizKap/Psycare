import { Navigate } from "react-router"
import { useAuth } from "../../../hooks/useAuth"

import { PatientLayout } from "../Patient/PatientLayout/PatientLayout"
import { GuestLayout } from "../Guest/GuestLayout"

export function PatientOrGuestLayout() {

    const { user } = useAuth()

    if (user?.role === "PSYCHOLOGIST") {
        return <Navigate to="/unauthorized" replace />
    }

    return user?.role === "PATIENT"
        ? <PatientLayout />
        : <GuestLayout />
}