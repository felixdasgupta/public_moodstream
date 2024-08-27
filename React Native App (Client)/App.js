import "react-native-gesture-handler"
import { StyleSheet, Platform, Text } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import Colors from "./constants/colors"
import { useFonts } from "expo-font"
import { StatusBar } from "expo-status-bar"
import { useColorScheme } from "react-native"
import { TamaguiProvider, Theme, View, Image } from "tamagui"

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { textStyles } from "./constants/base"
import { Music, ListMusic } from "@tamagui/lucide-icons"

import MoodstreamContextWrapper from "./context"
import Login from "./components/login/Login"
import ControlScreen from "./screens/ControlScreen"
import LibraryScreen from "./screens/LibraryScreen"

import config from "./tamagui.config"
import { useLoginContext } from "./context/loginContext"
import { useHostContext } from "./context/hostContext"
import Profile from "./components/profile/Profile"

const AnimoImage = require("./assets/animo_dark.png")
const Tab = createBottomTabNavigator()

const Navigation = () => {
  const { spotifyAuth } = useLoginContext()
  const { userProfile } = useHostContext()

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          tabBarActiveTintColor: Colors.white,
          tabBarActiveBackgroundColor: Colors.light,
          tabBarInactiveTintColor: Colors.lightX,
          tabBarInactiveBackgroundColor: Colors.base,
          tabBarStyle: {
            backgroundColor: Colors.base,
            paddingHorizontal: 12,
            marginBottom: 12,
            height: Platform.OS === "ios" ? 100 : 70,
          },
          tabBarItemStyle: {
            padding: 8,
          },
          tabBarLabelStyle: {
            fontWeight: "500",
            fontSize: 14,
          },
          tabBarHideOnKeyboard: true,
          headerStyle: {
            backgroundColor: Colors.base,
            height: Platform.OS === "ios" ? 140 : 100,
          },
          headerTintColor: Colors.lightX,
          headerTitle: () => (
            <>
              <Text style={textStyles.headerText}>Animo's Moodstream</Text>
              <Text style={textStyles.subHeaderText}>COPPA Nomad</Text>
            </>
          ),
          headerTitleAlign: "left",
          headerRight: () => (
            <View style={{ flexDirection: "row" }}>
              {!spotifyAuth && <Login />}
              {userProfile && <Profile userProfile={userProfile} />}
            </View>
          ),
          headerRightContainerStyle: {
            paddingRight: 12,
          },
          headerLeft: () => (
            <Image style={styles.headerImage} source={AnimoImage} />
          ),
          headerLeftContainerStyle: {
            paddingLeft: 12,
          },
        }}
        sceneContainerStyle={{
          backgroundColor: Colors.darkX,
        }}
      >
        <Tab.Screen
          name='Control'
          component={ControlScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Music color={color} size={size} />
            ),
          }}
        ></Tab.Screen>
        <Tab.Screen
          name='Library'
          component={LibraryScreen}
          options={{
            tabBarIcon: ({ color, size }) => (
              <ListMusic color={color} size={size} />
            ),
          }}
        ></Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  )
}

export default function App() {
  const colorScheme = useColorScheme()

  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),
  })

  if (!loaded) {
    return null
  }

  return (
    <>
      <TamaguiProvider config={config}>
        <Theme name='dark'>
          <StatusBar style='light' />
          <MoodstreamContextWrapper>
            <Navigation />
          </MoodstreamContextWrapper>
        </Theme>
      </TamaguiProvider>
    </>
  )
}

const styles = StyleSheet.create({
  moodContainer: {
    flex: 1,
  },
  viewContainer: {
    flex: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  toggleContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 16,
    width: "100%",
    borderTopColor: Colors.lightX,
    borderTopWidth: 1,
  },
  headerImage: {
    width: 32,
    height: 45,
  },
  dangerButton: {
    backgroundColor: Colors.yellow,
    color: Colors.darkX,
    marginRight: 8,
  },
})
