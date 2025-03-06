import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, FlatList, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const eventData = [
  {
    id: '1',
    title: 'Music Concert',
    description: 'Live music from top artists.',
    image: { uri: 'https://unsplash.com/photos/selective-focus-silhouette-photography-of-man-playing-red-lighted-dj-terminal-YrtFlrLo2DQ' },
  },
  {
    id: '2',
    title: 'Art Exhibition',
    description: 'Explore modern and classic art.',
    image: { uri: 'https://unsplash.com/photos/red-blue-and-white-flowers-5TK1F5VfdIk' },
  },
  {
    id: '3',
    title: 'Food Festival',
    description: 'A taste of different cuisines.',
    image: { uri: 'https://unsplash.com/photos/cooked-dish-on-gray-bowl--YHSwy6uqvk' },
  },
];

const Tickets = () => {
  const [purchasedTickets, setPurchasedTickets] = useState([]);

  useEffect(() => {
    const loadTickets = async () => {
      const tickets = await AsyncStorage.getItem('purchasedTickets');
      if (tickets) {
        const purchasedEventIds = JSON.parse(tickets);
        const boughtTickets = eventData.filter((event) =>
          purchasedEventIds.includes(event.id)
        );
        setPurchasedTickets(boughtTickets);
      }
    };
    loadTickets();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Tickets</Text>

      {purchasedTickets.length === 0 ? (
        <Text style={styles.noTicketsText}>No tickets purchased yet.</Text>
      ) : (
        <FlatList
          data={purchasedTickets}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.ticketCard}>
              <Image source={item.image} style={styles.ticketImage} />
              <View style={styles.ticketDetails}>
                <Text style={styles.ticketTitle}>{item.title}</Text>
                <Text style={styles.ticketDescription}>{item.description}</Text>
                <Text style={styles.ticketStatus}>✔ Ticket Confirmed</Text>
              </View>
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
    padding: 15,
  },
  header: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  noTicketsText: {
    color: '#888',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  ticketCard: {
    flexDirection: 'row',
    backgroundColor: '#1e1e1e',
    padding: 15,
    marginBottom: 15,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  ticketImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
  },
  ticketDetails: {
    flex: 1,
  },
  ticketTitle: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  ticketDescription: {
    color: '#bbb',
    fontSize: 14,
    marginTop: 5,
  },
  ticketStatus: {
    color: '#4CAF50',
    fontSize: 14,
    marginTop: 8,
    fontWeight: 'bold',
  },
});

export default Tickets;
