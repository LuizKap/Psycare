import { useCallback, useEffect, useState } from "react";
import { psychologist_api } from "../fetch/psychologist.api";
import { ApiError, type Psychologist } from "../types";
import { toast } from "sonner";




export function usePsychologistPublicProfile() {

    const [psychologist, setPsychologist] = useState<Pick<Psychologist, 'name' | 'phone'> | null>(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<boolean>(false)


    const refreshPsychologist = useCallback(async () => {
        setLoading(true);
        setError(false);

        try {

            const profile = await psychologist_api.getPublicProfile();
            setPsychologist(profile);

        } catch (error) {

            toast.error(error instanceof ApiError ? error.message : "Erro ao carregar dados do psicólogo");

            setError(true);
        } finally {
            setLoading(false);
        }
    }, [])


    useEffect(() => {
        void refreshPsychologist()
    }, [refreshPsychologist])


    return {
        psychologist,
        loading,
        error,
        refreshPsychologist
    }
}