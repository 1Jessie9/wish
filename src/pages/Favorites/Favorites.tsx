import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonItem, IonSelect, IonSelectOption } from '@ionic/react';
import { useState } from 'react';
import { useFavorites } from '../../context/FavoriteContext';
import './Favorites.css';
import Header from '../../components/Header/Header';
import ProductCard from '../../components/ProductCard/ProductCard';

const Favorites: React.FC<{ title?: string }> = () => {
    const { favorites } = useFavorites();
    const [sortOrder, setSortOrder] = useState<string>('');

    const getSortedFavorites = () => {
        let sorted = [...favorites];

        switch (sortOrder) {
            case 'nameAsc':
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            case 'nameDesc':
                return sorted.sort((a, b) => b.title.localeCompare(a.title));
            case 'dateAsc':
                return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
            case 'dateDesc':
                return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
            case 'priceAsc':
                return sorted.sort((a, b) => a.price - b.price);
            case 'priceDesc':
                return sorted.sort((a, b) => b.price - a.price);
            default:
                return favorites;
        }
    };

    const sortedFavorites = getSortedFavorites();

    return (
        <IonPage className='favorites'>
            <Header title="Favorites" />
            <IonContent fullscreen>
                <IonSelect className='contain-select'
                    fill="outline"
                    value={sortOrder}
                    placeholder="Order by:"
                    onIonChange={(e) => setSortOrder(e.detail.value)}
                >
                    <IonSelectOption value="nameAsc">Nombre A-Z</IonSelectOption>
                    <IonSelectOption value="nameDesc">Nombre Z-A</IonSelectOption>
                    <IonSelectOption value="dateAsc">Fecha Agregada (más vieja)</IonSelectOption>
                    <IonSelectOption value="dateDesc">Fecha Agregada (más reciente)</IonSelectOption>
                    <IonSelectOption value="priceAsc">Precio (menor a mayor)</IonSelectOption>
                    <IonSelectOption value="priceDesc">Precio (mayor a menor)</IonSelectOption>
                </IonSelect>

                <IonGrid className='grid-style'>
                    <IonRow>
                        {sortedFavorites.length === 0 ? (
                            <p>No hay productos en favoritos.</p>
                        ) : (
                            sortedFavorites.map((product) => (
                                <IonCol key={product.id} size-xs="12" size-sm="12" size-md="4" size-lg="3" size-xl="3">
                                    <ProductCard product={product} forceFavorite={true}/>
                                </IonCol>
                            ))
                        )}
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Favorites;