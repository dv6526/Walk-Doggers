import {useContext, useEffect, useState} from 'react';
import {ActivityIndicator, Alert, RefreshControl, StyleSheet} from 'react-native';
import * as React from 'react';
import MessageThread from '../components/MessageThread'
import {Text, View} from 'react-native';
import {ScrollView, TouchableHighlight, TouchableOpacity} from 'react-native-gesture-handler';
import CarouselCards from '../components/CarouselCards'
import AuthContext from '../navigation/AuthContext';
import {useIsFocused} from "@react-navigation/native";
import {BASE_API_URL} from "../localConstants";
import {PRIMARY} from "../constants/Colors";
import CarouselListings from "../components/CarouselCards";

type ConversationsType = {
    user: {
        id: string,
        last_name: string,
        image_url: string,
        first_name: string,
        description: string,
        email: string,
    },
    id_conv: string,
    last_message_text: string
}

async function getUserConvos(getJwt: Function) {

    let jwt = getJwt();

    const reqOptions = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + jwt,
            'Credentials': jwt
        },
    };


    const url = BASE_API_URL + '/conversations';

    let response = await fetch(url, reqOptions);
    const statusCode = response.status;
    switch (statusCode) {
        case 200:
            // successfully created dog
            break;
        case 403:
            Alert.alert("You need to be authorized to see listings")
            break;

        default:
            // TODO: notify user about error
            Alert.alert("Error occured upsi...")
            break;
    }

    console.log("response: ", response.status)
    return await response.json();
}

async function getConversations(getJwt: Function) {

    let jwt = getJwt();

    const reqOptions = {
        method: 'GET',
        headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + jwt,
            'Credentials': jwt
        },
    };


    const url = BASE_API_URL + '/inbox';

    let response = await fetch(url, reqOptions);
    const statusCode = response.status;
    switch (statusCode) {
        case 200:
            return await response.json();
            break;
        case 403:
            Alert.alert("You need to be authorized to see listings")
            break;

        default:
            // TODO: notify user about error
            Alert.alert("Error occured upsi...")
            break;
    }
    return []
}

export default function TabInbox({navigation}: any) {
    const [convos, setConvos] = useState<ConversationsType[]>([])
    const [error, setError] = useState<string | null>(null)
    const {getJwt} = useContext(AuthContext)
    const isFocused = useIsFocused();
    const [shownUsersIds, setShownUsersIds] = useState([]);
    const [filter, setFilter] = useState(false);
    const [refresh, setRefresh] = useState(true)
    const [refreshing, setRefreshing] = useState(false)


    const onPress = (convo: any) => {
        navigation.navigate('MessageScreen', convo)
    };

    useEffect(() => {
        if (isFocused) {
            setRefresh(!refresh)
            const getUserConversations = async () => {
                const conversations = await getConversations(getJwt);
                console.log("conversations :", conversations);
                if (!conversations.length || conversations == undefined)
                    setError("No Conversations");
                else if (conversations.length) setConvos(conversations);
                else setError("Error upsi...");
            };
            getUserConversations();
        }
    }, [isFocused])

    const onRefresh = () => {
        setRefreshing(true);
        const getUserConversations = async () => {
            const conversations = await getConversations(getJwt);
            console.log("conversations :", conversations);
            if (!conversations.length || conversations == undefined)
                setError("No Conversations");
            else if (conversations.length) setConvos(conversations);
            else setError("Error upsi...");
        };
        getUserConversations().then(() => setRefreshing(false));
    }


    const filterUsers = (userIds, filter) => {
        setFilter(filter);
        setShownUsersIds(userIds || [])
    }

    return (
        <View style={styles.containter}>
            {/*<CarouselCards inChat={false} filterUsers={filterUsers} refresh={refresh}/>*/}
            <ScrollView refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />
            }>
                <View style={{height: 120}}/>
                {convos.length ? convos.map(convo => {
                        if (!filter || shownUsersIds.includes(convo?.user?.id)) {
                            return <MessageThread
                                name={convo?.user?.first_name + " " + convo?.user?.last_name || "error"}
                                lastMessage={convo.last_message_text}
                                key={convo?.user?.id}
                                imageUrl={convo.user.image_url}
                                onPress={() => navigation.navigate('MessageScreen', convo.user)}
                            />
                        }
                    }
                ) : <View style={styles.activity}><ActivityIndicator/></View>}
            </ScrollView>

            <View style={{
                position: "absolute", shadowOpacity: 0.0, shadowRadius: 10, shadowColor: PRIMARY, shadowOffset: {
                    width: 2,
                    height: 3,
                },
            }}>
                <CarouselCards inChat={false} filterUsers={filterUsers} refresh={refresh}/>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containter: {
        backgroundColor: "white",
        flex: 1
    },
    activity: {
        flex: 1,
        width: "100%",
        justifyContent: "center",
        alignItems: 'center'
    }
});
