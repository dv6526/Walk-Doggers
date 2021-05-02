import React from "react";

import {Image, StyleSheet, View, Text} from "react-native";
import {Card} from "react-native-elements";

interface IDogCardProps {
    name?: string;
    date?: string;
    distance?: string;
}

interface IDogCardState {
}

const styles = StyleSheet.create({
    dogCard: {
        width: 300,
        height: 300
    },
    dogName: {
        fontSize: 20
    },
    date: {

    },
    description: {
        paddingTop: 10,
        paddingBottom: 10,
        fontSize: 12
    },
    row: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    distance: {
        flex: 1
    },
    takeMeWalk: {
        color: 'cyan',
        alignContent: "flex-end",
    }
});

class DogCard extends React.Component<IDogCardProps, IDogCardState> {
    render() {
        return <Card>
            <Image
                style={styles.dogCard}
                source={{uri: 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=1200:*'}}
            />
            <Text style={styles.date}>{this.props.date}</Text>
            <Text style={styles.dogName}>{this.props.name}</Text>
            <Text style={styles.description}>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</Text>
            <View style={styles.row}>
                <Text style={styles.distance}>{this.props.distance}</Text>
                <Text style={styles.takeMeWalk}>Take me for a walk</Text>
            </View>
        </Card>
    }
}

export default DogCard;