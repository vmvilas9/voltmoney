import {ActivityIndicator, Text, View} from 'react-native';
import React from 'react';

export const SearchFooter = ({isLoading, error, images}) => {
  return (
    <View
      style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      {isLoading ? (
        <ActivityIndicator size={'large'} style={{marginTop: 20}} />
      ) : error && images?.length > 0 ? (
        <View>
          <Text>Something went wrong</Text>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
};
