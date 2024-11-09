import { IonIcon, IonTabBar, IonTabButton, IonLabel } from '@ionic/react';
import { bookmarkOutline, searchOutline, homeOutline, personCircleOutline } from 'ionicons/icons';
import 'swiper/css';
import '@ionic/react/css/ionic-swiper.css';
import 'swiper/css/autoplay';


const TabBar: React.FC = () => {
    return(
        <>
            <IonTabBar slot="bottom">
                <IonTabButton tab="home" href="/home/page1">
                    <IonIcon icon={homeOutline} />
                    <IonLabel>Inicio</IonLabel>
                </IonTabButton>
                <IonTabButton tab="radio" href="/home/search">
                    <IonIcon icon={searchOutline} />
                    <IonLabel>Buscar</IonLabel>
                </IonTabButton>
                <IonTabButton tab="library" href="/home/page2">
                    <IonIcon icon={bookmarkOutline} />
                    <IonLabel>Guardados</IonLabel>
                </IonTabButton>
                <IonTabButton tab="search" href="/home/page3">
                    <IonIcon icon={personCircleOutline} />
                    <IonLabel>Perfil</IonLabel>
                </IonTabButton>
            </IonTabBar>
        </>
    )
}

export default TabBar;