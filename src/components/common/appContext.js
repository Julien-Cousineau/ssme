import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {media,theme} from 'styles.js';



import {IntlProvider} from 'react-intl';
import {DataProvider} from 'dataContext.js';

import {FormattedMessage} from 'localization';
import {LNG,SETLNG,DATA} from 'constants.js';
import {messages} from 'localization';


const GlobalStyle = styled.div`
  font-family: ${props => props.theme.fontFamily};
  font-weight: ${props => props.theme.fontWeight};
  font-size: ${props => props.theme.fontSize};
  line-height: ${props => props.theme.lineHeight};

  *,
  *:before,
  *:after {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  ul {
    margin: 0;
    padding: 0;
  }

  li {
    margin: 0;
  }

  a {
    text-decoration: none;
    color: ${props => props.theme.labelColor};
  }

  .mapboxgl-ctrl .mapboxgl-ctrl-logo {
    display: none;
  }
`;



export default ({children,lng='en'}) => (
    <DataProvider data={DATA.data} lng={lng} boundary={DATA.boundary}>
          <IntlProvider locale={lng} messages={messages[lng]}>
            <ThemeProvider theme={theme}>
              <GlobalStyle>
              {children}
              </GlobalStyle>
            </ThemeProvider>
          </IntlProvider>
       </DataProvider>

);