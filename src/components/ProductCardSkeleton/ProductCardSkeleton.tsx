import React from 'react';
import {
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonSkeletonText,
} from '@ionic/react';
import './ProductCardSkeleton.css';

const ProductCardSkeleton: React.FC = () => {
    return (
        <IonCard className="card-skeleton">
            <IonSkeletonText className='skeleton-imagen' animated />
            <IonCardTitle>
                <IonSkeletonText className='skeleton-title' animated />
            </IonCardTitle>
            <IonCardContent className='contain-description'>
                <IonSkeletonText className='skeleton-description' animated />
                <IonSkeletonText className='skeleton-description' animated />
                <IonSkeletonText className='skeleton-description' animated />
            </IonCardContent>
        </IonCard>
    );
};

export default ProductCardSkeleton;