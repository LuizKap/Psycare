import { createContext, useEffect, useState } from "react"
import type { AuthContextType, Patient, ProviderProps, Psychologist } from "../types"




export const AuthContext = createContext<AuthContextType | null>(null)


export function AuthProvider({ children }: ProviderProps) {
    const [profile, setProfile] = useState<Patient | Psychologist | null>(null)
    const [loading, setLoading] = useState<boolean>(false)

    async function refreshProfile() {
        setLoading(true)

        try {
            const patientResponse = await fetch("/patient/me")

            if (patientResponse.ok) {
                const patient: Patient = await patientResponse.json()
                setProfile(patient)
                return
            }

            const psychologistResponse = await fetch("/psychologist/me")

            if (psychologistResponse.ok) {
                const psychologist: Psychologist = await psychologistResponse.json()
                setProfile(psychologist)
                return
            }

            setProfile(null)

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        refreshProfile()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                profile,
                setProfile,
                loading,
                refreshProfile
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}