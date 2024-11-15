import { IonContent, IonPage, IonHeader, IonToolbar, IonTitle, IonCard, IonItem, IonIcon, IonLabel, IonList } from "@ionic/react"
import { personCircleOutline, call, readerOutline, cogOutline, informationCircleOutline, heartOutline, notificationsOutline } from "ionicons/icons"
import './ProfilePage.css';


const ProfilePage: React.FC = () => {
    return(
        <IonPage>
            <IonHeader translucent={true}>
                <IonToolbar style={{ padding: '7px' }}>
                    <IonTitle class="text-aling">Perfil</IonTitle>
                </IonToolbar>
            </IonHeader> 
            <IonContent>
            <div className="image-container">
                    <img src="https://live.staticflickr.com/8258/8683827826_7345599262_b.jpg" className="round-image" />
                    
            </div>
            <div className="image-title">Nombre del Perfil</div>
            <IonCard>
                <IonList lines="none" className="si">                
                    <IonItem className="ion-items">
                        <IonIcon aria-hidden="true" slot="start" icon={personCircleOutline} />
                        <IonLabel>Mi Perfil</IonLabel>
                    </IonItem>
                </IonList>
            </IonCard>
            <IonCard>
            <IonList>                
                    <IonItem className="ion-items">
                        <IonIcon aria-hidden="true" icon={heartOutline} slot="start"></IonIcon>
                        <IonLabel>Favoritos</IonLabel>
                    </IonItem>
                    <IonItem className="ion-items" lines="none">
                        <IonIcon aria-hidden="true"  icon={readerOutline} slot="start"></IonIcon>
                        <IonLabel>Historial</IonLabel>
                    </IonItem>
            </IonList>
            </IonCard>
            <IonCard>
                <IonList>                
                    <IonItem className="ion-items">
                        <IonIcon aria-hidden="true" icon={notificationsOutline} slot="start"></IonIcon>
                        <IonLabel>Notificaciones</IonLabel>
                    </IonItem>
                    <IonItem className="ion-items">
                        <IonIcon aria-hidden="true" icon={cogOutline} slot="start"></IonIcon>
                        <IonLabel>Configuraciones</IonLabel>
                    </IonItem>
                    <IonItem className="ion-items" lines="none">
                        <IonIcon aria-hidden="true" icon={informationCircleOutline} slot="start"></IonIcon>
                        <IonLabel>Informacion</IonLabel>
                    </IonItem>
                </IonList>
            </IonCard>

            <IonIcon aria-hidden="true" icon={call} slot="start"></IonIcon>
            <IonLabel className="logout-container">Cerrar Sesion</IonLabel>
            </IonContent>           
        </IonPage>
    )
}
    
export default ProfilePage