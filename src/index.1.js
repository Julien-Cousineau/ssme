import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route } from 'react-router-dom';
import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './reducers';

import * as serviceWorker from './serviceWorker';
import {theme,GlobalStyle} from './styles';
import {ThemeProvider} from 'styled-components';

import {ComingSoon} from "@meracan/react-component"
// import {Button} from 'antd'

const middleware = applyMiddleware(thunk);
const store = createStore(reducers, middleware);


class Router extends React.PureComponent {
    render() {
      
    return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <BrowserRouter>
        // <ComingSoon />
        
        
           
           
          {/*  <Route path="/" component={Header} />
            <Route exact path="/" component={Home} />
            <Route exact path="/map" component={Tool} />
            <Route exact path="/doc" component={Documentation} />
            <Route exact path="/mapsettings" component={MapSetting} />
            */}
          
        </BrowserRouter>
      
      </ThemeProvider>
    </Provider>
        );
    }
}

ReactDOM.render(<Router />, document.getElementById('root'));
// ReactDOM.render(<div>Julien</div>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();