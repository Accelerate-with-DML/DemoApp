// Feed Container
import {FlatList, ActivityIndicator, LogBox} from 'react-native';
import React, {useEffect, useState} from 'react';

import SingleFeedItem from '../components/SingleFeedItem';
import * as helpers from '../api/helper';

const renderItem = ({item}) => {
  return <SingleFeedItem item={item} />;
};

const Feed = () => {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [loader, setLoader] = useState(false);
  let id = 1;

  //Get data initially
  const getData = async () => {
    const pageCount = 15;
    await helpers
      .getDataFromApi(`&per_page=${pageCount}&page=${page}&q=flower`)
      .then(response => {
        console.log(response.data.hits[0]);
        const _data = [];
        response?.data?.hits?.map(object =>
          _data.push({
            id: id + 1,
            imgUrl: object?.largeImageURL,
            name: 'test' + id++,
          }),
        );
        setData(_data);
      });
  };

  const fetchMoreData = async () => {
    //Get More Data when user scroll down
    setLoader(true);
    setPage(page + 1);
    console.log(page, 'more page');
    const pageCount = 5;
    await helpers
      .getDataFromApi(`&per_page=${pageCount}&page=${page}&q=flower`)
      .then(response => {
        let _moreData = [];
        let previousCount = data.length;
        response?.data?.hits?.map(
          (object, index) =>
            _moreData.push({
              id: previousCount + index,
              imgUrl: object?.largeImageURL,
              name: `test${previousCount + index}`,
            }),
          previousCount++,
        );
        setData(prev => prev.concat(_moreData));
        setLoader(false);
      });
  };

  useEffect(() => {
    LogBox.ignoreAllLogs();
    getData();
  }, []);
  return (
    <>
      <FlatList
        onEndReachedThreshold={0.1}
        onEndReached={() => fetchMoreData()}
        data={data}
        keyExtractor={index => index.toString()}
        renderItem={renderItem}
        initialNumToRender={15}
      />
      {loader && (
        <ActivityIndicator animating={loader} size={'large'} color={'grey'} />
      )}
    </>
  );
};

export default Feed;
