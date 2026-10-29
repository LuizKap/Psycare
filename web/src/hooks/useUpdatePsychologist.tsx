import { useState } from "react"
import { psychologist_api } from "../fetch/psychologist.api"
import { toast } from "sonner"
import { ApiValidationError } from "../types"


export function useUpdatePsychologist() {

    const [loading, setLoading] = useState<boolean>(false)

    const updatePsychologist = async ({name, phone}: { name?: string; phone?: string }) => {

        try {
            setLoading(true)

            const { psychologist, message } = await psychologist_api.updateProfile(name, phone)

            toast.success(message)

            return psychologist

        } catch (error) {

            error instanceof ApiValidationError ? error.errors.forEach(error => {
                toast.error(error.message)
            }) : toast.error('Não foi possivel atualizar as informações do psicólogo')

        }
        finally {
            setLoading(false)
        }
    }

    return {
        updatePsychologist,
        loading
    }
}