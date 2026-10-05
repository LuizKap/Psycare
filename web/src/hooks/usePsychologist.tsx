import { useContext } from "react";
import { PsychologistContext } from "../contexts/Psychologist.context";


export function usePsychologist() {

    const context = useContext(PsychologistContext)

    if (!context) {
        throw new Error('usePsychologist deve ser usado dentro de PatientProvider')
    }
    else {
        return context
    }
}