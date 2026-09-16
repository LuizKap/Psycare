
import type { HomeProps } from "../../types"
import Carousel from "./components/Carousel/Carousel"
import Hero from "./components/Hero/Hero"
import "./Home.css"

function Home({ closeSidebar }: HomeProps) {

    return (
        <main onClick={closeSidebar}>
            <Hero />
            <Carousel />
        </main>
    )
}

export default Home