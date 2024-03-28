import React from 'react'
import { ActivityIndicator, StyleSheet, View, Text, Dimensions } from 'react-native'
import { WebView } from 'react-native-webview';

const Spinner = () => {
    return (
        <ActivityIndicator size="large" color='#ED3237' style={styles.activityContainer} />
    )
};

const Facebook = ({ route }) => {

    const win = Dimensions.get('window');
    const { user_id, qr_id, scan_by } = route.params;
    // console.log(user_id,qr_id, scan_by);
    return (
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Text>
                <WebView
                    style={{ flex: 1,width:win.width,height:400, backgroundColor: '#fff' }}
                    source={{ uri: 'https://info2ideas.com/event_app/select_event/'+user_id+'/'+qr_id+'/'+scan_by }}
                    renderLoading={Spinner}
                    startInLoadingState={true}
                    showsHorizontalScrollIndicator={false}
                    pullToRefreshEnabled={true}
                    bounces={true}
                    scalesPageToFit
                />
            </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    activityContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#fff',
        height: '100%',
        width: '100%'
    }
})
export default Facebook