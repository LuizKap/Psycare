import { Swiper, SwiperSlide } from 'swiper/react'
import type { Swiper as SwiperInstance } from 'swiper'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import './Carousel.css'
import 'swiper/css/navigation'

import Joy from './joy'
import Calmness from './Calmness'
import Confidence from './Confidence'
import { useRef, useState } from 'react'


function Carousel() {

    const swiperRef = useRef<SwiperInstance | null>(null)

    const [activeSlide, setActiveSlide] = useState(0)

    return (

        <>
            <div className='carousel-btn-group'>

                <button
                    className={`calmness-btn emotion-btn ${activeSlide === 0 ? 'active' : ''}`}
                    onClick={() => swiperRef.current?.slideToLoop(0)}
                >
                    Calma
                </button>

                <button
                    className={`joy-btn emotion-btn ${activeSlide === 1 ? 'active' : ''}`}
                    onClick={() => swiperRef.current?.slideToLoop(1)}
                >
                    Alegria
                </button>

                <button
                    className={`confidence-btn emotion-btn ${activeSlide === 2 ? 'active' : ''}`}
                    onClick={() => swiperRef.current?.slideToLoop(2)}
                >
                    Confiança
                </button>
                
            </div>

            <Swiper
                onSwiper={(swiper) => {
                    swiperRef.current = swiper
                }}

                onSlideChange={(swiper) => {
                    setActiveSlide(swiper.realIndex)
                }}

                modules={[Autoplay]}
                autoplay={{
                    delay: 3000,
                    disableOnInteraction: false,
                }}
                speed={2000}
                slidesPerView={1}
                spaceBetween={20}
                loop={true}
            >

                <SwiperSlide>
                    <Calmness />
                </SwiperSlide>

                <SwiperSlide>
                    <Joy />
                </SwiperSlide>

                <SwiperSlide>
                    <Confidence />
                </SwiperSlide>
            </Swiper>
        </>

    )
}

export default Carousel