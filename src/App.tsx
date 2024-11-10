import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact, IonTabs } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

import Home from './pages/Home';
import Register from './pages/RegisterPage/Register'
import Login from './pages/LoginPage/Login'
import SearchPage from './pages/SearchPage/SearchPage';
import TabBar from './components/TabBar/TabBar';
import FavPage from './pages/FavPage/FavPage';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import MovieDetailsPage from './pages/MovieDetaillsPage/MovieDetailsPage';
import ProtectedRoute from './components/ProtextedRoute/ProtectedRoute';
import RegisterInfoPage from './pages/RegisterInfoPage/RegisterInfoPage';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route path="/register" component={Register} exact />
          <Route path="/login" component={Login} exact/>
          <Route path="/register-info" component={RegisterInfoPage} exact/>

          <ProtectedRoute>
            <SearchPage/>
            <FavPage/>
            <ProfilePage/>
            <MovieDetailsPage/>
            <Home/>
          </ProtectedRoute>

        </IonRouterOutlet>
        {/* TabBar debe estar dentro de IonTabs para que funcione */}
        <TabBar />
      </IonTabs>
    </IonReactRouter>
  </IonApp>
);

export default App;
