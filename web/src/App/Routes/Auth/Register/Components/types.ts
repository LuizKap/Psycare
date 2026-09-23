
    export type FormError = {
        path: (string | number)[]
        message: string
    }

    export type ApiError = {
        message: string
        errors: FormError[]
    }
