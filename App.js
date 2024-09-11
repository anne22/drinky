import { Calendar, toDateId, CalendarTheme } from "@marceloterreiro/flash-calendar";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';

const today = toDateId(new Date());

let selectedDates = new Set();

export default function App() {
  const [dates, setDates] = useState(new Set());
  const [currentdate, setcurrentdate] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); 
  
  function datesToRanges(dates) {
    return Array.from(selectedDates).map((date) => {
      return { startId: date, endId: date };
    });
  }

  function onSober() {
    setShowConfirmation(false);
    if (!selectedDates.has(currentdate)) {
   
      selectedDates.add(currentdate);
    }
    setDates(new Set(selectedDates));
  }
  
  function handleClick(date) {
    setShowConfirmation(true);
    setcurrentdate(date);
    
  }
  function onDrank() {
    setShowConfirmation(false);
    if (selectedDates.has(currentdate)) {
      selectedDates.delete(currentdate);
    }
    setDates(new Set(selectedDates));
  }
  let dateRanges = datesToRanges(dates);

  return (
    <ScrollView>
    <View style={styles.container}> 
    
      <Modal animationType="slide" transparent={true} visible={showConfirmation} >
      <View style={styles.centered}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>What type of day is it?</Text>
          <Pressable onPress={onSober}>
          <Text style={styles.soberbutton}>Sober</Text>
          </Pressable>
          <Pressable onPress={onDrank}>
          <Text style={styles.drankbutton}>Drank</Text>
          </Pressable>
        </View>
      </View>
      </Modal>

      <Calendar
        calendarMonthId={today}
        theme={linearTheme}
        calendarActiveDateRanges={dateRanges}
        onCalendarDayPress={handleClick}
        />
      <Calendar
        calendarMonthId={today}
        theme={linearTheme}
        calendarActiveDateRanges={dateRanges}
        onCalendarDayPress={handleClick}
        />
              <Calendar
        calendarMonthId={today}
        theme={linearTheme}
        calendarActiveDateRanges={dateRanges}
        onCalendarDayPress={handleClick}
        />
              <Calendar
        calendarMonthId={today}
        theme={linearTheme}
        calendarActiveDateRanges={dateRanges}
        onCalendarDayPress={handleClick}
        />
      <StatusBar style="auto" />
    </View></ScrollView>
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
      backgroundColor: "#a2a3a3",
      padding: 10,
      minHeight: 50,
      marginBottom: 20,
    }
  },itemDay: {
    idle: ({ isPressed, isWeekend }) => ({
      container: {
        backgroundColor: isPressed ? "darkgrey" : "transparent",
        borderRadius: 4,
      },
      content: {
        color: isWeekend && !isPressed ? "rgba(255, 255, 255, 0.5)" : "#ffffff",
      },
    }),
    today: ({ isPressed }) => ({
      container: {
        borderColor: "rgba(255, 255, 255, 0.5)",
        borderRadius: isPressed ? 4 : 30,
        backgroundColor: isPressed ? "darkgrey" : "transparent",
      },
      content: {
        color: isPressed ? "#ffffff" : "rgba(255, 255, 255, 0.5)",
      },
    }),
    active: ({ isEndOfRange, isStartOfRange }) => ({
      container: {
        backgroundColor: "#42d6b1",
        borderTopLeftRadius: isStartOfRange ? 4 : 0,
        borderBottomLeftRadius: isStartOfRange ? 4 : 0,
        borderTopRightRadius: isEndOfRange ? 4 : 0,
        borderBottomRightRadius: isEndOfRange ? 4 : 0,
      },
      content: {
        color: "#ffffff",
      },
    }),
  }
};
    
let styles = StyleSheet.create({
  container: {
    backgroundColor: '#41494a',
    height: '100%',
    paddingTop: 80,
  },
  centered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  modal: {
    backgroundColor: '#41494a',

    paddingTop: 80,
  },
  soberbutton: {
    backgroundColor: '#42d6b1', fontSize: 20,
    textAlign: 'center',
    color: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
  drankbutton: {
    backgroundColor: '#f0438b',
    fontSize: 20,
    textAlign: 'center',
    color: 'white',
    padding: 10,
    margin: 10,
    borderRadius: 10,
  },
});
