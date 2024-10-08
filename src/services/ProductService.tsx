import { useState, useEffect } from 'react';
import { IProduct } from '../models/Product.interface';
import { useIonToast } from '@ionic/react';

const useProductService = (searchTerm: string = '') => {
    const [products, setProducts] = useState<IProduct[]>([]);
    const [offset, setOffset] = useState(0);
    const [loading, setLoading] = useState(true); // Cargando inicial
    const [hasMore, setHasMore] = useState(true); // Control de más productos
    const [present] = useIonToast();
    const [noResults, setNoResults] = useState(false); // Indicador para productos vacíos

    const fetchProducts = async () => {
        setLoading(true); // Activamos el estado de carga
        setNoResults(false); // Reseteamos el estado de "no resultados"
        try {
            const response = await fetch(
                `https://api.escuelajs.co/api/v1/products/?title=${searchTerm}&offset=${offset}&limit=12`
            );
            if (!response.ok) throw new Error('Failed to fetch products');
            const data: IProduct[] = await response.json();

            if (data.length === 0 && offset === 0) {
                setNoResults(true); // Si no hay productos en la primera página, no hay resultados
            }

            if (data.length < 12) {
                setHasMore(false); // Si se obtienen menos de 12 productos, no hay más
            } else {
                setHasMore(true); // Si se obtienen 12 o más, hay más
            }

            setProducts((prev) => {
                // Si estamos buscando un nuevo término (offset = 0), reemplazamos los productos existentes
                return offset === 0 ? data : [...prev, ...data];
            });
        } catch (error) {
            present({
                message: 'Error al cargar productos: ' + (error as Error).message,
                duration: 2000,
                color: 'danger',
                position: 'bottom',
            });
        } finally {
            setLoading(false); // Desactivamos el estado de carga
        }
    };

    // Este efecto se ejecutará al cambiar el término de búsqueda
    useEffect(() => {
        if (searchTerm === '') {
            setProducts([]); // Limpiamos los productos si no hay búsqueda
            setOffset(0); // Reiniciamos el offset al buscar sin término
            setHasMore(true); // Restablecemos la bandera de "más productos"
        } else {
            setOffset(0); // Reiniciamos el offset al cambiar el término de búsqueda
        }
        fetchProducts(); // Siempre llamamos a fetchProducts
    }, [searchTerm]);

    // Este efecto se ejecutará al cambiar el offset para cargar más productos
    useEffect(() => {
        if (offset > 0) {
            fetchProducts();
        }
    }, [offset]);

    return {
        products,
        loading,
        setOffset,
        hasMore,
        noResults, // Devuelve indicador de no resultados
    };
};

export default useProductService;