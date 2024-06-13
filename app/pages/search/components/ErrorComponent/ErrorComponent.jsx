import {Image, Text, View} from 'react-native';
import {SomethingWentWrong} from '../../../../assets/icons';
import React from 'react';

export const ErrorComponent = () => {
  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
      }}>
      <Image source={SomethingWentWrong} style={{width: 200, height: 200}} />
      <Text
        style={{
          fontSize: 20,
          color: 'black',
        }}>
        Something went wrong
      </Text>
    </View>
  );
};
