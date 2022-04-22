// Feed Container
import {FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';

import SingleFeedItem from '../components/SingleFeedItem';
import * as helpers from '../api/helper';

const renderItem = ({item}) => {
  return <SingleFeedItem item={item} />;
};

const Feed = () => {
  const [data, setData] = useState([]);
  //Get data initially
  const getData = async () => {
    const pageCount = 10;
    await helpers
      .getDataFromApi(`&per_page=${pageCount}&page=1`)
      .then(response => {
        const _data = [];
        response?.data?.hits?.map(object =>
          _data.push({
            id: object?.id,
            imgUrl: object?.userImageURL,
            name: object?.user,
          }),
        );
        setData(_data);
      });
  };

  const fetchMoreData = async () => {
    //Get More Data when user scroll down
    const pageCount = 5;
    await helpers
      .getDataFromApi(`&per_page=${pageCount}&page=2`)
      .then(response => {
        console.log(response.data.hits[0]);
        let _moreData = [];
        response?.data?.hits?.map(object =>
          _moreData.push({
            id: object?.id,
            imgUrl: object?.userImageURL,
            name: object?.user,
          }),
        );
        let moreData = data.concat(_moreData);
        console.log(moreData);
        setData(moreData);
      });
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <FlatList
      onEndReachedThreshold={0}
      onEndReached={() => fetchMoreData()}
      data={data}
      keyExtractor={item => item?.id?.toString()}
      renderItem={renderItem}
    />
  );
};

export default Feed;
