import * as React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import EditScreenInfo from '../components/EditScreenInfo';
import DogCard from "../components/DogCard";
import {View, Text} from "react-native";
import ExploreFilter from "../components/ExploreFilter";

export default function TabExplore() {
  let showFilter = false;

  return (
    <View style={styles.container}>
      <ExploreFilter showFilter={showFilter}/>
      <ScrollView>
        <DogCard name="Smol Husky Woofer" date="TUESDAY 6.4.2020" distance="1.8km"/>
        <DogCard name="Very Good Boy" date="TUESDAY 6.4.2020" distance="1.8km"/>
        <DogCard name="Snoop Dog" date="TUESDAY 6.4.2020" distance="1.8km"/>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
