import { View, Animated, StyleSheet } from "react-native"
import Colors from "../../constants/colors"
import { Ionicons } from "@expo/vector-icons"
import { BoldMenuLabel, SubMenuText } from "../menu/MenuText"
import { useEffect, useRef } from "react"

const FloatingAlert = ({ icon, alert, description, children }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current // Initial value for opacity: 0

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start()
  }, [fadeAnim])

  return (
    <Animated.View style={{ ...styles.outerContainer, opacity: fadeAnim }}>
      <View style={[styles.innerContainer, styles.left]}>
        <Ionicons
          name={icon}
          size={48}
          color={Colors.light}
          style={styles.iconStyle}
        />
        <View style={[styles.textContainer]}>
          <BoldMenuLabel>{alert}</BoldMenuLabel>
          <SubMenuText>{description}</SubMenuText>
        </View>
      </View>
      <View style={[styles.innerContainer, styles.right]}>{children}</View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: Colors.button,
    marginBottom: 16,
    padding: 16,
    paddingVertical: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 4,
    position: "absolute",
    bottom: 0,
    marginHorizontal: 12,
  },
  innerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  left: {
    flex: 3,
    justifyContent: "flex-start",
  },
  right: {
    flex: 2,
    justifyContent: "flex-end",
  },
  iconStyle: {
    marginRight: 4,
  },
  textContainer: {
    flex: 1,
    justifyContent: "space-between",
  },
  miniText: {
    marginRight: 12,
  },
})

export default FloatingAlert
