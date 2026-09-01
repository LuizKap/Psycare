import crypto from 'node:crypto'
import type { Session } from '../../generated/prisma/client.js'

export const generateSessionData = (
    userType: Session['user_type']
) => {
    const token = crypto.randomBytes(32).toString('hex')

    const TEN_DAYS_IN_MS = 1000 * 60 * 60 * 24 * 10
    const expires_at = new Date(Date.now() + TEN_DAYS_IN_MS)

    return {
        token,
        expires_at,
        user_type: userType
    }
}