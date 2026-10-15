import { useEffect, useState } from "react";
import { appointment_api } from "../fetch/appointment.api";
import type { Dayjs } from "dayjs";
import { toast } from "sonner";
import { ApiError } from "../types";



export function useTimes(selectedDay: Dayjs | null) {

    const [availableTimes, setAvaialableTimes] = useState<string[]>([])

    const [loadingTimes, setLoadingTimes] = useState<boolean>(false)
    const [errorTimes, setErrorTimes] = useState<boolean>(false)

    // O cleanup invalida o efeito anterior quando a data selecionada muda.
    // A requisição antiga continua em andamento, mas, ao terminar, verifica
    // isCurrent antes de atualizar o estado, evitando sobrescrever os horários
    // da data atual com uma resposta desatualizada.

    useEffect(() => {
        let isCurrent = true

        async function loadTimes() {
            setAvaialableTimes([])

            if (!selectedDay) {
                setLoadingTimes(false)
                setErrorTimes(false)
                return
            }

            setLoadingTimes(true)
            setErrorTimes(false)

            try {
                const availableTimes = await appointment_api.getAvailability(selectedDay)

                if (isCurrent) {
                    setAvaialableTimes(availableTimes)
                }
            }
            catch (error) {
                if (isCurrent) {
                    setErrorTimes(true)
                    setAvaialableTimes([])

                    toast.error(
                        error instanceof ApiError ? error.message : "Erro ao carregar horários disponíveis"
                    )
                }
            } finally {
                if (isCurrent) {
                    setLoadingTimes(false)
                }
            }
        }

        loadTimes()

        return () => {
            isCurrent = false
        }
    }, [selectedDay])



    return {
        availableTimes,
        loadingTimes,
        errorTimes
    }

}