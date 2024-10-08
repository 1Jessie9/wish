import { IonSearchbar } from '@ionic/react';
import './Search.css';
import { useState } from 'react';

const Search: React.FC<{ onSearch: (term: string) => void }> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearchInput = (event: CustomEvent) => {
        const term = (event.target as HTMLInputElement).value;
        setSearchTerm(term);
        onSearch(term);
    };

    return (
        <section className="search-section">
            <section className="contain-search">
                <IonSearchbar
                    className="search"
                    mode="ios"
                    placeholder="Search a product..."
                    value={searchTerm}
                    onIonInput={handleSearchInput}
                />
            </section>
        </section>
    );
};

export default Search;