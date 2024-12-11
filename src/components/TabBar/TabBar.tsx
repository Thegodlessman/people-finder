import { IonIcon, IonTabBar, IonTabButton, IonLabel } from '@ionic/react';
import { bookmarkOutline, searchOutline, homeOutline, personCircleOutline } from 'ionicons/icons';

const TabBar: React.FC = () => {
    return (
        <IonTabBar slot="bottom">
            <IonTabButton tab="home" href="/home">
                <IonIcon icon={homeOutline} />
                <IonLabel>Matches</IonLabel>
            </IonTabButton>
            <IonTabButton tab="search" href="/home/search">
                <IonIcon icon={searchOutline} />
                <IonLabel>Buscar</IonLabel>
            </IonTabButton>
            <IonTabButton tab="library" href="/home/favorite">
                <IonIcon icon={bookmarkOutline} />
                <IonLabel>Guardados</IonLabel>
            </IonTabButton>
            <IonTabButton tab="profile" href="/home/profile">
                <IonIcon icon={personCircleOutline} />
                <IonLabel>Perfil</IonLabel>
            </IonTabButton>
        </IonTabBar>
    );
};

export default TabBar;
