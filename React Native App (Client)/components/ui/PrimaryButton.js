import { Pressable, StyleSheet, Text, View } from "react-native"
import { baseStyles } from "../../constants/base"
import Colors from "../../constants/colors"

export default function PrimaryButton({
  onPress,
  children,
  isActive,
  isDisabled,
  icon = () => null,
  buttonStyle,
}) {
  return (
    <Pressable
      style={({ pressed }) => pressed && styles.pressedContainer}
      onPress={onPress}
      disabled={isDisabled}
      android_ripple={{ color: Colors.base }}
    >
      <View
        style={
          isDisabled
            ? [styles.button, buttonStyle, styles.buttonDisabled]
            : [styles.button, buttonStyle]
        }
        active={isActive}
      >
        {icon()}
        <Text style={styles.text}>{children}</Text>
      </View>
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
  buttonDisabled: {
    opacity: 0.5,
    pointerEvents: "none",
  },
  text: {
    fontSize: 12,
    color: Colors.white,
    textAlign: "center",
  },
})
