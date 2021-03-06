import * as React from 'react';
import {useContext, useEffect, useState} from "react";
import AuthContext from '../navigation/AuthContext';

import {
  Image,
  StyleSheet,
  View,
  Text,
  Dimensions,
  Pressable,
  TouchableHighlight,
  TouchableOpacity,
  Platform,
} from "react-native";
import {BLUE, GRAY_3, GRAY_0, GRAY_1, GRAY_2,ORANGE, RED} from "../constants/Colors";
import { useNavigation } from "@react-navigation/native";
import {Ionicons} from '@expo/vector-icons';
import {BASE_API_URL} from "../localConstants";


const dimensions = Dimensions.get("window");
const imgWidth = dimensions.width * 0.85;

const deleteListing = (getJwt: any, listing_id: any) => {
  console.log(getJwt() + " " + listing_id)
  fetch(BASE_API_URL + "/listings/" + listing_id, {
    method: "DELETE",
    headers: {
      accept: "application/json",
      "Content-Type": "application/json",
      Authorization: "Bearer " + getJwt(),
    },
  }).then(async (response) => {
    
  });
};

const Card = (props: any) => {
  const navigation = useNavigation();
  const {getJwt, isAdmin} = useContext(AuthContext);
  const {
    date,
    day,
    title,
    content,
    distance,
    imageUrl,
    author,
    callToActionText,
    time,
    modConfirmed,
    navigateTo,
    payload,
    blogId,
    listing_id
  } = props;
  return (
    <View style={styles.card}>
      <Image style={styles.image} source={{ uri: imageUrl }} />
      <View style={{ padding: 16 }}>
        <View style={{ justifyContent: "space-between", flexDirection: "row" }}>
          {author && (
            <View style={styles.fstRow}>
              <Text style={styles.date}>{author}</Text>
              {!modConfirmed && author && (
                <Text style={styles.wait}>WAITING FOR APPROVAL</Text>
              )}
            </View>
          )}

          {date && (
            <View style={styles.row}>
              <View style={styles.dateRow}>
                <Text style={styles.dateDay}>{day}</Text>
                <Text style={styles.date}>{date}</Text>
              </View>
              <Text style={styles.time}>{time}</Text>
            </View>
          )}
        </View>
        <Text style={styles.listingTitle}>{title}</Text>
        <Text style={styles.description}>{content}</Text>
        <View style={styles.imageRow}>
          <Text style={[styles.distance, styles.date]}>
            {distance && distance.toFixed(2) + " km"}
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate(navigateTo, payload)}
          >
            <Text style={styles.takeMeWalk}>{callToActionText}</Text>
          </TouchableOpacity>
        </View>
      </View>
      {isAdmin() && !blogId && <TouchableOpacity style={styles.delete} onPress={() => deleteListing(getJwt, listing_id)}>
        <Ionicons name="trash-outline" size={50} style={{color: RED}}></Ionicons>
      </TouchableOpacity>}
    </View>
  );
};
const styles = StyleSheet.create({
  listingTitle: {
    fontSize: 23,
    fontFamily: "red-hat-text-500",
    marginTop: 6,
  },
  date: {
    color: GRAY_1,
    fontFamily: "red-hat-text",
    fontSize: 15,
  },
  description: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 15,
    fontFamily: "red-hat-text",
  },
  imageRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    // flexWrap: "wrap",
  },
  distance: {
    // flex: 1
  },
  takeMeWalk: {
    color: BLUE,
    textTransform: "uppercase",
    alignContent: "flex-end",
    fontFamily: "red-hat-text-500",
  },
  card: {
    width: 800,
    maxWidth: "92%",
    backgroundColor: "#fff",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: {
      height: 2,
      width: 2,
    },
    elevation: 1,
    // flex: 1,
    // padding: 10,
    margin: 15,
    borderRadius: 12,
  },
  image: {
    width: "100%",
    height: Platform.OS === "web" ? 300 : undefined,
    aspectRatio: 4 / 3,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    // flex:1,
    // alignSelf: "center"
  },
  dateRow: {
    flexDirection: "row",
    // flex: 1
  },
  row: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateDay: {
    color: GRAY_2,
    fontFamily: "red-hat-text-500",
    fontSize: 15,
    textTransform: "uppercase",
    paddingRight: 5,
  },
  time: {
    fontFamily: "red-hat-text-500",
    fontSize: 15,
    color: GRAY_3,
  },
  fstRow: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
  },
  wait: {
    fontFamily: "red-hat-text-500",
    color: ORANGE,
  },
  delete: {
    position: "absolute",
    right:5,
    top:5
  }
});
export default Card;
