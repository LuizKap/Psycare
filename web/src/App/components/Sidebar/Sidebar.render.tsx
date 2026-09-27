import { useAuth } from "../../../hooks/useAuth"
import type { SidebarProps } from "../../../types"
import GuestSidebar from "./GuestSidebar/GuestSidebar"
import PatientSidebar from "./PatientSidebar/PatientSidebar"


export function Sidebar({ isOpen }: SidebarProps) {

    const auth = useAuth()

    if (!auth.profile) {
        return <GuestSidebar isOpen={isOpen} />
    }

    if (auth.profile.user.role === 'PATIENT') {
        return <PatientSidebar isOpen={isOpen} />
    }

}

