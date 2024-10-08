import { useIonToast } from '@ionic/react';
import { useEffect, useState } from 'react';
import { ICategory } from '../models/Category.interface';

const useCategoriesService = () => {
    const [categories, setCategories] = useState<ICategory[]>([]);
    const [present] = useIonToast();

    const fetchCategories = async () => {
        try {
            const response = await fetch('https://api.escuelajs.co/api/v1/categories');
            if (!response.ok) {
                throw new Error('Error al obtener las categorías');
            }
            const data = await response.json();
            setCategories(data);
        } catch (error: unknown) {
            if (error instanceof Error) {
                present({
                    message: error.message,
                    duration: 2000,
                    color: 'dark',
                });
            } else {
                present({
                    message: 'Error desconocido',
                    duration: 2000,
                    color: 'dark',
                });
            }
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return { categories };
};

export default useCategoriesService;