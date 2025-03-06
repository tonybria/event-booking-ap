import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const eventData = [
  { id: '1', title: 'Music Concert', date: 'Feb 10, 2025' },
  { id: '2', title: 'Art Exhibition', date: 'Feb 15, 2025' },
  { id: '3', title: 'Food Festival', date: 'Feb 20, 2025' },
];

const Schedule = () => {
  const [purchasedTickets, setPurchasedTickets] = useState([]);

  useEffect(() => {
    // Simulating fetching purchased tickets (since AsyncStorage isn't available in Snack)
    const boughtTickets = ['1', '3']; // Example: User has bought tickets for events with id 1 & 3
    const filteredEvents = eventData.filter((event) =>
      boughtTickets.includes(event.id)
    );
    setPurchasedTickets(filteredEvents);
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Your Event Schedule</Text>

      {purchasedTickets.length === 0 ? (
        <Text style={styles.noTickets}>No events scheduled yet.</Text>
      ) : (
        <FlatList
          data={purchasedTickets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.eventCard}>
              <Text style={styles.eventTitle}>{item.title}</Text>
              <Text style={styles.eventDate}>📅 {item.date}</Text>
            </View>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 15,
  },
  noTickets: {
    color: '#aaa',
    textAlign: 'center',
    fontSize: 16,
    marginTop: 20,
  },
  eventCard: {
    backgroundColor: '#1e1e1e',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 18,
    color: '#ff4d4d',
    fontWeight: 'bold',
  },
  eventDate: {
    fontSize: 14,
    color: '#ddd',
    marginTop: 5,
  },
});

export default Schedule;
