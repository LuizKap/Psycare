import { authService } from "../modules/auth/auth.dependencies.js";

async function deleteExpiredSessions() {
    try {
        const deleted = await authService.deleteExpiredSessions()

        console.log(`${deleted} sessões deletadas`)

    } catch (error) {
        console.error('Erro em Session Job', error)
    }
}

export function startSessionJob() {
    deleteExpiredSessions()
    setInterval(deleteExpiredSessions, 60_000)
}