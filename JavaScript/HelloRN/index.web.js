import { AppRegistry } from 'react-native';
import App from './src/App';

AppRegistry.registerComponent('HelloRN', () => App);
AppRegistry.runApplication('HelloRN', { rootTag: document.getElementById('root') });
