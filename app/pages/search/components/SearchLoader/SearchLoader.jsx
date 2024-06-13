import {FlatList, View} from 'react-native';
import React from 'react';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';
import LinearGradient from 'react-native-linear-gradient';

export const SearchLoader = ({columns, windowWidth, items}) => {
  const data = new Array(items).fill('');
  const renderItem = ({item, index}) => {
    return (
      <View key={index} style={{marginTop: 20}}>
        <ShimmerPlaceholder
          width={(windowWidth - 20 - (columns - 1) * 10) / columns}
          height={100}
          LinearGradient={LinearGradient}
          visible={false}
        />
      </View>
    );
  };

  return (
    <FlatList
      contentContainerStyle={{paddingBottom: 250}}
      numColumns={columns}
      columnWrapperStyle={{gap: 10}}
      data={data}
      renderItem={renderItem}
    />
  );
};
