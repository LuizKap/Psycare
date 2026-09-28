
import type { HomeProps } from "../../../types"
import Carousel from "./components/Carousel/Carousel"
import Hero from "./components/Hero/Hero"
import "./Home.css"
import { useAuth } from "../../../hooks/useAuth"
import { PsychologistHome } from "./components/Psychologist/Psychologist.home"



function Home({ closeSidebar }: HomeProps) {

    const auth = useAuth()

    console.log(auth.profile)

    if (!auth.profile || auth.profile.user.role === 'PATIENT') {
        return (
            <main onClick={closeSidebar}>
                <Hero />
                <Carousel />
            </main>
        )
    }

    return (
        <main onClick={closeSidebar}>
            <PsychologistHome />
        </main>
    )

}

export default Home