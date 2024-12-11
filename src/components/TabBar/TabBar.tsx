import { IonIcon, IonButtons, IonButton, IonHeader, IonToolbar, IonTitle, IonMenu, IonContent, IonPage, IonMenuButton, IonList, IonItem, IonLabel, IonAvatar } from '@ionic/react';
import { chatbubblesOutline, chevronForward, personOutline } from 'ionicons/icons';
import jwtDecode from 'jwt-decode';


const TabBar: React.FC = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found');
    return;
  }

  const decodedToken: any = jwtDecode(token);

  return (

    <>

      <IonMenu contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">

          <IonItem lines='none' href='/home/profile'>
            <IonAvatar aria-hidden="true" slot="start">
              <img alt="" src={decodedToken.profileImage} />
            </IonAvatar>
            <IonLabel>
              <h3 style={{ fontSize: "20px" }}>{decodedToken.fullName}</h3>
              <span style={{ fontSize: "15px", color: "grey" }}>@{decodedToken.username}</span>
              <p>Ver perfil</p>
            </IonLabel>
            <div slot='end'>
              <IonIcon color="medium" icon={chevronForward}></IonIcon>
            </div>
          </IonItem>


          <IonList lines='full'>
            <p color='medium'>Configuraciones</p>
            <IonItem>
              <IonLabel>Gestion de la cuenta</IonLabel>
              <div slot='end'>
                <IonIcon color="medium" icon={chevronForward}></IonIcon>
              </div>
            </IonItem>

            <IonItem>
              <IonLabel>Notificaciones</IonLabel>
              <div slot='end'>
                <IonIcon color="medium" icon={chevronForward}></IonIcon>
              </div>
            </IonItem>

            <IonItem>
              <IonLabel>Privacidad y datos</IonLabel>
              <div slot='end'>
                <IonIcon color="medium" icon={chevronForward}></IonIcon>
              </div>
            </IonItem>
          </IonList>

        </IonContent>
      </IonMenu>
      <IonPage id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonMenuButton>
                <IonIcon slot="icon-only" icon={personOutline} />
              </IonMenuButton>
            </IonButtons>
            <IonTitle> <a href='/finder'> people finder </a></IonTitle>
            <IonButtons slot='end'>
              <IonButton href="/home/favorite">
                <IonIcon slot="icon-only" icon={chatbubblesOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
      </IonPage>
    </>
  );
};

export default TabBar;
