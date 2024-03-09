import React from 'react'
import { ActivityIndicator,StyleSheet, View, Text } from 'react-native'
import { WebView } from 'react-native-webview';

const Spinner = () => {
    return (
        <ActivityIndicator size="large" color='#ED3237'  style={styles.activityContainer}/>
    )    
};


const Facebook = () => {
  return (
    <View style={{flex:1,justifyContent:'center'}}>
        <Text>
            <WebView 
                style={{ flex:1,height: 500, width: 380,marginHorizontal:10,backgroundColor:'#000' }}
                source={{ uri: 'https://www.facebook.com/andrewismusic/posts/451971596293956' }} 
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