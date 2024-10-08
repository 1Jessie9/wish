import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { IProduct } from '../models/Product.interface';
import { useStorage } from '../hooks/useStorage';

interface FavoriteContextType {
    favorites: IProduct[];
    addFavorite: (product: IProduct) => void;
    deleteFavorite: (productId: number) => void; // Cambié el nombre aquí
}

const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

export const FavoriteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const { getFavorites, setFavorite, removeFavorite } = useStorage();
    const [favorites, setFavorites] = useState<IProduct[]>([]);

    useEffect(() => {
        const loadFavorites = async () => {
            const storedFavorites = await getFavorites();
            setFavorites(storedFavorites);
        };
        loadFavorites();
    }, [getFavorites]);

    const addFavorite = async (product: IProduct) => {
        await setFavorite(product);
        setFavorites((prev) => [...prev, product]);
    };

    // Cambié el nombre de la función local a 'deleteFavorite' para evitar colisión
    const deleteFavorite = async (productId: number) => {
        await removeFavorite(productId);
        setFavorites((prev) => prev.filter((item) => item.id !== productId));
    };

    return (
        <FavoriteContext.Provider value={{ favorites, addFavorite, deleteFavorite }}>
            {children}
        </FavoriteContext.Provider>
    );
};

export const useFavorites = () => {
    const context = useContext(FavoriteContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoriteProvider');
    }
    return context;
};
