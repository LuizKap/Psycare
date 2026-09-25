
import { useContext } from "react"
import type { HomeProps } from "../../types"
import Carousel from "./components/Carousel/Carousel"
import Hero from "./components/Hero/Hero"
import "./Home.css"
import { AuthContext } from "../../../contexts/Auth.context"

function Home({ closeSidebar }: HomeProps) {

    const auth = useContext(AuthContext)

    console.log(auth?.user)

    return (
        <main onClick={closeSidebar}>
            <Hero />
            <Carousel />
        </main>
    )
}

export default Home