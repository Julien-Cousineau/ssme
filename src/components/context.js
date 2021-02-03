import {createContext} from 'react';

const identity = state => state;
// New Context API only supported after 16.3
const AppContext = createContext({
  selector: identity,
  id: 'app'
});

export const RootContext = createContext(null);

export default AppContext;