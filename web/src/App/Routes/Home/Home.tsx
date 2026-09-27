
import type { HomeProps } from "../../../types"
import Carousel from "./components/Carousel/Carousel"
import Hero from "./components/Hero/Hero"
import "./Home.css"
import { useAuth } from "../../../hooks/useAuth"

function Home({ closeSidebar }: HomeProps) {

    const auth = useAuth()

    console.log(auth.profile)

    return (
        <main onClick={closeSidebar}>
            <Hero />
            <Carousel />
        </main>
    )
}

export default Home