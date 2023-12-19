import {
  View,
  Text,
  FlatList,
  Dimensions,
  Image,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';

const customWidth = Dimensions.get('window').width;

const Demo = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    let myHeaders = new Headers();
    myHeaders.append(
      'x-access-token',
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NDA5OTg0YTJkZDEyOTBlMGFkMTM3Y2QiLCJlbWFpbCI6InN1cGVyYWRtaW5AYWRtaW4uY29tIiwiaWF0IjoxNzAyOTY3MTc3LCJleHAiOjE3MDI5OTU5Nzd9.3LhJNscl6Hm8GL7kMXhyCnghDYNKFx50_xW523FXPKk',
    );

    let requestOptions = {
      method: 'GET',
      headers: myHeaders,
    };

    await fetch(
      'https://beyonddigitallab.com:4400/api/user/work-list',
      requestOptions,
    )
      .then(response => response.json())
      .then(result => {
        console.log(result);
        setData(result.data);
      })
      .catch(error => console.log('error', error));
  };

  const renderCard = ({item}) => {
    // console.log(item);
    return (
      <View style={[styles.cardContiner]}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginVertical:2
          }}>
          <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000', paddingLeft:10}}>
            Lorem Ipsum
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingHorizontal: 10,
              marginVertical:2
            }}>
            <Image
              source={require('../assets/icons/flag.png')}
              style={{height: 25, width: 25, resizeMode: 'contain'}}
            />
            <Text
              style={{...styles.commonTextStyle, fontSize: 14, paddingLeft: 5}}>
              {item.kilometer['$numberDecimal']}km
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Image
                source={require('../assets/icons/location.png')}
                style={{height: 25, width: 25, resizeMode: 'contain'}}
              />
              <Text>
                {item.pickupAddress.length > 15
                  ? item.pickupAddress.slice(0, 16)
                  : item.pickupAddress}
              </Text>
            </View>
            <View style={styles.date}>
              <Image
                source={require('../assets/icons/calendar.png')}
                style={{height: 25, width: 25, resizeMode: 'contain'}}
              />
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}>
                <Text>{item.date.slice(0, 10)}</Text>
                <View
                  style={{
                    width: 1.5,
                    height: 10,
                    backgroundColor: '#000',
                    marginHorizontal: 2,
                  }}
                />
                <Text> {item.date.slice(11, 16)}</Text>
              </View>
            </View>
          </View>
          <View style={styles.cardButton}>
            <Image
              source={require('../assets/icons/right-arrow.png')}
              style={{height: 15, width: 15, resizeMode: 'contain'}}
            />
            <Text>Programma</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: '#F7F7F7'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: 35,
          alignItems: 'center',
        }}>
        <Image
          source={require('../assets/icons/right-arrow.png')}
          style={{
            height: 15,
            width: 15,
            resizeMode: 'contain',
            marginLeft: 15,
          }}
        />
        <Text
          style={styles.headerText}>
          Demo Screen
        </Text>
        <View />
      </View>
      <FlatList
        data={data}
        keyExtractor={({item}) => item?._id.toString()}
        renderItem={renderCard}
      />
    </View>
  );
};

export default Demo;

const styles = StyleSheet.create({
  cardContiner: {
    width: customWidth - 20,
    marginVertical: 5,
    alignSelf: 'center',
    padding: 5,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E3E3E3',
  },
  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#000',
    width: customWidth / 3.5,
    justifyContent: 'space-between',
    borderRadius: 24,
    padding: 12,
  },
  commonTextStyle: {fontSize: 20, fontWeight: 'bold', color: '#000'},
  headerText:{
    fontWeight: '600',
    fontSize: 18,
    lineHeight: 24,
    textAlign: 'center',
    color: '#19201A',
  },
  date:{
    flexDirection: 'row', 
    borderRadius:24,
     borderWidth:0.5, 
     borderColor:"#000",
      margin:5,
      paddingHorizontal:5, paddingVertical:6
      }
});
