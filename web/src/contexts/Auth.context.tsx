import { createContext, useEffect, useState } from "react"

export const AuthContext = createContext<AuthContextType | null>(null)

export type User = {
    id: string,
    email: string,
    role: 'PATIENT'
}

type Patient = {
    name: string;
    id: string;
    phone: string | null;
    profile_image_url: string | null;
    created_at: Date;
    updated_at: Date;
    user: User
}

type AuthContextType = {
    user: User | null
    setUser: React.Dispatch<React.SetStateAction<User | null>>
}

export function AuthProvider({ children }: { children: React.ReactNode }) {

    const [user, setUser] = useState<User | null>(null)

    useEffect(() => {
        async function getUser() {
            const response = await fetch("/patient/me")

            if (!response.ok) {
                return
            }

            const patient = await response.json()

            setUser(patient.user)
        }

        getUser()

    }, [])

    return (

        <AuthContext.Provider value={{ user, setUser }}>
            {children}
        </AuthContext.Provider>

    )
}