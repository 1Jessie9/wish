import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonItem, IonSelect, IonSelectOption } from '@ionic/react';
import { useEffect, useState } from 'react';
import { IProduct } from '../../models/Product.interface';
import { useStorage } from '../../hooks/useStorage';
import './Favorites.css';
import Header from '../../components/Header/Header';
import ProductCard from '../../components/ProductCard/ProductCard';

const Favorites: React.FC<{ title?: string }> = () => {
    const { getFavorites, store } = useStorage(); // Asegúrate de obtener store aquí
    const [favorites, setFavorites] = useState<IProduct[]>([]);
    const [sortOrder, setSortOrder] = useState<string>(''); // Estado para la ordenación

    // Cargar los productos favoritos al montar el componente
    useEffect(() => {
        const fetchFavorites = async () => {
            if (store) { // Asegúrate de que store esté inicializado
                const favoriteProducts = await getFavorites();
                setFavorites(favoriteProducts);
            }
        };
        fetchFavorites();
    }, [store]); // Solo se ejecuta cuando store cambia

    // Función para ordenar los productos favoritos directamente antes de renderizar
    const getSortedFavorites = () => {
        let sorted = [...favorites]; // Clonar el array de favoritos

        switch (sortOrder) {
            case 'nameAsc':
                return sorted.sort((a, b) => a.title.localeCompare(b.title)); // A-Z
            case 'nameDesc':
                return sorted.sort((a, b) => b.title.localeCompare(a.title)); // Z-A
            case 'dateAsc':
                return sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()); // Más viejo
            case 'dateDesc':
                return sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()); // Más reciente
            case 'priceAsc':
                return sorted.sort((a, b) => a.price - b.price); // Menor a mayor
            case 'priceDesc':
                return sorted.sort((a, b) => b.price - a.price); // Mayor a menor
            default:
                return favorites; // Si no se selecciona orden, devolver favoritos tal como están
        }
    };

    const sortedFavorites = getSortedFavorites(); // Obtener los favoritos ordenados justo antes de renderizar

    return (
        <IonPage className='favorites'>
            <Header title="Favorites" />
            <IonContent fullscreen>
                <IonSelect className='contain-select'
                    fill="outline"
                    value={sortOrder}
                    placeholder="Order by:"
                    onIonChange={(e) => setSortOrder(e.detail.value)} // Actualiza sortOrder
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
                                    <ProductCard product={product} />
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
