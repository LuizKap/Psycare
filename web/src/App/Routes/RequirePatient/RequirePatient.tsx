import { Navigate, Outlet } from "react-router"
import { useAuth } from "../../../hooks/useAuth"

export function RequirePatient() {

    const { user } = useAuth()

    if (!user) {
        return <Navigate to="/login" replace />
    }

    if (user.role !== "PATIENT") {
        return <Navigate to="/unauthorized" replace />
    }

    return <Outlet />
}