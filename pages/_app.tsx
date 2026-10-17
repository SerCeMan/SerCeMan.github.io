import { ThemeProvider } from 'next-themes';
import type { AppProps } from 'next/app';
import React, { JSX } from 'react';
import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@fontsource-variable/crimson-pro/wght.css';
import '@fontsource-variable/crimson-pro/wght-italic.css';
import '../styles/globals.css';

// Ship icon styles with the page instead of injecting them after hydration.
config.autoAddCss = false;

const MyApp = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <ThemeProvider attribute="class" enableSystem={false}>
      <Component {...pageProps} />
    </ThemeProvider>
  );
};

export default MyApp;
