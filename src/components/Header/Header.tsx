import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonBackButton } from '@ionic/react';
import { heart, arrowBack } from 'ionicons/icons';
import logo from '../../assets/icons/logo.svg';
import './Header.css';

const Header: React.FC<{ title?: string }> = ({ title }) => {
    return (
        <IonHeader className='header-style'>
            <IonToolbar mode='ios' className='toolbar-style' color={'primary'}>
                {title !== "home" ? (
                    <>
                        <IonButtons slot="start">
                            <IonButton routerLink="/home">
                                <IonIcon icon={arrowBack} color={'light'} className="icon-back" />
                            </IonButton>
                        </IonButtons>
                        <IonTitle className="title-text">{title}</IonTitle>
                    </>
                ) : (
                    <IonTitle className="logo">
                        <img src={logo} alt="Logo" className="icon-logo" />
                    </IonTitle>
                )}
                {title === "home" && (
                    <IonButtons slot="end">
                        <IonButton routerLink="/favorites">
                            <IonIcon icon={heart} color={'light'} className="icon-heart" />
                        </IonButton>
                    </IonButtons>
                )}
            </IonToolbar>
        </IonHeader>
    );
};

export default Header;
