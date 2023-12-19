import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';

const Home = () => {
  const [data, setData] = useState(['Aman', 'Vikku', 'Rahul']);
  const [datas, setDatas] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentIndexes, setCurrentIndexes] = useState(0);
  const [lastIndex, setLastIndex] = useState(data.length - 1);
  const [lastIndexes, setLastIndexes] = useState(datas.length - 1);

  const [value, setvalue] = useState();
  const handleAdd = () => {
    let ids = [...data, value];
    setData(ids);
    setvalue();
  };

  const handleDel = item => {
    let ids = data.filter(id => id != item);
    setData(ids);
  };
  const handleDels = item => {
    let ids = datas.filter(id => id != item);
    setDatas(ids);
  };

  const handlewish = item => {
    handleDel(item);
    let ids = [...datas, item];
    setDatas(ids);
  };
  const handlewishs = item => {
    handleDels(item);
    let ids = [...data, item];
    setData(ids);
  };
  return (
    <View style={styles.container}>
      <View style={{flex: 1, marginHorizontal: 15, paddingTop: 15}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: '#eee',
            paddingHorizontal: 10,
            paddingVertical: 15,
            borderRadius: 12,
          }}>
          <TextInput
            value={value}
            onChangeText={text => setvalue(text)}
            placeholder="Enter text"
            placeholderTextColor={'red'}
            style={{padding: 0, width: '90%'}}
          />
          <TouchableOpacity
            onPress={() => handleAdd()}
            style={{
              backgroundColor: '#000000c2',
              width: 30,
              height: 30,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 100,
            }}>
            <Text style={{color: 'greenyellow', fontSize: 20}}>✔</Text>
          </TouchableOpacity>
        </View>
        {datas
          .reverse()
          .slice(currentIndexes, currentIndexes + 2)
          .map((item,index) => {
            return (
              <View
                style={{
                  paddingHorizontal: 10,
                  borderRadius: 8,
                  backgroundColor: '#ddd',
                  marginVertical: 10,
                  paddingVertical: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                }}
                key={index}
                >
                <Text
                  style={{
                    flex: 1,
                    color: '#000',
                    fontSize: 18,
                    fontWeight: '600',
                  }}>
                  {item}
                </Text>
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity
                    onPress={() => {
                      handlewishs(item);
                    }}
                    style={{marginHorizontal: 12}}>
                    <Text>🧡</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      handleDels(item);
                    }}>
                    <Text>❌</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })}

        <FlatList
          data={data.slice(currentIndex, currentIndex + 4)}
          renderItem={({item, index}) => (
            <View
              style={{
                paddingHorizontal: 10,
                borderRadius: 8,
                backgroundColor: '#ddd',
                marginVertical: 10,
                paddingVertical: 15,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
              keyExtractor={index}
              >
              <Text
                style={{
                  flex: 1,
                  color: '#000',
                  fontSize: 18,
                  fontWeight: '600',
                }}>
                {item}
              </Text>
              <View style={{flexDirection: 'row'}}>
                <TouchableOpacity
                  onPress={() => {
                    handlewish(item);
                  }}
                  style={{marginHorizontal: 12}}>
                  <Text>🖤</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    handleDel(item);
                  }}>
                  <Text>❌</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={item => item.id}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          marginVertical: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            if (currentIndex >= 1 || currentIndexes >= 1) {
              setCurrentIndexes(currentIndexes - 1);
              setCurrentIndex(currentIndex - 1);
            }
          }}>
          <Text>Prev</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            if (currentIndex <= data.length-1 || currentIndexes <= datas.length-1) {
                setCurrentIndexes(currentIndexes + 1);
                setCurrentIndex(currentIndex + 1);
              }
          }}>
          <Text>Next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  textinput: {
    borderWidth: 1,
    borderRadius: 30,
    fontSize: 20,
    color: 'red',
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
});
