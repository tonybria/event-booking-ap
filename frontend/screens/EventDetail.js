import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, Alert, StyleSheet } from 'react-native';

const EventDetail = ({ route, navigation }) => {
  const event = route.params.event;
  const [bought, setBought] = useState(false);

  const buyTicket = () => {
    Alert.alert('Success', 'Ticket purchased successfully!', [
      { text: 'OK', onPress: () => navigation.navigate('Tickets', { event }) },
    ]);
    setBought(true);
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: event.image }} style={styles.image} />
      <Text style={styles.title}>{event.title}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <TouchableOpacity style={styles.button} onPress={buyTicket}>
        <Text style={styles.buttonText}>{bought ? 'Already Purchased' : 'Buy Ticket'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 15, alignItems: 'center' },
  image: { width: '100%', height: 200, borderRadius: 10, marginBottom: 10 },
  title: { fontSize: 22, fontWeight: 'bold', color: '#fff' },
  description: { color: '#ccc', marginTop: 5, textAlign: 'center' },
  button: { backgroundColor: '#ff4d4d', padding: 12, borderRadius: 5, marginTop: 15 },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default EventDetail;
