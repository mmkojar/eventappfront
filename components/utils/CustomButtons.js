import React from 'react'
import { View, StyleSheet} from 'react-native';
import { Button, withTheme } from 'react-native-paper';

function CustomButtons({theme,title,pressHandler}) {
    return (
        <View>            
             <Button mode="contained" labelStyle={{fontSize:16}} uppercase={false} style={styles.c_button} color={title == 'Logout' ? '#dc3545' : theme.colors.primary} onPress={pressHandler}>
                {title}
            </Button>
        </View>
    )
}

const styles = StyleSheet.create({
    c_button:{
        // alignSelf:'center',        
        paddingHorizontal:8,
        paddingVertical:3,
        borderRadius:20,
        fontWeight:900,                
    }
})

export default withTheme(CustomButtons)
