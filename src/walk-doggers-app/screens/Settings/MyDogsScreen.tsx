import {
    Button,
    Dimensions,
    Image,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    View,
    FlatList,
    ListRenderItem
} from "react-native";
import * as React from "react";
import {BLUE, GRAY_0, GRAY_1, GRAY_3, LIGHT_BG, PRIMARY, tintColorLight} from "../../constants/Colors";
import {useEffect, useState, useContext} from "react";
import AuthContext from "../../navigation/AuthContext";
import {useIsFocused, useNavigation} from "@react-navigation/native";
import {BASE_API_URL} from "../../localConstants";

const dimensions = Dimensions.get('window');
const imgWidth = dimensions.width;
const styles = StyleSheet.create({
    miniDogCard: {
        flexDirection: "row",
        marginHorizontal: 20,
        marginBottom: 12,
        backgroundColor: "white",
        borderRadius: 5,
        shadowColor: "#000",
        shadowOffset: {
            width: 2,
            height: 2,
        },
        shadowOpacity: 0.10,
        shadowRadius: 7,
        elevation: 2,
    },
    subtitle: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 4,
        fontFamily: "roboto-500",
    },
    miniImage: {
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
        width: 130,
        height: 100,
        marginRight: 12,
        // flex: 1,
    },
    textContainer: {
        flex: 4,
    },
    editContainer: {
        flexDirection: "column",
        flexWrap: "wrap",
        justifyContent: "flex-end",
        textAlign: "right",
        paddingRight: 10,
        flex: 1,
    },
    editText: {
        color: BLUE,
        textTransform: "uppercase",
        alignContent: "flex-end",
        paddingBottom: 12,
        fontFamily: "red-hat-text-500",
    },
    description: {
        fontFamily: "red-hat-text",
    },
    scroller: {
        backgroundColor: GRAY_0,
        paddingTop: 20
    },
});

type Dog = {
    description: string;
    id: string,
    name: string;
    photo: string;
    size_category: number;
}


export default function MyDogsScreen() {
    const isFocused = useIsFocused();
    const {getJwt} = useContext(AuthContext);
    const navigation = useNavigation()

    const [dogs, setDogs] = useState<Object[]>([])

    const renderItem = ({item}) => (
        <MiniDogCard name={item.name} url={item.photo} description={item.description} id={item.id}
                     navigation={navigation} payload={item}/>
    );

    useEffect(() => {
        if (isFocused) {
            fetch(BASE_API_URL + '/dogs/', {
                method: "GET",
                headers: {
                    "accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': 'Bearer ' + getJwt()
                },
            }).then(async response => {
                if (response.ok) {
                    let json = await response.json();
                    setDogs(json)
                }
            })
        }
    }, [isFocused])

    return (
        <View style={{alignItems: "center", backgroundColor: LIGHT_BG, flex: 1}}>

            <FlatList
                data={dogs}
                renderItem={renderItem}
                keyExtractor={(item) => item.id}
                style={[{paddingTop: 20, backgroundColor: "white", width: 800, maxWidth: "100%"}]}
            />
        </View>
    );
}


function MiniDogCard(props: any) {
    return (
        <View style={styles.miniDogCard}>
            <Image
                style={styles.miniImage}
                source={{uri: props.url}}
                resizeMode={'cover'}
            />

            <View style={{justifyContent: 'flex-end', flexDirection: 'row', flex: 1}}>
                <View style={styles.textContainer}>
                    <Text style={styles.subtitle}>{props.name}</Text>
                    <Text style={styles.description}>{props.description}</Text>
                </View>

                <View style={styles.editContainer}>
                    <Pressable onPress={() => props.navigation.navigate('EditDogScreen', props.payload)}>
                        <Text style={styles.editText}>Edit</Text>
                    </Pressable>
                </View>
            </View>
        </View>
    )
}
