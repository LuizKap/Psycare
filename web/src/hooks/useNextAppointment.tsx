import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import { ApiError, type NextAppointment } from "../types";
import { appointment_api } from "../fetch/appointment.api";

export function useNextAppointment() {
    const [nextAppointment, setNextAppointment] = useState<NextAppointment | null>(null);

    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    const refreshNextAppointment = useCallback(async () => {
        setLoading(true);
        setError(false);

        try {

            const appointment = await appointment_api.getNextAppointment();
            setNextAppointment(appointment);

        } catch (error) {

            setError(true);

            toast.error(
                error instanceof ApiError
                    ? error.message
                    : "Erro ao carregar próximo atendimento"
            );

        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {

        void refreshNextAppointment();

    }, [refreshNextAppointment]);

    return {
        nextAppointment,
        loading,
        error,
        refreshNextAppointment
    };
}