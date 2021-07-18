import React, { useEffect } from 'react';
import { View, FlatList, Text, SafeAreaView } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import PlayerHeader from 'src/components/header/player';
import GoalList from 'src/components/card/goal-list';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import PlayerActions from 'src/redux/player/Actions';
import { Player } from 'src/interfaces/Player';
// Theme
import styles from './style';

interface Props {
  navigation: StackNavigationProp<any, 'Player'>;
  route: RouteProp<any, 'Player'>;
}

const PlayerDetails: React.FC<Props> = ({ navigation, route }) => {
  const player: Player = route.params?.player;
  const club_id: number = route.params?.club_id;

  useEffect(() => {
    //dispatch(ClubActions.generateSquad(club.id));
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <PlayerHeader player={player} clubId={club_id} navigation={navigation} />
      <Text style={styles.title}>Premier League Playing Career</Text>
      <View style={styles.table}>
        <Text style={styles.tableText}>Season</Text>
        <Text style={styles.tableText}>Club</Text>
        <Text style={styles.tableText}>Goals</Text>
      </View>
      <FlatList
        style={{ flex: 1, padding: 20 }}
        data={player.teams}
        renderItem={({ item }) => <GoalList item={item} />}
        keyExtractor={(item) => `${item.club_id}${item.season}`}
      />
    </SafeAreaView>
  );
};
export default PlayerDetails;
