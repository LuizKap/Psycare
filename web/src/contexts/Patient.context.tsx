import { createContext, useEffect, useState } from "react"
import { ApiError, type Patient, type PatientContextType, type ProviderProps } from "../types"
import { patient_api } from "../fetch/patient.api"
import { toast } from "sonner"
import { Loading } from "../App/components/Loading/Loading"
import { ErrorState } from "../App/components/Error/Error"


export const PatientContext = createContext<PatientContextType | null>(null)

export function PatientProvider({ children }: ProviderProps) {

    const [patient, setPatient] = useState<Patient | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)


    async function refreshPatient() {
        setLoading(true)
        setError(false)

        try {

            const profile = await patient_api.getProfile()
            setPatient(profile)

        } catch (error) {

            toast.error(error instanceof ApiError ? error.message : 'Erro ao carregar dados do paciente')
            setError(true)

        }
        finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        refreshPatient()
    }, [])

    if (loading) {
        return <Loading />
    }

    if (error) {
        return <ErrorState message = 'Não foi possível carregar seus dados' onRetry={refreshPatient} />
    }

    return (
        <PatientContext.Provider value={{
            patient: patient!,
            loading,
            error,
            refreshPatient
        }}>
            {children}
        </PatientContext.Provider>)
}