import React, { useState } from 'react';
import { View, StyleSheet, TextInput, Button, Image, TouchableOpacity, Text } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

const UserProfile = () => {
  const [user, setUser] = useState({
    name: 'Benny Berur',
    email: 'bennyberur@gmail.com',
    phone: '+2547363467',
    profilePicture: '', // Empty initially, we will set a placeholder image
  });

  const handleChangeProfilePicture = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: false,
      quality: 1,
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User canceled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setUser({ ...user, profilePicture: response.assets[0].uri });
      }
    });
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleChangeProfilePicture}>
        <Image
          source={{
            uri: user.profilePicture || 'https://www.w3schools.com/w3images/avatar2.png', // Placeholder image
          }}
          style={styles.profileImage}
        />
      </TouchableOpacity>

      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.details}>{user.email}</Text>
      <Text style={styles.details}>{user.phone}</Text>

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          value={user.name}
          onChangeText={(text) => setUser({ ...user, name: text })}
          placeholder="Update name"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          value={user.email}
          onChangeText={(text) => setUser({ ...user, email: text })}
          placeholder="Update email"
          keyboardType="email-address"
          placeholderTextColor="#aaa"
        />
        <TextInput
          style={styles.input}
          value={user.phone}
          onChangeText={(text) => setUser({ ...user, phone: text })}
          placeholder="Update phone"
          keyboardType="phone-pad"
          placeholderTextColor="#aaa"
        />
        <TouchableOpacity style={styles.updateButton} onPress={() => console.log('Profile updated!')}>
          <Text style={styles.updateButtonText}>Update Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c1c1e', // Dark mode friendly
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#007bff',
    marginBottom: 15,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 5,
  },
  details: {
    fontSize: 16,
    color: '#ccc',
    marginBottom: 5,
  },
  form: {
    width: '100%',
    marginTop: 20,
  },
  input: {
    height: 50,
    backgroundColor: '#2c2c2e',
    borderRadius: 10,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#fff',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#007bff',
  },
  updateButton: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserProfile;
