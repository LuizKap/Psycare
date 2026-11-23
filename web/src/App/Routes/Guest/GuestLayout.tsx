import { Outlet } from "react-router"
import { useState } from "react"

import GuestNavbar from "../../components/Navbar/GuestNavbar"
import GuestSidebar from "./GuestSidebar/GuestSidebar"

export function GuestLayout() {

    const [isOpen, setIsOpen] = useState(false)

    const toggleSidebar = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <>
            <GuestNavbar toggleSidebar={toggleSidebar} />
            <GuestSidebar isOpen={isOpen} />
            <Outlet />
        </>
    )
}