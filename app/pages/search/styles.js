import {StyleSheet} from 'react-native';

export const searchStyles = StyleSheet.create({
  flatlistContainer: (error, images, height) => ({
    paddingBottom: 150,
  }),
  textInput: {
    borderWidth: 1,
    borderRadius: 6,
    marginVertical: 20,
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  container: {
    paddingHorizontal: 10,
    display: 'flex',
    width: '100%',
  },
  listItem: width => ({
    width: width,
    height: 100,
  }),
  columnWrapperStyle: {
    gap: 10,
  },
});
