// Single Feed Item (Card) Screen
import {
  Text,
  TouchableOpacity,
  Image,
  Dimensions,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const SingleFeedItem = React.memo(({item}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Redirect')}
      style={styles.card}>
      <Image
        style={styles.image}
        source={
          item?.imgUrl === ''
            ? require('../assets/man.png')
            : {uri: item.imgUrl}
        }
      />
      <Text style={styles.name}>{item.name}</Text>
    </TouchableOpacity>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    marginVertical: 10,
    padding: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 5,
  },
  image: {
    width: width * 0.2,
    height: height * 0.1,
    borderRadius: 50,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
    marginHorizontal: 20,
  },
});

export default SingleFeedItem;
