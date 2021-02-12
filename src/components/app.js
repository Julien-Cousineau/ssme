import React from 'react';

import styled, {ThemeProvider, withTheme} from 'styled-components';
import {IntlProvider} from 'react-intl';

import {Header,MapContainer,About}  from 'components/common';


import {messages} from 'localization';
import {FormattedMessage} from 'localization';
import {DataProvider} from 'dataContext.js';

import {LNG,SETLNG,DATA} from 'constants.js';
import connect from '../connect';


import {theme} from '../styles';



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


export const Props = [[LNG,'lng']];
export const Actions = [[SETLNG,'setLng']]; 

class App extends React.Component {
    static defaultProps = {
        lng:"en",
        setLng:()=>null,
      };
    state={
      data:DATA.data,
      boundary:DATA.boundary,
      aboutVisible:false,
    }
    render() {
      const id="myid";
      return (
        <DataProvider data={this.state.data} lng={this.props.lng} boundary={this.state.boundary}>
          <IntlProvider locale={this.props.lng} messages={messages[this.props.lng]}>
            <ThemeProvider theme={theme}>
              <GlobalStyle
                className="app"
                id={`app__${id}`}
                ref={this.root}
              >
               <About visible={this.state.aboutVisible} handleModal={()=>this.setState({aboutVisible:false})}/>
               <Header 
                  title={<FormattedMessage id={'topheader.title'} />}
                  sTitle={<FormattedMessage id={'topheader.stitle'} />}
                  setLng={this.props.setLng} 
                  lng={this.props.lng} 
                  label={<FormattedMessage id={'topheader.lng'} />}
                  items={
                  [ {url:this.props.lng=='en'?'https://www.canada.ca/en/environment-climate-change/services/cumulative-effects/salish-sea-ecosystem/marine-emission-reductions.html':
                  "https://www.canada.ca/fr/environnement-changement-climatique/services/effets-cumulatifs/ecosysteme-mer-salish/reduction-emissions-marines.html",text:<FormattedMessage id={'topheader.home'}/>,onClick:()=>null},
                    {text:<FormattedMessage id={'topheader.about'}/>,onClick:()=>this.setState({aboutVisible:true})},
                  ]
                    
                  }
                />
                <MapContainer/>
              </GlobalStyle>
            </ThemeProvider>
          </IntlProvider>
       </DataProvider>
      );
    }
}

export default connect(App,Props,Actions);