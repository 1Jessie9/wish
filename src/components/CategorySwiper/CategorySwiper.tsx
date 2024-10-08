import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import useCategoriesService from '../../services/CategoriesService';
import { IonCard, IonCardTitle } from '@ionic/react';
import './CategorySwiper.css';

const CategorySwiper: React.FC = () => {
    const { categories } = useCategoriesService();

    return (
        <Swiper
            className="categories-swiper"
            slidesPerView="auto"
            spaceBetween={10}
            centerInsufficientSlides={true}
        >
            {categories.map(category => (
                <SwiperSlide key={category.id} className='slide-style'>
                    <IonCard mode='ios' className="card-category">
                        <img className='img-category' src={category.image} alt={category.name} />
                        <IonCardTitle className='title'>{category.name}</IonCardTitle>
                    </IonCard>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};

export default CategorySwiper;
