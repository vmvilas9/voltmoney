import {Image, Text, View} from 'react-native';
import {Search} from '../../../../assets/icons';
import React from 'react';

export const EmptyComponent = ({text}) => {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}>
      <Image source={Search} style={{width: 100, height: 100}} />
      <Text
        style={{
          fontSize: 20,
          color: 'black',
        }}>
        No results found for {text}
      </Text>
    </View>
  );
};
