import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

function CalendarMonth({month}) {
  return <Text style={styles.monthTitle}>{month}</Text>
}

function CalendarDay({day}) {
  return <Text style={styles.day}>{day}</Text>
}

export default function App() {
  return (
    <View style={styles.container}>
      <CalendarMonth month={"January"}/> 
      <View style={styles.month}>
      <View style={styles.week}>
        <CalendarDay day={"1"}/>
        <CalendarDay day={"2"}/>
        <CalendarDay day={"3"}/>
        <CalendarDay day={"4"}/>
        <CalendarDay day={"5"}/>
        <CalendarDay day={"6"}/> 
        <CalendarDay day={"7"}/>
      </View>
      <View style={styles.week}>
        <CalendarDay day={"8"}/>
        <CalendarDay day={"9"}/>
        <CalendarDay day={"10"}/>
        <CalendarDay day={"11"}/>
        <CalendarDay day={"12"}/>
        <CalendarDay day={"13"}/> 
        <CalendarDay day={"14"}/>
      </View>
      <View style={styles.week}>
        <CalendarDay day={"16"}/>
        <CalendarDay day={"17"}/>
        <CalendarDay day={"18"}/>
        <CalendarDay day={"19"}/>
        <CalendarDay day={"20"}/>
        <CalendarDay day={"21"}/> 
        <CalendarDay day={"22"}/>
      </View>
      <View style={styles.week}>
        <CalendarDay day={"23"}/>
        <CalendarDay day={"24"}/>
        <CalendarDay day={"25"}/>
        <CalendarDay day={"26"}/>
        <CalendarDay day={"27"}/>
        <CalendarDay day={"28"}/> 
        <CalendarDay day={"29"}/>
      </View>
      <View style={styles.week}>
        <CalendarDay day={"30"}/>
        <CalendarDay day={"31"}/>
      </View>
      </View>
    
      <CalendarMonth month={"Feburary"}/> 
      <CalendarMonth month={"March"}/> 
      <CalendarMonth month={"April"}/> 
      <CalendarMonth month={"May"}/> 

      <StatusBar style="auto" />
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'start',
    padding: 80,
  },
  month: {
    marginTop: 0,
    maxWidth: 560,
    maxHeight: 250,
    flexDirection: 'column',
    margin: '20px auto',
  },
  week: {
    display: "flex",
    flexDirection: "row",
    height: 50,
  },
  day: {
    flex: 1,
    textAlign: 'center',
    padding: 20,
    margin: 2,
    maxHeight: 50,
    fontSize: 10,
    backgroundColor: 'lightgray',
  },
  monthTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  }
});
