import { Calendar, toDateId, CalendarTheme } from "@marceloterreiro/flash-calendar";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

const today = toDateId(new Date());

export default function App() {
  return (
    <View style={styles.container}>
      <Calendar
        calendarMonthId={today}
        theme={linearTheme}
        />
      <StatusBar style="auto" />
    </View>
  );
}

let linearTheme = {
  rowMonth: {
    content: {
      textAlign: "center",
      color: "black",
      fontWeight: "700",
      textDecorationLine: "underline",
      fontSize: 20,
    }
  },
};
    
let styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    paddingTop: 80,
  },
  
});
