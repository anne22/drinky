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
    }
  },
};
    
let styles = StyleSheet.create({
  container: {
    backgroundColor: 'pink',
    paddingTop: 80,
  },
});
