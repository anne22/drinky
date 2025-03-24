import AsyncStorage from '@react-native-async-storage/async-storage';
import { Calendar, toDateId } from "@marceloterreiro/flash-calendar";
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Modal, Pressable, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';

// Custom component to handle future dates
const FutureAwareCalendar = ({ currentMonth, calendarMonthId, theme, calendarActiveDateRanges, onCalendarDayPress }) => {
  // Check if this is the current month
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const isCurrentMonth = (
    currentMonth.getMonth() === month && 
    currentMonth.getFullYear() === year
  );
  
  // If not current month, just render the regular calendar
  if (!isCurrentMonth) {
    return (
      <Calendar
        calendarMonthId={calendarMonthId}
        theme={theme}
        calendarActiveDateRanges={calendarActiveDateRanges}
        onCalendarDayPress={onCalendarDayPress}
      />
    );
  }
  
  // For the current month, we'll just prevent selection of future dates
  // We can't style them differently with the current API limitations
  return (
    <Calendar
      calendarMonthId={calendarMonthId}
      theme={theme}
      calendarActiveDateRanges={calendarActiveDateRanges}
      onCalendarDayPress={(dateId) => {
        // Parse the date
        const dateParts = dateId.split('-');
        const clickedDate = new Date(
          parseInt(dateParts[0]), 
          parseInt(dateParts[1]) - 1, 
          parseInt(dateParts[2])
        );
        
        // Reset hours to ensure accurate date comparison
        const todayCopy = new Date();
        todayCopy.setHours(0, 0, 0, 0);
        
        // If it's a future date, don't allow selection
        if (clickedDate > todayCopy) {
          return; // Don't proceed with selection
        }
        
        // Otherwise, proceed with the original handler
        onCalendarDayPress(dateId);
      }}
    />
  );
};

const storeData = async (value) => {
  try {
    const jsonValue = JSON.stringify(value);
    console.log(jsonValue);
    await AsyncStorage.setItem('sober-dates', jsonValue);
  } catch (e) {
    // saving error
  }
};
const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('sober-dates');console.log(jsonValue);
    return jsonValue != null ? JSON.parse(jsonValue) : [];
  } catch (e) {
    // error reading value
  }
};
let selectedDates = new Set();

export default function App() {
  const [dates, setDates] = useState(new Set());
  const [currentdate, setcurrentdate] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false); 
  
  // Load data when component mounts
  useEffect(() => {
    const loadData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem('sober-dates');
        const loadedDates = jsonValue != null ? JSON.parse(jsonValue) : [];
        selectedDates = new Set(loadedDates);
        setDates(new Set(loadedDates));
      } catch (e) {
        console.error('Error loading data:', e);
      }
    };
    
    loadData();
  }, []);
  
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
    storeData(Array.from(selectedDates));
    setDates(new Set(selectedDates));
  }
  
  function handleClick(date) {
    setShowConfirmation(true);
    setcurrentdate(date);
  }

  function calculateSoberPercentage(monthDate) {
    // Get the total days in the month
    const year = monthDate.getFullYear();
    const month = monthDate.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    // Check if this is the current month
    const today = new Date();
    const isCurrentMonth = today.getMonth() === month && today.getFullYear() === year;
    
    // For current month, only count days that have passed
    const totalDaysToCount = isCurrentMonth ? today.getDate() : daysInMonth;
    
    // Count sober days in this month
    let soberDays = 0;
    for (let day = 1; day <= totalDaysToCount; day++) {
      const date = new Date(year, month, day);
      const dateId = toDateId(date);
      if (selectedDates.has(dateId)) {
        soberDays++;
      }
    }
    
    // Calculate percentage
    return Math.round((soberDays / totalDaysToCount) * 100);
  }

  function onDrank() {
    setShowConfirmation(false);
    if (selectedDates.has(currentdate)) {
      selectedDates.delete(currentdate);
    }
    storeData(Array.from(selectedDates));
    setDates(new Set(selectedDates));
  }

  let dateRanges = datesToRanges(dates);

  let months = []
  for (let i = 0; i < 12; i++) {
    let currentMonth = new Date();
    currentMonth.setDate(1);
    currentMonth.setMonth(currentMonth.getMonth() - i);
    let currentMonthId = toDateId(currentMonth);
    
    // Calculate sober percentage for this month
    const soberPercentage = calculateSoberPercentage(currentMonth);
    const monthName = currentMonth.toLocaleString('default', { month: 'long' });
    const year = currentMonth.getFullYear();
    
    // Create a custom theme for this month
    let monthTheme = JSON.parse(JSON.stringify(linearTheme)); // Deep clone
    
    // Special handling for the current month (i === 0)
    if (i === 0) {
      // Get today's date to identify future dates
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      // We need to disable the custom styling for future dates since we can't access the date within the style function
      // Instead, let's use a simpler approach to style all days in the current month consistently
      
      // No need to modify the idle style for future dates since we can't reliably determine them
      // Keep the original styling for all days in the current month
    }

    months.push(
      <View style={styles.calbox} key={currentMonthId}> 
        <View style={styles.statsContainer}>
          <Text style={styles.monthTitle}>{monthName} {year}</Text>
          <Text style={styles.statsText}>
            {soberPercentage}% Non-drinking Days
          </Text>
        </View>
        <FutureAwareCalendar
          currentMonth={currentMonth}
          calendarMonthId={currentMonthId}
          theme={linearTheme}
          calendarActiveDateRanges={dateRanges}
          onCalendarDayPress={handleClick}
        />
      </View>
    );
  }

  return (
    <ScrollView>
    <View style={styles.container}> 
    
      <Modal animationType="slide" transparent={true} visible={showConfirmation} >
      <View style={styles.centered}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>What type of day is it?</Text>
          <Pressable onPress={onSober}>
          <Text style={styles.soberbutton}>Did not drink</Text>
          </Pressable>
          <Pressable onPress={onDrank}>
          <Text style={styles.drankbutton}>Drank</Text>
          </Pressable>
        </View>
      </View>
      </Modal>

      {months}

      <StatusBar style="auto" />
    </View>
    </ScrollView>
  );
}

let linearTheme = {
  rowMonth: {
    content: {
      display: "none",
      height: 0,
      marginTop: 0,
      marginBottom: 0,
      padding: 0,
    }
  },itemDay: {
    idle: ({ isPressed, isWeekend }) => ({
      container: {
        backgroundColor: isPressed ? "transparent" : "#FE4A85",
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
        backgroundColor: "#1C9",
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
    paddingTop: 70,
  },
  calbox: {
    backgroundColor: '#41494a',
    marginTop: 0,
    paddingTop: 0,
    marginBottom: 40,
    marginLeft: 10,
    marginRight: 10,
  },
  centered: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  modal: {
    backgroundColor: 'lightgrey',
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
  statsContainer: {
    backgroundColor: '#2a3132',
    padding: 10,
    borderRadius: 8,
    marginBottom: -24,
    marginTop: 10,
    alignItems: 'center',
  },
  monthTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  statsText: {
    fontSize: 16,
    color: '#42d6b1',
    fontWeight: '600',
  },
});
