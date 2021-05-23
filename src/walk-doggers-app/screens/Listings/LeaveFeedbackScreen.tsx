import React, {useContext} from "react";
import {ScrollView, View, Text, Image, StyleSheet, Platform, Dimensions} from "react-native";
import MessageThread from "../../components/MessageThread";
import {GRAY_0, GRAY_2, LIGHT_BG, LIGHT_BG2, ORANGE, PINKISH_WHITE, PRIMARY, YELLOW} from "../../constants/Colors";
import ButtonCustom from "../../components/ButtonCustom";
import {Rating} from "react-native-elements";
import {BASE_API_URL} from "../../localConstants";
import AuthContext from "../../navigation/AuthContext";

const scrWidth = Dimensions.get('window').width;

let ratingValue = -1;

export default function LeaveFeedbackScreen({navigation, route}: any){
    const listing = route.params.listing;
    const author = listing.author;
    const {getJwt, getRoles} = useContext(AuthContext);
    //console.log(author);

    console.log(listing);

    const onPressLeaveFeedback = () => {
        if (ratingValue > -1){
            let reqBody = {"listing_id": listing.id, "rating": ratingValue}
            const jwt = getJwt();
            fetch(BASE_API_URL + '/ratings', {
                method: "POST",
                headers: {
                    "accept": "application/json",
                    'Authorization': 'Bearer ' + jwt
                },
                body: JSON.stringify(reqBody)
            }).then(async response => {
                if (response.ok) {
                    navigation.goBack();
                } else {
                }
            }).catch(e => {
                console.log(e);
            })
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageRow}>
                <Image source={{uri: author.image_url}} style={styles.image}/>
                <View style={styles.textContainer}>
                    <View style={{flexDirection: "column", justifyContent: "space-between"}}>
                        <Text style={styles.name}>{author.first_name} {author.last_name}</Text>
                        <Text style={styles.description}>{author.description}</Text>
                    </View>
                </View>
            </View>

            <Text style={styles.rateText}>Rate {author.first_name} {author.last_name}</Text>

            <Rating
                style={styles.rating}
                type='custom'
                ratingCount={5}
                startingValue={0}
                imageSize={40}
                readonly={false}
                ratingBackgroundColor={GRAY_2}
                ratingColor={YELLOW}
                tintColor={LIGHT_BG2}
                onFinishRating={(value) => ratingValue = value}
            />

            <View style={{flexDirection: "row", flex: 1, width: scrWidth * 0.7, }}>
                <ButtonCustom text={'Submit feedback'} color={'purple'} style={{ flex: 1, marginTop: 50, }} onPress={onPressLeaveFeedback} />;
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    imageRow: {
        flexDirection: 'row',
        alignItems: 'center',
        flex: 2,
        paddingHorizontal: 20,
    },
    rating: {
        flex: 2,
    },
    image: {
        height: 50,
        width: 50,
        borderRadius: 35
    },
    name: {
        // fontFamily: "roboto",
        fontWeight: Platform.OS === 'android' ? "bold" : "600",
        fontSize: 17,
        // marginBottom: 2
    },
    rateText: {
        flex: 1,
        fontWeight: Platform.OS === 'android' ? "bold" : "600",
        fontSize: 17,
    },
    container: {
        flexDirection: "column",
        flex: 1,
        alignItems: "center",
        justifyContent: "space-between"
    },
    textContainer: {
        paddingLeft: 12,
        flexDirection: "column",
        justifyContent: "center",
        height: 70,
        flex: 1,
    },
    description: {

    }
})
