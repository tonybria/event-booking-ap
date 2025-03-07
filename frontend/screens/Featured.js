import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions, Button } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons'; // Import Ionicons for the ticket icon

const { width } = Dimensions.get('window');

const eventData = [
  { id: '1', title: '🎵 Music Concert', description: 'Live music from top artists.', image: 'https://via.placeholder.com/300' },
  { id: '2', title: '🎨 Art Exhibition', description: 'Explore modern and classic art.', image: 'https://via.placeholder.com/300' },
  { id: '3', title: '🍽️ Food Festival', description: 'A taste of different cuisines.', image: 'https://via.placeholder.com/300' },
];

const Featured = ({ navigation }) => {
  const [activeTickets, setActiveTickets] = useState([]);

  const purchaseTicket = (event) => {
    setActiveTickets([...activeTickets, event]);
    alert(`Ticket purchased for ${event.title}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.header}>🌟 Featured Events</Text>
        <TouchableOpacity style={styles.ticketIcon} onPress={() => alert('Showing active tickets')}>
          <Ionicons name="ios-ticket" size={32} color="#fff" />
          {activeTickets.length > 0 && (
            <View style={styles.ticketCount}>
              <Text style={styles.ticketCountText}>{activeTickets.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
      <FlatList
        data={eventData}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => navigation.navigate('EventDetail', { event: item })}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <LinearGradient colors={['rgba(0,0,0,0.7)', 'transparent']} style={styles.overlay} />
            <View style={styles.textContainer}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.description}>{item.description}</Text>
              <Button title="Buy Ticket" onPress={() => purchaseTicket(item)} />
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
      {activeTickets.length > 0 && (
        <View style={styles.ticketsContainer}>
          <Text style={styles.ticketsHeader}>Active Tickets</Text>
          {activeTickets.map((ticket, index) => (
            <Text key={index} style={styles.ticketItem}>{ticket.title}</Text>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  header: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  ticketIcon: {
    position: 'relative',
  },
  ticketCount: {
    position: 'absolute',
    top: -10,
    right: -10,
    backgroundColor: 'red',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ticketCountText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  listContent: {
    paddingBottom: 20,
  },
  card: {
    width: width * 0.9,
    alignSelf: 'center',
    backgroundColor: '#222',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  image: {
    width: '100%',
    height: 180,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  textContainer: {
    padding: 12,
    backgroundColor: '#1e1e1e',
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
  },
  title: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  description: {
    color: '#aaa',
    fontSize: 14,
    marginTop: 5,
  },
  ticketsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#1e1e1e',
    borderRadius: 8,
  },
  ticketsHeader: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ticketItem: {
    color: '#aaa',
    fontSize: 16,
    marginVertical: 5,
  },
});

export default Featured;
