import { useState } from "react";
import { patient_api } from "../fetch/patient.api";
import { toast } from "sonner";
import { ApiError } from "../types";




export function useRemoveProfilePicture() {

    const [loading, setLoading] = useState<boolean>(false)

    const removeProfilePicture = async () => {

        try {
            setLoading(true)

            const {/*patient,*/ message } = await patient_api.removeProfilePicture()

            toast.success(message)

            return

        } catch (error) {

            error instanceof ApiError ? toast.error(error.message)
                :
                toast.error('Não foi possivel remover a foto de perfil')
        }
        finally {
            setLoading(false)
        }
    }

     return {
            loading,
            removeProfilePicture
        }
}