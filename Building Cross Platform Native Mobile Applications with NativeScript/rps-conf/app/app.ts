import './bundle-config';
import * as navigationModule from './shared/navigation';
import * as application from 'application';
application.setCssFileName('styles/app.css');
application.start({ moduleName: navigationModule.startingPage() });