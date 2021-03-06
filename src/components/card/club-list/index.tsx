import React from 'react';
import {
  View,
  Image,
  Text,
  ImageBackground,
  TouchableOpacity,
} from 'react-native';
// Types
import { Club } from 'src/interfaces/Club';
import { StackNavigationProp } from '@react-navigation/stack';
// Theme
import styles from './style';
import { Images } from 'src/theme';

interface Props {
  item: Club;
  navigation: StackNavigationProp<any, 'Home'>;
}

const ClubList: React.FC<Props> = ({ item, navigation }) => {
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('Club', { club: item })}>
      <ImageBackground
        imageStyle={{ borderRadius: 16 }}
        style={styles.container}
        source={
          item.stadiumUri
            ? { uri: item.stadiumUri }
            : Images[item.stadium.replace(/\s+/g, '_')]
        }>
        <View style={styles.row}>
          <View style={styles.logoContainer}>
            <Image
              style={styles.logo}
              source={
                item.stadiumUri
                  ? { uri: item.clubUri }
                  : Images[item.name.replace(/\s+/g, '_')]
              }
            />
          </View>
          <Text style={styles.boldText}>{item.name}</Text>
        </View>
        <Text style={styles.mediumText}>{item.stadium}</Text>
        {item?.clubUri && <Image source={Images.new} style={styles.new} />}
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default ClubList;
