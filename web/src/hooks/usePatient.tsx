import { useContext } from "react";
import { PatientContext } from "../contexts/Patient.context";


export function usePatient() {

    const context = useContext(PatientContext)

    if (!context) {
        throw new Error('usePatient deve ser usado dentro de PatientProvider')
    }
    else {
        return context
    }

}