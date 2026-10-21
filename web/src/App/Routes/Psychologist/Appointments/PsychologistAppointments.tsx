
import { useEffect, useState } from "react"
import { useFilteredAppointments } from "../../../../hooks/useFilteredAppointments"
import styles from "./PsychologistAppointments.module.css"
import type { AppointmentFilter, AppointmentPagination, AppointmentQueryConfig, AppointmentSorting } from "../../../../types"
import dayjs from '../../../../utils/dayjs'
import Skeleton from "react-loading-skeleton"

export function PsychologistAppointments() {

    const DEFAULT_APPOINTMENT_QUERY: AppointmentQueryConfig = {
        filter: {},
        sorting: {
            sortBy: 'starts_at',
            sortOrder: 'desc'
        },
        pagination: {
            limit: 10
        }
    }

    const [filter, setFilter] = useState<AppointmentFilter>({})
    const [sorting, setSorting] = useState<AppointmentSorting>(DEFAULT_APPOINTMENT_QUERY.sorting)
    const [pagination, setPagination] = useState<AppointmentPagination>({})

    const [filtersVersion, setFiltersVersion] = useState(0)

    const {
        filteredAppointments,
        handleFilterAppointments,
        loading } = useFilteredAppointments()


    useEffect(() => {
        void handleFilterAppointments({}, DEFAULT_APPOINTMENT_QUERY.sorting, DEFAULT_APPOINTMENT_QUERY.pagination)
    }, [handleFilterAppointments])

    return (
        <main className={styles["appointments-page"]}>
            <header className={styles["page-header"]}>
                <div>
                    <h1>Consultas</h1>
                    <p>Gerencie os agendamentos dos seus pacientes.</p>
                </div>

                <div className={styles["appointments-summary"]}>
                    <span className={styles["summary-label"]}>
                        Total de consultas
                    </span>
                    <strong>
                        {loading ? <Skeleton /> : filteredAppointments.pagination.totalItems}
                    </strong>
                </div>
            </header>

            <section className={styles.filters}>
                <div className={styles["filters-heading"]}>
                    <div>
                        <h2>Filtrar consultas</h2>
                        <p>Encontre consultas por paciente, data ou status.</p>
                    </div>

                    <button className={styles["clear-filters"]} type="button" disabled={loading}

                        onClick={() => {
                            setFilter({})
                            setSorting(DEFAULT_APPOINTMENT_QUERY.sorting)
                            setPagination({})
                            setFiltersVersion((prev) => prev + 1)
                            handleFilterAppointments({}, DEFAULT_APPOINTMENT_QUERY.sorting, {})
                        }}>
                        Limpar filtros
                    </button>
                </div>

                <form key={filtersVersion}>

                    <div className={styles["filters-grid"]}>
                        <label className={styles["filter-field"]}>
                            <span>Nome do paciente</span>
                            <input type="text" placeholder="Buscar paciente..."
                                onChange={(ev) => {
                                    setFilter((prevFilter) => ({
                                        ...prevFilter,
                                        patient_name: ev.target.value
                                    }
                                    ))
                                }
                                } />
                        </label>

                        <label className={styles["filter-field"]}>
                            <span>Status</span>
                            <select defaultValue=""
                                onChange={(ev) => {

                                    setFilter((prevFilter) => ({
                                        ...prevFilter,
                                        status: ev.target.value === "SCHEDULED" ? "SCHEDULED" :
                                            ev.target.value === "COMPLETED" ? "COMPLETED" :
                                                ev.target.value === "CANCELLED" ? "CANCELLED" :
                                                    undefined
                                    }))
                                }}>
                                <option value="">Todos os status</option>
                                <option value="SCHEDULED">Agendada</option>
                                <option value="COMPLETED">Concluída</option>
                                <option value="CANCELLED">Cancelada</option>
                            </select>
                        </label>

                        <label className={styles["filter-field"]}>
                            <span>Data da consulta — de</span>
                            <input type="date"
                                onChange={(ev) => {

                                    setFilter((prevFilter) => ({
                                        ...prevFilter,
                                        starts_at: {
                                            gte: ev.target.value ? dayjs
                                                .tz(ev.target.value, 'America/Sao_Paulo')
                                                .toDate()
                                                : undefined,
                                            lt: prevFilter.starts_at?.lt
                                        }

                                    }
                                    ))
                                }} />
                        </label>

                        <label className={styles["filter-field"]}>
                            <span>Data da consulta — até</span>
                            <input type="date"
                                onChange={(ev) => {

                                    setFilter((prevFilter) => ({
                                        ...prevFilter,
                                        starts_at: {
                                            gte: prevFilter.starts_at?.gte,
                                            lt: ev.target.value
                                                ? dayjs.tz(ev.target.value, 'America/Sao_Paulo')
                                                    .add(1, 'day')
                                                    .toDate()
                                                : undefined
                                        }
                                    }
                                    ))
                                }} />
                        </label>

                        <label className={styles["filter-field"]}>
                            <span>Data de criação — de</span>
                            <input type="date"

                                onChange={(ev) => {

                                    setFilter((prevFilter) => ({
                                        ...prevFilter,
                                        created_at: {
                                            gte: ev.target.value ? dayjs
                                                .tz(ev.target.value, 'America/Sao_Paulo')
                                                .toDate()
                                                : undefined,
                                            lt: prevFilter.created_at?.lt
                                        }
                                    }
                                    ))
                                }} />
                        </label>

                        <label className={styles["filter-field"]}>
                            <span>Data de criação — até</span>
                            <input type="date"

                                onChange={(ev) => {

                                    setFilter((prevFilter) => ({
                                        ...prevFilter,
                                        created_at: {
                                            gte: prevFilter.created_at?.gte,
                                            lt: ev.target.value ? dayjs
                                                .tz(ev.target.value, 'America/Sao_Paulo')
                                                .add(1, 'day')
                                                .toDate()
                                                : undefined
                                        }
                                    }
                                    ))
                                }} />
                        </label>

                        <label className={styles["filter-field"]}>
                            <span>Notas da consulta</span>
                            <select defaultValue="" onChange={(ev) => {

                                setFilter((prevFilter) => ({
                                    ...prevFilter,
                                    notes:
                                        ev.target.value === "true" ? true
                                            : ev.target.value === "false" ? false
                                                : undefined
                                }))
                            }}>
                                <option value="">Todas</option>
                                <option value="true">Com notas</option>
                                <option value="false">Sem notas</option>
                            </select>
                        </label>

                        <label className={styles["filter-field"]}>
                            <span>Ordenar por</span>
                            <select defaultValue="starts_at"
                                onChange={(ev) => {

                                    setSorting((prevSorting) => ({
                                        ...prevSorting,
                                        sortBy: ev.target.value as AppointmentSorting['sortBy']
                                    }))
                                }}>
                                <option value="starts_at">Data da consulta</option>
                                <option value="created_at">Data de criação</option>
                            </select>
                        </label>

                        <label className={styles["filter-field"]}>
                            <span>Ordem</span>
                            <select defaultValue="desc"
                                onChange={(ev) => {

                                    setSorting((prevSorting) => ({

                                        ...prevSorting,
                                        sortOrder: ev.target.value as AppointmentSorting['sortOrder']
                                    }))
                                }}>
                                <option value="asc">Crescente</option>
                                <option value="desc">Decrescente</option>
                            </select>
                        </label>
                    </div>
                </form>

                <div className={styles["filter-actions"]}>
                    <button className={styles["secondary-button"]} type="button" disabled={loading}

                        onClick={() => {
                            setFilter({})
                            setSorting(DEFAULT_APPOINTMENT_QUERY.sorting)
                            setPagination({})
                            setFiltersVersion((prev) => prev + 1)
                            handleFilterAppointments({}, DEFAULT_APPOINTMENT_QUERY.sorting, {})
                        }}>
                        Limpar
                    </button>

                    <button className={styles["primary-button"]} type="button" disabled={loading}
                        onClick={() => handleFilterAppointments(filter, sorting, pagination)}>
                        Aplicar filtros
                    </button>
                </div>
            </section>

            <section className={styles["appointments-section"]}>
                <div className={styles["list-heading"]}>
                    <div>
                        <h2>Resultados</h2>
                        <p>
                            {loading ? <Skeleton />
                                : filteredAppointments.pagination.totalItems} consultas encontradas
                        </p>
                    </div>

                    <span className={styles["results-limit"]}>
                        {filteredAppointments?.pagination.limit} por página
                    </span>
                </div>

                <div className={styles["appointments-list"]}>

                    {loading ? (
                        Array.from({ length: 3 }).map((_, index) => (
                            <article
                                className={styles["appointment-card"]}
                                key={index}
                            >
                                <div className={styles["patient-avatar"]}>
                                    <Skeleton circle width={48} height={48} />
                                </div>

                                <div className={styles["appointment-info"]}>
                                    <Skeleton width={150} height={20} />
                                    <Skeleton width={180} height={16} />
                                    <Skeleton width={120} height={14} />
                                </div>

                                <div className={styles["appointment-meta"]}>
                                    <Skeleton width={85} height={24} />
                                    <Skeleton width={90} height={24} />
                                </div>

                                <div className={styles["appointment-actions"]}>
                                    <Skeleton width={100} height={36} />
                                </div>
                            </article>
                        ))

                    ) : filteredAppointments.appointments.length === 0 ?

                        <p>Nenhuma consulta encontrada com esses parâmetros</p>

                        : filteredAppointments.appointments.map((appointment) => {

                            return (
                                <article className={styles["appointment-card"]} key={appointment.id}>
                                    <div className={styles["patient-avatar"]}>MA</div>

                                    <div className={styles["appointment-info"]}>
                                        <h3>{appointment.patient.name}</h3>
                                        <p>
                                            {
                                                dayjs(appointment.starts_at)
                                                    .tz('America/Sao_Paulo')
                                                    .format('DD/MM/YYYY [às] HH:mm')
                                            }
                                        </p>
                                        <span className={styles["appointment-created"]}>
                                            Criada em {
                                                dayjs(appointment.created_at)
                                                    .tz('America/Sao_Paulo')
                                                    .format('DD/MM/YYYY')
                                            }
                                        </span>
                                    </div>

                                    <div className={styles["appointment-meta"]}>
                                        <span
                                            className={
                                                `${styles.status}
                                     ${appointment.status === 'SCHEDULED' ? styles.scheduled
                                                    : appointment.status === 'COMPLETED' ? styles.completed
                                                        : appointment.status === 'CANCELLED' ? styles.cancelled : ''}
                                                `}>
                                            {
                                                appointment.status === 'SCHEDULED' ? 'agendado'
                                                    : appointment.status === 'COMPLETED' ? 'concluída'
                                                        : appointment.status === 'CANCELLED' ? 'cancelada' : ''
                                            }
                                        </span>
                                        <span
                                            className={`${styles["notes-indicator"]} ${appointment.notes ?
                                                styles["has-notes"] : styles["no-notes"]}
                                        `}>
                                            {appointment.notes ? 'Com notas' : 'Sem notas'}
                                        </span>
                                    </div>

                                    <div className={styles["appointment-actions"]}>
                                        <button className={styles["details-button"]} type="button">
                                            Ver detalhes
                                        </button>
                                    </div>
                                </article>
                            )
                        })}
                </div>

                <footer className={styles.pagination}>
                    <span>
                        Página {filteredAppointments.pagination.page} de {filteredAppointments.pagination.totalPages}
                    </span>

                    <div className={styles["pagination-buttons"]}>
                        <button type="button" disabled={filteredAppointments.pagination.page === 1}
                            onClick={() => handleFilterAppointments(
                                filter,
                                sorting,
                                {
                                    ...pagination,
                                    page: filteredAppointments.pagination.page - 1
                                }
                            )}>
                            Anterior
                        </button>


                        <button type="button" className={styles["current-page"]}>

                            {filteredAppointments.pagination.page}

                        </button>

                        {filteredAppointments.pagination.totalPages > 1
                            && filteredAppointments.pagination.page < filteredAppointments.pagination.totalPages && (
                                <button type="button"
                                    onClick={() => handleFilterAppointments(
                                        filter,
                                        sorting,
                                        {
                                            ...pagination,
                                            page: filteredAppointments.pagination.page + 1
                                        }
                                    )}>
                                    {filteredAppointments.pagination.page + 1}
                                </button>
                            )
                        }

                        <button type="button"
                            disabled={
                                filteredAppointments.pagination.page
                                ===
                                filteredAppointments.pagination.totalPages
                            }
                            onClick={() => handleFilterAppointments(
                                filter,
                                sorting,
                                {
                                    ...pagination,
                                    page: filteredAppointments.pagination.page + 1
                                }
                            )}>
                            Próxima
                        </button>
                    </div>
                </footer>
            </section>
        </main >
    )
}
