import { IonContent, IonPage } from '@ionic/react';
import './Home.css';
import Header from '../components/Header/Header';
import Search from '../components/Search/Search';
import CategoriesSwiper from '../components/CategorySwiper/CategorySwiper';
import ProductList from '../components/ProductList/ProductList';
import { useState } from 'react';

const Home: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (term: string) => {
        setSearchTerm(term);
    };

    return (
        <IonPage>
            <Header title="home" />
            <IonContent fullscreen>
                <Search onSearch={handleSearch} />
                <CategoriesSwiper />
                <ProductList searchTerm={searchTerm} />
            </IonContent>
        </IonPage>
    );
};

export default Home;
