import React, { useEffect, useState } from 'react';
import {
    IonCard,
    IonCardTitle,
    IonCardContent,
    IonIcon,
} from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';
import { IProduct } from '../../models/Product.interface';
import { useStorage } from '../../hooks/useStorage';
import './ProductCard.css';

interface ProductCardProps {
    product: IProduct;
    isFavorite?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    const maxLength = 80;
    const { setFavorite, removeFavorite, getFavorites } = useStorage();
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        const checkFavorite = async () => {
            const favorites = await getFavorites();
            const favoriteIds = favorites.map((item: IProduct) => item.id);
            setIsFavorite(favoriteIds.includes(product.id));
        };
        checkFavorite();
    }, [getFavorites, product.id]);

    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = 'src/assets/images/not-found.webp'; // Ruta de la imagen de respuesta
    };

    const toggleFavorite = async () => {
        if (isFavorite) {
            await removeFavorite(product.id);
        } else {
            await setFavorite(product);
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <IonCard className="product-card">
            <IonIcon
                icon={isFavorite ? heart : heartOutline}
                color={isFavorite ? 'secondary' : 'medium'}
                className="icon-heart"
                onClick={toggleFavorite}
            />
            <img src={product.images[0]} alt={product.title} onError={handleImageError} />
            <IonCardTitle className='title-card'>{product.title}</IonCardTitle>
            <p className='description'>
                {product.description.length > maxLength
                    ? `${product.description.slice(0, maxLength)}...`
                    : product.description}
            </p>
            <IonCardContent className='price'>${product.price}</IonCardContent>
        </IonCard>
    );
};

export default ProductCard;
