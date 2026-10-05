import { createContext, useEffect, useState } from "react";
import { ApiError, type ProviderProps, type Psychologist, type PsychologistContextType } from "../types";
import { psychologist_api } from "../fetch/psychologist.api";
import { toast } from "sonner";
import { Loading } from "../App/components/Loading/Loading";
import { ErrorState } from "../App/components/Error/Error";


export const PsychologistContext = createContext<PsychologistContextType | null>(null)

export function PsychologistProvider({ children }: ProviderProps) {

    const [psychologist, setPsychologist] = useState<Psychologist | null>(null)
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<boolean>(false)

    async function refreshPsychologist() {
        setLoading(true)
        setError(false)

        try {

            const profile = await psychologist_api.getProfile()
            setPsychologist(profile)

        } catch (error) {

            toast.error(error instanceof ApiError ? error.message : 'Erro ao carregar dados do psicólogo')
            setError(true)

        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        refreshPsychologist()
    }, [])

    if (loading) return <Loading />

    if (error) return <ErrorState message='Não foi possível carregar seus dados' onRetry={refreshPsychologist} />

    return (
        <PsychologistContext.Provider value={{
            psychologist: psychologist!,
            loading,
            error,
            refreshPsychologist
        }}>
            {children}
        </PsychologistContext.Provider>
    )
}