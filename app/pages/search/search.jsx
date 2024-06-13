import React, {useCallback, useRef} from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  Image,
  Text,
  View,
} from 'react-native';
import {useEffect, useState} from 'react';
import {SearchFooter, SearchHeader, SearchLoader} from './components';
import {getRequest} from '../../network';
import {EmptyComponent} from './components';
import {ErrorComponent} from './components';
import {searchStyles} from './styles';

export const Search = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [pullRefreshLoading, setPullRefreshLoading] = useState(false);
  const [error, setError] = useState(false);
  const totalPages = useRef(0);
  const currentPage = useRef(1);
  const WINDOW_WIDTH = Dimensions.get('window').width;
  const WINDOW_HEIGHT = Dimensions.get('window').height;
  const COLUMNS = Math.floor(WINDOW_WIDTH / 100);
  const IMAGE_WIDTH = (WINDOW_WIDTH - 20 - (COLUMNS - 1) * 10) / COLUMNS;
  const timer = useRef(null);

  const fetchData = useCallback(
    async (querySearch = '', pullToRefresh = false) => {
      pullToRefresh ? setPullRefreshLoading(true) : setIsLoading(true);
      try {
        const response = await getRequest(
          'search',
          currentPage.current,
          querySearch,
        );
        if (response.status === 200) {
          pullToRefresh ? setPullRefreshLoading(false) : setIsLoading(false);
          setError(prevState => prevState && false);
          const data = response.data.data;
          if (currentPage.current > 1) {
            setImages(prevImages => [...prevImages, ...data]);
          } else {
            totalPages.current = Math.ceil(response.data.total_count / 20);
            setImages(data);
          }
        }
      } catch (e) {
        pullToRefresh ? setPullRefreshLoading(false) : setIsLoading(false);
        setError(true);
        if (pullToRefresh || currentPage.current === 1) {
          setImages([]);
        }
      }
    },
    [],
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderItem = ({index, item}) => {
    return (
      <View key={index}>
        <Image
          style={searchStyles.listItem(IMAGE_WIDTH)}
          source={{uri: item.assets.preview.url}}
          alt={'item.description'}
        />
      </View>
    );
  };

  const onQueryChange = text => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    setQuery(text);
    timer.current = setTimeout(() => {
      setImages([]);
      currentPage.current = 1;
      fetchData(text);
    }, 300);
  };

  const onEndReached = () => {
    if (
      currentPage.current < totalPages.current &&
      !isLoading &&
      !pullRefreshLoading &&
      !error
    ) {
      currentPage.current = currentPage.current + 1;
      fetchData(query);
    }
  };

  const handleRefresh = () => {
    currentPage.current = 1;
    fetchData(query, true);
  };

  const handleContentSizeChange = (contentWidth, contentHeight) => {
    if (contentHeight < WINDOW_HEIGHT) {
      onEndReached();
    }
  };

  return (
    <View style={searchStyles.container}>
      <SearchHeader query={query} onQueryChange={onQueryChange} />
      {isLoading && images?.length === 0 ? (
        <SearchLoader columns={COLUMNS} windowWidth={WINDOW_WIDTH} items={20} />
      ) : (
        <FlatList
          style={{
            flexGrow: 0,
            // height: WINDOW_HEIGHT,
          }}
          ListEmptyComponent={
            error ? <ErrorComponent /> : <EmptyComponent text={query} />
          }
          contentContainerStyle={searchStyles.flatlistContainer}
          numColumns={COLUMNS}
          onRefresh={handleRefresh}
          refreshing={pullRefreshLoading}
          {...(COLUMNS > 1 && {
            columnWrapperStyle: searchStyles.columnWrapperStyle,
          })}
          data={images}
          ListFooterComponent={
            <SearchFooter isLoading={isLoading} error={error} images={images} />
          }
          renderItem={renderItem}
          onEndReached={onEndReached}
          showsVerticalScrollIndicator={false}
          onEndReachedThreshold={0.5}
          onContentSizeChange={handleContentSizeChange}
        />
      )}
    </View>
  );
};
