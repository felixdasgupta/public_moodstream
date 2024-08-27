import { Text, StyleSheet } from "react-native"
import Colors from "../../constants/colors"

const Header = ({ children, style }) => {
  return <Text style={[styles.headerText, style]}>{children}</Text>
}

const Subheader = ({ children, style }) => {
  return <Text style={[styles.subHeaderText, style]}>{children}</Text>
}

const styles = StyleSheet.create({
  headerText: {
    textAlign: "left",
    color: Colors.white,
    fontWeight: "600",
    fontSize: 44,
    lineHeight: 53,
    // fontFamily: 'Syne',
  },
  subHeaderText: {
    textAlign: "left",
    color: Colors.white,
    fontWeight: "500",
    fontSize: 18,
    lineHeight: 26,
    // fontFamily: 'Inter',
  },
})

export { Header, Subheader }
