import React, { useEffect, useState } from 'react';
import {
  View,
  ScrollView,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// Components
import Header from 'src/components/header';
import Grid from 'src/components/card/club-grid';
import GridLarge from 'src/components/card/club-grid-large';
import ClubList from 'src/components/card/club-list';
// Redux
import { useDispatch, useSelector } from 'react-redux';
import ClubActions from 'src/redux/club/Actions';
// Theme
import styles from './style';
import { Colors } from 'src/theme';

interface Props {}
enum Mode {
  List = 'list',
  Grid = 'grid',
  GridLarge = 'grid-large',
}

const Home: React.FC<Props> = ({}) => {
  const dispatch = useDispatch();
  const clubs = useSelector((state: any) => state.clubReducer.clubs);
  const [mode, setMode] = useState<Mode>(Mode.Grid);
  const [wasLarge, setWasLarge] = useState<boolean>(true);

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

  useEffect(() => {
    console.log(mode);
  }, [mode]);

  return (
    <View style={styles.container}>
      <Header />
      {/* View control : List - Grid - Large grid */}
      <View style={styles.bar}>
        <TouchableOpacity
          onPress={() => {
            setMode(Mode.List);
          }}>
          <FontAwesome
            name="list-ul"
            size={24}
            color={mode === Mode.List ? Colors.black : Colors.white}
            style={{ marginRight: 10 }}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => toggleGrid()}>
          <MaterialCommunityIcons
            name={!wasLarge ? 'grid-large' : 'grid'}
            size={24}
            color={mode !== Mode.List ? Colors.black : Colors.white}
          />
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.content}>
        {mode !== Mode.List ? (
          <FlatGrid
            itemDimension={itemDimension()}
            spacing={20}
            data={clubs}
            renderItem={({ item }) =>
              mode === Mode.Grid ? (
                <Grid item={item} />
              ) : (
                <GridLarge item={item} />
              )
            }
          />
        ) : (
          <FlatList
            style={{ flex: 1, margin: 20 }}
            data={clubs}
            renderItem={({ item }) => <ClubList item={item} />}
            keyExtractor={(item) => item.id.toString()}
          />
        )}
      </ScrollView>
    </View>
  );
};

export default Home;
