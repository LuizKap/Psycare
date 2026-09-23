
    export type ApiError = {
        message: string
        errors: FormError[]
    }

     export type FormError = {
        path: (string | number)[]
        message: string
    }