import { Text, StyleSheet } from "react-native"
import Colors from "../../constants/colors"

const BoldLabel = ({ children, style }) => {
  return <Text style={[styles.boldLabel, style]}>{children}</Text>
}

const RegularText = ({ children, style }) => {
  return <Text style={[styles.regular, style]}>{children}</Text>
}

const styles = StyleSheet.create({
  boldLabel: {
    textAlign: "left",
    color: Colors.white,
    fontWeight: "700",
    fontSize: 24,
    lineHeight: 29,
    // fontFamily: 'Syne',
  },
  regular: {
    textAlign: "left",
    color: Colors.white,
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 26,
    // fontFamily: 'Inter',
  },
})

export { BoldLabel, RegularText }
