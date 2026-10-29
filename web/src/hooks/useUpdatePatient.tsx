import { useState } from "react";
import { toast } from "sonner";
import { } from "../fetch/psychologist.api";
import { patient_api } from "../fetch/patient.api";
import { ApiValidationError } from "../types";



export function useUpdatePatient() {

    const [loading, setLoading] = useState<boolean>(false)

    const updatePatient = async ({ name, phone }: { name?: string; phone?: string | null }) => {

        try {
            setLoading(true)

            const { patient, message } = await patient_api.updatePatient(name, phone)

            toast.success(message)

            return patient

        } catch (error) {

            error instanceof ApiValidationError ? error.errors.forEach(error => {
                toast.error(error.message)
            }) : toast.error('Não foi possivel atualizar as informações do paciente')

        }
        finally {
            setLoading(false)
        }
    }

    return {
        updatePatient,
        loading
    }
}