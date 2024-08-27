import { Pressable, StyleSheet, Text } from "react-native"
import Colors from "../../constants/colors"
import { LinearGradient } from "expo-linear-gradient"
import { baseStyles } from "../../constants/base"

export default function LinearGradientButton({
  onPress,
  children,
  isActive,
  icon = () => null,
  buttonStyle = {},
}) {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressedContainer}
      onPress={onPress}
      android_ripple={{ color: Colors.base }}
    >
      <LinearGradient
        // Button Linear Gradient
        colors={[Colors.yellow, Colors.orange]}
        style={[styles.button, buttonStyle]}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 0 }}
      >
        {icon()}
        <Text style={styles.text}>{children}</Text>
      </LinearGradient>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  pressedContainer: {
    opacity: 0.7,
  },
  button: {
    ...baseStyles.center,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: Colors.button,
    borderRadius: 200,
    flexDirection: "row",
  },
  text: {
    fontSize: 12,
    color: Colors.white,
    textAlign: "center",
  },
})
