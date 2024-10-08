import React, { useEffect, useState } from 'react';
import { IonCard, IonCardTitle, IonCardContent, IonIcon } from '@ionic/react';
import { heart, heartOutline } from 'ionicons/icons';
import { IProduct } from '../../models/Product.interface';
import { useFavorites } from '../../context/FavoriteContext';
import './ProductCard.css';

interface ProductCardProps {
    product: IProduct;
    forceFavorite?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, forceFavorite }) => {
    const maxLength = 80;
    const { favorites, addFavorite, deleteFavorite } = useFavorites();
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        setIsFavorite(favorites.some((item) => item.id === product.id));
    }, [favorites, product.id]);

    const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
        event.currentTarget.src = 'src/assets/images/not-found.webp'; // Ruta de la imagen de respuesta
    };

    const toggleFavorite = () => {
        if (isFavorite) {
            deleteFavorite(product.id);
        } else {
            addFavorite(product);
        }
    };

    return (
        <IonCard className="product-card">
            <IonIcon
                icon={isFavorite || forceFavorite ? heart : heartOutline}
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