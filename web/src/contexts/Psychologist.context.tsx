import { createContext, useEffect, useState, useCallback } from "react";

import {
    ApiError,
    type ProviderProps,
    type Psychologist,
    type PsychologistContextType
} from "../types";

import { psychologist_api } from "../fetch/psychologist.api";
import { toast } from "sonner";


export const PsychologistContext = createContext<PsychologistContextType | null>(null);

export function PsychologistProvider({ children }: ProviderProps) {

    const [psychologist, setPsychologist] = useState<Psychologist | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const refreshPsychologist = useCallback(async () => {
        setLoading(true);
        setError(false);

        try {

            const profile = await psychologist_api.getProfile();
            setPsychologist(profile);

        } catch (error) {

            toast.error(error instanceof ApiError ? error.message : "Erro ao carregar dados do psicólogo");

            setError(true);
        } finally {
            setLoading(false);
        }
    }, [])

    useEffect(() => {
        void refreshPsychologist();
    }, [refreshPsychologist]);

    return (
        <PsychologistContext.Provider
            value={{
                psychologist,
                loading,
                error,
                refreshPsychologist
            }}
        >
            {children}
        </PsychologistContext.Provider>
    );
}