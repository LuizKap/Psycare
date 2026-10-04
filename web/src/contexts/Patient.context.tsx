import { createContext, useEffect, useState } from "react"
import { ApiError, type Patient, type PatientContextType, type ProviderProps } from "../types"
import { patient_api } from "../fetch/patient.api"
import { toast } from "sonner"


export const PatientContext = createContext<PatientContextType | null>(null)

export function PatientProvider({ children }: ProviderProps) {

    const [patient, setPatient] = useState<Patient | null>(null)
    const [loading, setLoading] = useState<boolean>(true)


    async function refreshPatient() {

        try {

            const profile = await patient_api.getProfile()
            setPatient(profile)

        } catch (error) {

            toast.error(error instanceof ApiError ? error.message : 'Erro ao carregar dados do paciente')

        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        refreshPatient()
    }, [])


    return (
        <PatientContext.Provider value={{
            patient,
            loading,
            refreshPatient
        }}>
            {children}
        </PatientContext.Provider>)
}