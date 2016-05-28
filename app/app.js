import Fluxible from 'fluxible';
import Application from './components/Routes';
import ApplicationStore from './stores/ApplicationStore';
import TimeStore from './stores/TimeStore';

// create new fluxible instance
const app = new Fluxible({
    component: Application
});

// register stores
app.registerStore(ApplicationStore);
app.registerStore(TimeStore);

export default app;
