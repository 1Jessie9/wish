import React, { useEffect, useState } from 'react';
import {
    IonInfiniteScroll,
    IonInfiniteScrollContent,
    IonGrid,
    IonRow,
    IonCol,
} from '@ionic/react';
import useProductService from '../../services/ProductService';
import ProductCard from '../ProductCard/ProductCard';
import ProductCardSkeleton from '../ProductCardSkeleton/ProductCardSkeleton';
import './ProductList.css';

const ProductList: React.FC<{ searchTerm: string }> = ({ searchTerm }) => {
    const { products, loading, setOffset, hasMore } = useProductService(searchTerm);

    return (
        <section className='contain-products'>
            <IonGrid className='grid-style'>
                <IonRow>
                    {loading && products.length === 0 ? (
                        Array.from({ length: 12 }).map((_, index) => (
                            <IonCol key={index} size-xs="12" size-sm="12" size-md="4" size-lg="3" size-xl="3">
                                <ProductCardSkeleton />
                            </IonCol>
                        ))
                    ) : (
                        products.map((product) => (
                            <IonCol key={product.id} size-xs="12" size-sm="12" size-md="4" size-lg="3" size-xl="3">
                                <ProductCard
                                    product={product}
                                />
                            </IonCol>
                        ))
                    )}
                </IonRow>
            </IonGrid>
            {hasMore &&
                (
                    <IonInfiniteScroll
                        threshold="20%"
                        onIonInfinite={(ev) => {
                            setOffset((prev) => prev + 12);
                            setTimeout(() => ev.target.complete(), 500);
                        }}
                    >
                        <IonInfiniteScrollContent loadingText="Cargando más productos..."></IonInfiniteScrollContent>
                    </IonInfiniteScroll>
                )
            }
        </section>
    );
};

export default ProductList;