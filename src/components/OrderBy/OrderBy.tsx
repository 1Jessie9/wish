import React from 'react';
import { IonList, IonItem, IonSelect, IonSelectOption } from '@ionic/react';

interface OrderByProps {
    onOrderChange: (orderBy: string) => void;
}

const OrderBy: React.FC<OrderByProps> = ({ onOrderChange }) => {
    return (
        <IonList>
            <IonItem>
                <IonSelect
                    aria-label="Order by"
                    interface="popover"
                    placeholder="Order by"
                    onIonChange={(e) => onOrderChange(e.detail.value)}
                >
                    <IonSelectOption value="name-asc">Name (A-Z)</IonSelectOption>
                    <IonSelectOption value="name-desc">Name (Z-A)</IonSelectOption>
                    <IonSelectOption value="date-recent">Date (Most Recent)</IonSelectOption>
                    <IonSelectOption value="date-oldest">Date (Oldest)</IonSelectOption>
                    <IonSelectOption value="price-low-high">Price (Low to High)</IonSelectOption>
                    <IonSelectOption value="price-high-low">Price (High to Low)</IonSelectOption>
                </IonSelect>
            </IonItem>
        </IonList>
    );
};

export default OrderBy;