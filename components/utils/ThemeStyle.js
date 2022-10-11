import { configureFonts, DefaultTheme } from 'react-native-paper';
import { Platform } from 'react-native';

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
  
export const theme = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
        ...DefaultTheme.colors,
        primary: '#1C75BC',
        accent: '#e6e7e8',
    },
    fonts: configureFonts(fontConfig),
};