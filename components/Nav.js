import React,{useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer  } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/Home';
import LoginScreen from '../screens/Login';
import ProfileScreen from '../screens/Profile';
import AttendeeProfile from '../screens/AttendeeProfile';
import DelegatesScreen from '../screens/Delegates';
import ChatBoxScreen from '../screens/ChatBox';
import EventOverviewScreen from '../screens/Event_overview';
import ChatListScreen from '../screens/ChatList';
import NotificationScreen from '../screens/Notifications';
// import NotesScreen from '../screens/Notes';
import AgendaScreen from '../screens/Agenda';
import AgendaDetailScreen from '../screens/AgendaDetail';
import SpeakersScreen from '../screens/Speakers';
import SponsorsScreen from '../screens/Sponsors';
import ExhibitorsScreen from '../screens/Exhibitors';
import EventFeedScreen from '../screens/EventFeed';
import FAQScreen from '../screens/FAQ';
import SupportScreen from '../screens/Support';
import PollsScreen from '../screens/Polling';
import PollViewScreen from '../screens/PollView';
import ScanQR from '../screens/ScanQR';
import FacebookScreen from '../screens/Facebook';
import useThemeStyle from './utils/useThemeStyle';

const Stack = createStackNavigator();

const Nav = ({color, refer}) => {
     
  const [theme,GlobalStyle, themeoptions] = useThemeStyle();

  const authData = useSelector((state) => state.auth);
  const { isAuthenticated } = authData;
  
  return (
    // <SafeAreaView>    
    <NavigationContainer ref={refer}>
        { isAuthenticated ?  (              
            <Stack.Navigator initialRouteName='Home' 
                screenOptions={({route}) => ({
                animationEnabled:false,
                headerStyle: {
                    backgroundColor: color,
                },
                headerTintColor:themeoptions.title_color.name,
                headerTitleAlign:'center',
                headerTitleStyle: {
                    fontFamily:'VarelaRound-Regular'
                },
                cardStyle:{
                    backgroundColor:'#FFFFFF'
                }
            })}
            >
            <Stack.Screen name="Home" component={HomeScreen}
                options={{
                    title:themeoptions.app_title.name,
                }} 
            /> 
            <Stack.Screen name="Profile" component={ProfileScreen} 
                options={{
                title:'User Profile',                   
                }} />
            <Stack.Screen name="Delegates" component={DelegatesScreen} />
            <Stack.Screen name="AttendeeProfile" component={AttendeeProfile} 
                options={{
                title:'Attendee Profile',                   
                }} />
            <Stack.Screen name="ChatBox" component={ChatBoxScreen} />
            <Stack.Screen name="ChatList" component={ChatListScreen} 
                options={{
                title:'Chats',                   
                }}/>
            <Stack.Screen name="EventOverview" component={EventOverviewScreen} 
              options={{
               title:'Event Overview',                   
              }}/>
            <Stack.Screen name="Agenda" component={AgendaScreen} />
            <Stack.Screen name="AgendaDetail" component={AgendaDetailScreen} 
                options={{
                    title:'Agenda Detail',                   
                }}/>
            <Stack.Screen name="Speakers" component={SpeakersScreen} />
            <Stack.Screen name="Artist" component={SponsorsScreen} />
            <Stack.Screen name="Exhibitors" component={ExhibitorsScreen} />
            <Stack.Screen name="EventFeed" component={EventFeedScreen} />
            <Stack.Screen name="Notification" component={NotificationScreen} />
            {/* <Stack.Screen name="Notes" component={NotesScreen} /> */}
            <Stack.Screen name="FAQ" component={FAQScreen} />
            <Stack.Screen name="Support" component={SupportScreen} />
            <Stack.Screen name="Polling" component={PollsScreen} />
            <Stack.Screen name="PollView" component={PollViewScreen} />
            <Stack.Screen name="QRScan" component={ScanQR} 
            options={{
                title:'QR Scan',                   
            }}/>
            <Stack.Screen name="Facebook" component={FacebookScreen} />
            </Stack.Navigator>
            )
            :
            <Stack.Navigator initialRouteName='Login'>    
            <Stack.Screen name="Login" component={LoginScreen} 
                options={{
                    headerShown:false
                }}
            />
            </Stack.Navigator>
        }
    </NavigationContainer>
    // </SafeAreaView>
  );
};


export default Nav;
