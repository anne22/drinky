import { Calendar, toDateId, CalendarTheme } from "@marceloterreiro/flash-calendar";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';

const today = toDateId(new Date());

let selectedDates = new Set();

export default function App() {
  const [dates, setDates] = useState(new Set());

  function datesToRanges(dates) {
    return Array.from(selectedDates).map((date) => {
      return { startId: date, endId: date };
    });
  }

  function handleClick(date) {
    if (selectedDates.has(date)) {
      selectedDates.delete(date);
    } else {
      selectedDates.add(date);
    }
    setDates(new Set(selectedDates));
  }

  let dateRanges = datesToRanges(dates);

  return (
    <View style={styles.container}>
      <Calendar
        calendarMonthId={today}
        theme={linearTheme}
        calendarActiveDateRanges={dateRanges}
        onCalendarDayPress={handleClick}
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
    paddingTop: 80,
  },
});
