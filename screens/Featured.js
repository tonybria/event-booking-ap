import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const eventData = [
  { id: '1', title: '🎵 Music Concert', description: 'Live music from top artists.', image: 'https://via.placeholder.com/300' },
  { id: '2', title: '🎨 Art Exhibition', description: 'Explore modern and classic art.', image: 'https://via.placeholder.com/300' },
  { id: '3', title: '🍽️ Food Festival', description: 'A taste of different cuisines.', image: 'https://via.placeholder.com/300' },
];

const Featured = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>🌟 Featured Events</Text>
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
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
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
  header: {
    fontSize: 26,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 15,
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
});

export default Featured;
