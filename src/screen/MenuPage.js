import {StyleSheet, Text, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
const MenuPage = () => {
  const [kategori, setKategori] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/kategori/').then(res => {
      setKategori(res.data.data);
      if (res.data.data !== []) {
        console.log(res.data);
      }
    });
  }, []);

  const renderItem = ({item}) => {
    return (
      <TouchableOpacity
        style={styles.componentContainer}
        onLongPress={() => {
          console.log('Long Press');
        }}>
        <Text>{item.NamaKategori}</Text>
        <Text>{'>'}</Text>
      </TouchableOpacity>
    );
  };
  if (kategori.length === 0) {
    return (
      <SafeAreaView style={styles.containerKosong} edges={['left', 'right']}>
        <Text>Kategori Kosong</Text>
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView style={styles.container} edges={['left', 'right']}>
        <FlatList data={kategori} renderItem={renderItem} />
      </SafeAreaView>
    );
  }
};

export default MenuPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerKosong: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  componentContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 0.2,
    borderBottomColor: 'grey',
  },
});
