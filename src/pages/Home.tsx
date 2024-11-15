import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonSearchbar, IonRouterOutlet } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import { IonIcon, IonButton } from '@ionic/react';
import { information, person, settingsSharp } from 'ionicons/icons';

import MovieList from '../components/MoviesList/MoviesList';
import TabBar from '../components/TabBar/TabBar';
import MovieCarousel from '../components/Carrusel/Carrusel';

const Home: React.FC = () => {

  return (
    <>
      <IonPage id="main-content">
        <IonToolbar style={{ padding: '7px' }}>
          <IonTitle class="ion-text-center">DePelis!</IonTitle>
        </IonToolbar>
      
      <IonContent fullscreen={true}>
        <MovieCarousel category="popular" />
        <MovieCarousel category="top_rated" />
        <MovieCarousel category="upcoming" />
      </IonContent>

      </IonPage>
    </>
  );
};

export default Home;
