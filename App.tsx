/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Auth, Search} from './app/pages';
import axios from 'axios';
// @ts-ignore
import {AUTH_TOKEN} from '@env';

function App(): React.JSX.Element {
  axios.defaults.headers.common.authorization = `Bearer ${AUTH_TOKEN}`;
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Auth>
        <Search />
      </Auth>
    </SafeAreaView>
  );
}

export default App;
