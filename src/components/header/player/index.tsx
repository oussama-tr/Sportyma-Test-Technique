import React from 'react';
import { View, Image, Text, TouchableOpacity } from 'react-native';
// Components
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import PlayerActions from 'src/redux/player/Actions';
// Types
import { Player } from 'src/interfaces/Player';
import { StackNavigationProp } from '@react-navigation/stack';
// Helpers
import { getPlayerNumber } from 'src/helpers/Common';
// Theme
import styles from './style';
import { Colors, Images } from 'src/theme';

interface Props {
  player: Player;
  clubId: number;
  navigation: StackNavigationProp<any, 'Player'>;
}

enum Action {
  NEXT = 'Next',
  PREVIOUS = 'Previous',
}

const PlayerHeader: React.FC<Props> = ({ player, clubId, navigation }) => {
  const dispatch = useDispatch();
  const team = useSelector((state: any) => state.clubReducer.team);

  const changePlayer = (action: Action) => {
    dispatch(
      PlayerActions.changePlayer({
        to: action,
        team: team,
        player: player,
      }),
    );
  };

  return (
    <View style={styles.header}>
      <View
        style={{
          backgroundColor: Colors.primary,
          paddingTop: 20,
          flex: 1,
        }}>
        <View style={styles.topMask} />
        <View style={[styles.row, { justifyContent: 'space-between' }]}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.goBack();
            }}>
            <Ionicons name="md-return-up-back" size={35} color={Colors.white} />
          </TouchableOpacity>
          <View style={styles.row}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                changePlayer(Action.PREVIOUS);
              }}>
              <MaterialCommunityIcons
                name="arrow-left-bold"
                size={35}
                color={Colors.white}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.button}
              onPress={() => {
                changePlayer(Action.NEXT);
              }}>
              <MaterialCommunityIcons
                name="arrow-right-bold"
                size={35}
                color={Colors.white}
              />
            </TouchableOpacity>
          </View>
        </View>
        <Image source={Images.player} style={styles.image} />
        <View style={styles.mask}>
          <View>
            <Text style={styles.number}>
              {getPlayerNumber(player.teams, clubId)}
            </Text>
            <Text style={styles.name}>{player.name}</Text>
          </View>
          <View>
            <View style={styles.row}>
              <FontAwesome
                name="soccer-ball-o"
                size={22}
                color={Colors.black}
              />
              <Text style={[styles.text, { marginLeft: 10 }]}>
                {player.position}
              </Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.text}>{player.flag}</Text>
              <Text style={[styles.text, { marginLeft: 10 }]}>
                {player.nationality}
              </Text>
            </View>
            <Text
              style={
                styles.text
              }>{`${player.birthdate} ( ${player.age} )`}</Text>
            <Text style={styles.text}>{`${player.height} cm`}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default PlayerHeader;
