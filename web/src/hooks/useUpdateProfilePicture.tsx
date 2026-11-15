import { useState } from "react";
import { patient_api } from "../fetch/patient.api";
import { toast } from "sonner";
import { ApiError } from "../types";



export function useUpdateProfilePicture() {

    const [loading, setLoading] = useState<boolean>(false)

    const updateProfilePicture = async (file: File) => {

        try {
            setLoading(true)

            const { patient, message } = await patient_api.updateProfilePicture(file)

            toast.success(message)

            return patient.profile_image_url

        } catch (error) {

            error instanceof ApiError ? toast.error(error.message)
                :
                toast.error('Não foi possivel atualizar as informações do paciente')

        }
        finally {
            setLoading(false)
        }
    }

    return {
        updateProfilePicture,
        loading
    }

}