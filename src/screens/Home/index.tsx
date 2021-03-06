import React, { useEffect, useState } from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
} from 'react-native';
// Components
import { FlatGrid } from 'react-native-super-grid';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Header from 'src/components/header';
import Grid from 'src/components/card/club-grid';
import GridLarge from 'src/components/card/club-grid-large';
import ClubList from 'src/components/card/club-list';
import ClubModal from 'src/components/modal';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import ClubActions from 'src/redux/club/Actions';
// Types
import { League } from 'src/interfaces/Club';
import { StackNavigationProp } from '@react-navigation/stack';
// Theme
import styles from './style';
import { Colors } from 'src/theme';

interface Props {
  navigation: StackNavigationProp<any, 'Home'>;
}

enum Mode {
  List = 'list',
  Grid = 'grid',
  GridLarge = 'grid-large',
}

const Home: React.FC<Props> = ({ navigation }) => {
  const dispatch = useDispatch();
  const clubs = useSelector((state: any) => state.clubReducer.clubs);
  const [mode, setMode] = useState<Mode>(Mode.List);
  const [wasLarge, setWasLarge] = useState<boolean>(false);
  const [league] = useState<League>(League.PremierLeague);
  const [visible, setVisible] = useState<boolean>(false);

  const windowWidth = Dimensions.get('window').width;

  /* switch between grid and grid-large */
  const toggleGrid = () => {
    setWasLarge(!wasLarge);
    setMode(wasLarge ? Mode.Grid : Mode.GridLarge);
  };

  /* get item dimension for grid */
  const itemDimension = (): number => {
    return mode === Mode.Grid ? (windowWidth - 80) / 3 : (windowWidth - 60) / 2;
  };

  /* on mount : retrieve clubs from league */
  useEffect(() => {
    dispatch(ClubActions.getClubs({ league: league }));
  }, []);

  return (
    <View style={styles.container}>
      <Header league={league} />
      {/* View control : List - Grid - Large grid */}
      <View style={styles.bar}>
        <TouchableOpacity
          onPress={() => {
            setVisible(true);
          }}>
          <Ionicons name="add" size={32} color={Colors.black} />
        </TouchableOpacity>
        <View style={styles.row}>
          <TouchableOpacity
            onPress={() => {
              setMode(Mode.List);
            }}>
            <FontAwesome
              name="list-ul"
              size={24}
              color={mode === Mode.List ? Colors.black : Colors.grey}
              style={{ marginRight: 10 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => toggleGrid()}>
            <MaterialCommunityIcons
              name={!wasLarge ? 'grid-large' : 'grid'}
              size={25}
              color={mode !== Mode.List ? Colors.black : Colors.grey}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* View control : List - Grid - Large grid */}
      <SafeAreaView style={styles.content}>
        {mode !== Mode.List ? (
          <FlatGrid
            itemDimension={itemDimension()}
            spacing={20}
            data={clubs}
            renderItem={({ item }) =>
              mode === Mode.Grid ? (
                <Grid item={item} navigation={navigation} />
              ) : (
                <GridLarge item={item} navigation={navigation} />
              )
            }
          />
        ) : (
          <FlatList
            style={{ flex: 1, margin: 10, marginRight: 0 }}
            data={clubs}
            renderItem={({ item }) => (
              <ClubList item={item} navigation={navigation} />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </SafeAreaView>
      <ClubModal  visible={visible} hideModal={() => setVisible(false)}/>
    </View>
  );
};

export default Home;
