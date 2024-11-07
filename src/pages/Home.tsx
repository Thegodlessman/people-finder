import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonSearchbar, IonRouterOutlet } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { IonIcon, IonButton } from '@ionic/react';
import { information, person, settingsSharp } from 'ionicons/icons';

const Home: React.FC = () => {

  

  return (
    <>
      <IonMenu contentId="main-content">
        <IonRouterOutlet id='main-content'>

        </IonRouterOutlet>
        <IonHeader>
          <IonToolbar>
          <IonButton color='medium' shape='round' style={{ margin: '5px'}}>
              <IonIcon slot="icon-only" ios={person} md={settingsSharp}></IonIcon>
          </IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">This is the menu content.</IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader  translucent={true}>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton></IonMenuButton>
            </IonButtons>
            <IonTitle>DePelis</IonTitle>
            <IonButton slot='end' size='small' color='medium' shape='round' style={{ margin: '5px'}}>
              <IonIcon slot="icon-only" ios={information} md={settingsSharp}></IonIcon>
            </IonButton>
          </IonToolbar>
          <IonToolbar>
            <IonSearchbar></IonSearchbar>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true} className="ion-padding">Tap the button in the toolbar to open the menu.</IonContent>
      </IonPage>
    </>
  );
};

export default Home;
