import { createContext, useEffect, useState } from "react"
import { type User, type AuthContextType, type ProviderProps, ApiError } from "../types"
import { auth_api } from "../fetch/auth.api"
import { toast } from "sonner"




export const AuthContext = createContext<AuthContextType | null>(null)


export function AuthProvider({ children }: ProviderProps) {


    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState<boolean>(true)

    async function refreshAuth() {
        try {
            const user = await auth_api.getAuthUser()
            setUser(user)

        } catch (error) {

            toast.error(error instanceof ApiError ? error.message : 'Erro ao carregar auth')

        }
        finally {
            setLoading(false)
        }
    }

    async function logout() {

        const message = await auth_api.logout()
        setUser(null)
        return message
    }


    useEffect(() => {
        refreshAuth()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                refreshAuth,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}