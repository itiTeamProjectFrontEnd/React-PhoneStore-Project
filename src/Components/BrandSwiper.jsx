import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay"; 
import styles from "../Styles/BrandSwiper.module.css";
import localBrands from "./localBrands"; 

export default function BrandSwiper() {
    const [brands, setBrands] = useState([]);

    useEffect(() => {
        setBrands(localBrands);
    }, []);

    return (
        <div className="container py-5">
            <h4 className={`fw-semibold mb-4 ${styles.mainTitle}`}>
                Our Brands
            </h4>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]} 
                spaceBetween={40}
                slidesPerView={4}
                autoplay={{
                    delay: 1500,
                }}
                loop={true}
                breakpoints={{
                    320: {
                        slidesPerView: 2,
                        spaceBetween: 10,
                    },
                    450: {
                        slidesPerView: 3,
                        spaceBetween: 10,
                    },
                    750: {
                        slidesPerView: 4,
                        spaceBetween: 10,
                    },
                    1200: {
                        slidesPerView: 6,
                        spaceBetween: 10,
                    },
                }}
            >
                {brands.map((brand) => (
                    <SwiperSlide key={brand._id}>
                        <img
                            src={brand.image}
                            alt={brand.name}
                            className={styles.brandImage}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
