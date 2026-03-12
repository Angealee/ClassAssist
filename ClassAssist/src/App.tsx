import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';

/* Pages */
import Dashboard from './pages/Dashboard/Dashboardpage';
import EnrollPage from './pages/Enroll/Enrollpage';
import records from './pages/Records/records';
import { EnrollmentProvider } from './context/EnrollmentContext';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <EnrollmentProvider>
    <IonReactRouter>
      <IonRouterOutlet>

        <Route exact path="/dashboard">
          <Dashboard />
        </Route>

        <Route exact path="/enroll">
          <EnrollPage />
        </Route>

        <Route exact path="/Records" component={records} />

        {/* Default redirect */}
        <Route exact path="/">
          <Redirect to="/dashboard" />
        </Route>

      </IonRouterOutlet>
    </IonReactRouter>
    </EnrollmentProvider>
  </IonApp>
);

export default App;