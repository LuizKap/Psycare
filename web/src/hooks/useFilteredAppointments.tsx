import { useCallback, useState } from "react";
import { ApiValidationError, type AppointmentFilter, type AppointmentPagination, type AppointmentSorting, type FilteredAppointments } from "../types";
import { appointment_api } from "../fetch/appointment.api";
import { toast } from "sonner";



export function useFilteredAppointments() {

    const [filteredAppointments, setFilteredAppointments] = useState<FilteredAppointments>(
        {
            appointments: [],
            pagination: {
                page: 1,
                limit: 10,
                totalItems: 0,
                totalPages: 0
            }
        }
    )

    const [loading, setLoading] = useState<boolean>(true)



    const handleFilterAppointments = useCallback(
        async (
            filter: AppointmentFilter,
            sorting: AppointmentSorting,
            pagination: AppointmentPagination
        ) => {
            setLoading(true)

            try {
                const appointments =
                    await appointment_api.getFilteredAppointments(
                        filter,
                        sorting,
                        pagination
                    )

                setFilteredAppointments(appointments)
            } catch (error) {
                error instanceof ApiValidationError ? error.errors.forEach((error) => {
                    toast.error(error.message)
                }) : toast.error('Erro ao carregar consultas filtradas')
            } finally {
                setLoading(false)
            }
        }, [])



    return {
        loading,
        filteredAppointments,
        handleFilterAppointments
    }



}