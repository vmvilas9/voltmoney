import {Text, TextInput, View} from 'react-native';
import {searchStyles} from '../../styles';
import React from 'react';

export const SearchHeader = ({query, onQueryChange}) => {
  return (
    <View
      onLayout={event => {
        const {x, y, width, height} = event.nativeEvent.layout;
        console.log(width, height);
      }}>
      <Text style={searchStyles.text}>Search Images</Text>
      <TextInput
        style={searchStyles.textInput}
        value={query}
        onChangeText={onQueryChange}
        placeholder={'Search text...'}
      />
    </View>
  );
};
