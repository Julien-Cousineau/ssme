import React from 'react';
import styled, {ThemeProvider} from 'styled-components';
import {media,theme} from 'styles.js';
import App from './app';

export default ({children}) => (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>

);