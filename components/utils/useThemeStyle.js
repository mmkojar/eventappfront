import { useEffect } from "react";
import { StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getSettings } from "../redux/actions/themeActions";
import { configureFonts, DefaultTheme } from 'react-native-paper';
import { Platform } from 'react-native';

const useThemeStyle = () => {        
    
    const dispatch = useDispatch();
    const themeoptions = useSelector((state) => state.theme.settings);

    useEffect(() => {  
        const settingInterval = setInterval(() => {            
            dispatch(getSettings());
        }, 2000);

        return () => {
            clearInterval(settingInterval);
        }
        
    }, [dispatch])

    const fontConfig = {
        ios: {
          regular: {
            fontFamily: Platform.OS == 'ios' ?  'FontAwesome' : 'VarelaRound-Regular',
            fontWeight: 'normal',
          }
        },
        android: {
          regular: {
            fontFamily: Platform.OS == 'ios' ?  'FontAwesome' : 'VarelaRound-Regular',
            fontWeight: 'normal',
          },
        }
    };

    const theme = {
  
        ...DefaultTheme,
        roundness: 2,
        colors: {
            ...DefaultTheme.colors,
            primary: themeoptions.color,
            accent: '#e6e7e8',
        },
        fonts: configureFonts(fontConfig),
    };
    
    const GlobalStyle = StyleSheet.create({
        primarycolor:{
            color:theme.colors.primary
        },
        secondarycolor:{
            color:theme.colors.accent
        },
        borderStyle:{
            borderColor:theme.colors.primary,
            borderWidth:0.6,
            borderRadius:6,
        },
        homeIconText :{
            color:theme.colors.primary,
            marginTop:12,
            fontSize:15,
            textAlign:'center',
        },
        container: {
            flex:1,
            marginVertical:6,
        },
        card:{
            marginHorizontal:4,
            marginBottom:10,
            borderWidth:0.6,
            borderColor:theme.colors.primary,
            borderRadius:6,
        },
        cardTitle:{        
            backgroundColor:theme.colors.accent,
            marginHorizontal:8,
            borderRadius:50,
            marginBottom:10,
            minHeight:60
        },
        topContent:{        
            backgroundColor:theme.colors.primary,
            marginHorizontal:8,
            minHeight:50,
            borderTopLeftRadius:20,
            borderTopRightRadius:20
        },
        carContent:{
            paddingHorizontal:4,
        },
        bottomContent:{
            paddingBottom:10,
            marginHorizontal:8,
            backgroundColor:theme.colors.accent,
            borderBottomLeftRadius:20,
            borderBottomRightRadius:20
        },
        avatar:{
            height: 100,
            width:100,
            alignSelf:'center',
            borderRadius:50,
            marginTop:10,
        },
        layoutPara:{
            color:theme.colors.primary,
            textAlign:'center',
            marginBottom:0,
        },
        textinput:{
            height: 55,        
            borderColor:theme.colors.primary,
            color:theme.colors.primary,
            fontSize:17,
            borderWidth: 0.8,
            borderRadius:10,
            padding: 16,
            fontFamily:'VarelaRound-Regular'
        },
        customFont:{
            fontFamily:'VarelaRound-Regular'
        }
    })

    return [
        theme, GlobalStyle, themeoptions
    ];
};
  
export default useThemeStyle;