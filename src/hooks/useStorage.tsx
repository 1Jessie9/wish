import { Storage } from "@ionic/storage";
import { useEffect, useState } from "react";
import { IProduct } from "../models/Product.interface";

export function useStorage() {
    const [store, setStore] = useState<Storage | null>(null);

    useEffect(() => {
        const initStorage = async () => {
            const newStorage = new Storage({
                name: "wishdb",
            });
            const storage = await newStorage.create();
            setStore(storage);
        };
        initStorage();
    }, []);

    const setFavorite = async (product: IProduct) => {
        if (store) {
            const favorites: IProduct[] = (await store.get('favorites')) || [];
            // Comprobamos si el producto ya está en favoritos antes de agregarlo
            if (!favorites.some((item) => item.id === product.id)) {
                const productWithDate = {
                    ...product,
                    createdAt: new Date().toISOString() // Agregar la fecha de creación
                };
                await store.set('favorites', [...favorites, productWithDate]);
            }
        }
    };

    const removeFavorite = async (productId: number) => {
        if (store) {
            const favorites: IProduct[] = (await store.get('favorites')) || [];
            const updatedFavorites = favorites.filter((item: IProduct) => item.id !== productId);
            await store.set('favorites', updatedFavorites);
        }
    };

    const getFavorites = async (): Promise<IProduct[]> => {
        if (store) {
            const favorites = await store.get('favorites');
            return favorites || [];
        }
        return [];
    };

    return { setFavorite, removeFavorite, getFavorites, store };
}