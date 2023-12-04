import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { Button, Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { useDispatch, useSelector } from 'react-redux';
import { saveInfo } from '../../Slices/SaveInfoSlice';
import { getStorage, ref, uploadBytes } from "firebase/storage";

Octicons.loadFont();
MaterialCommunityIcons.loadFont();

const EditAccount = ( {navigation} ) => {
  const dispatch = useDispatch();
  const { firstName, lastName, phone, email } = useSelector(state => state.saveInfo);
  const { imagesState } = useSelector(state => state.images);

  const [newFirstName, setFirstName] = useState(firstName);
  const [newLastName, setLastName] = useState(lastName);
  const [newPhone, setPhone] = useState(phone);
  const [newEmail, setEmail] = useState(email);
  const [selectedImage, setSelectedImage] = useState(imagesState['profile']);

  const saveButton = () => {
    dispatch(saveInfo({ firstName: newFirstName, lastName: newLastName, phone: newPhone, email: newEmail, image: selectedImage }));
  }


  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setSelectedImage(pickerResult.assets[0].uri);
      const storage = getStorage();
      try {
        const response = await fetch(pickerResult.assets[0].uri);
        const blob = await response.blob();
        // Upload the blob to Firebase Storage
        const storageRef = ref(storage, 'profile');
        await uploadBytes(storageRef, blob);
    
        console.log('Image uploaded successfully!');
      } catch (error) {
        console.error('Error uploading image to Firebase:', error);
        throw error;
      }
    }
  };

    return (
      <SafeAreaView style={{flexDirection: 'column',}}>
        <View>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Profile', {})
            }>
            <Octicons style={editAccountStyles.x} name="x" size={24} />
          </TouchableOpacity>
          <Text style={editAccountStyles.title}>EditAccount</Text>
        </View>
        <View style={editAccountStyles.container1}>
          <View>
      {/* Button to open image picker */}
      <TouchableOpacity onPress={openImagePickerAsync}>
      <MaterialCommunityIcons style={editAccountStyles.pencil} name="pencil-circle" size={26} color={'#10451D'} />
      </TouchableOpacity>

      {/* Display the selected image */}

      {selectedImage ? (
        <Image source={{ uri: selectedImage }} style={editAccountStyles.placeholder}/>
      ) : (
        <MaterialCommunityIcons style={[editAccountStyles.placeholder, {left: 16}]} name="account-circle" size={97} color={'#208B3A'} />
      )}
    </View>
        </View>
        <View style={editAccountStyles.container2}>
          <View style={{justifyContent: 'center', paddingVertical: 32}}>
            <View style={editAccountStyles.rect}>
              <Text style={editAccountStyles.text}>First Name</Text>
              <TextInput
              style={editAccountStyles.editableText}
              value={newFirstName} // Bind the value of TextInput to the newFirstName state
              onChangeText={(newFirstName) => setFirstName(newFirstName)} // Update newFirstName state when TextInput changes
              ></TextInput>
            </View>
            <View style = {editAccountStyles.lineStyle}/>
            <View style={[editAccountStyles.rect]}>
              <Text style={editAccountStyles.text}>Last Name</Text>
              <TextInput
              style={editAccountStyles.editableText}
              value={newLastName} // Bind the value of TextInput to the newFirstName state
              onChangeText={(newLastName) => setLastName(newLastName)} // Update newFirstName state when TextInput changes
              ></TextInput>
            </View>
            <View style = {editAccountStyles.lineStyle}/>
            <View style={[editAccountStyles.rect]}>
              <Text style={editAccountStyles.text}>Phone Number</Text>
              <TextInput
              style={editAccountStyles.editableText}
              value={newPhone} // Bind the value of TextInput to the newFirstName state
              onChangeText={(newPhone) => setPhone(newPhone)} // Update newFirstName state when TextInput changes
              ></TextInput>
            </View>
            <View style = {editAccountStyles.lineStyle}/>
            <View style={[editAccountStyles.rect]}>
              <Text style={editAccountStyles.text}>Email</Text>
              <TextInput
              style={editAccountStyles.editableText}
              value={newEmail} // Bind the value of TextInput to the newFirstName state
              onChangeText={(newEmail) => setEmail(newEmail)} // Update newFirstName state when TextInput changes
              ></TextInput>
            </View>
            {/* <View style = {editAccountStyles.lineStyle}/>
            <View style={[editAccountStyles.rect]}>
              <Text style={editAccountStyles.text}>Password</Text>
              <TextInput 
              style={editAccountStyles.editableText}
              // placeholder="Password"
              placeholderTextColor="black"
              // placeholder=''
              secureTextEntry={true}>password</TextInput>
            </View> */}
            <View style = {editAccountStyles.lineStyle}/>
            <Button 
              title="Save"
              style={{top:10}}
              onPress={saveButton}>
            </Button>
          </View>
        </View>
        <View style={editAccountStyles.container3}></View>
      </SafeAreaView>
      
    );
};

const editAccountStyles = StyleSheet.create({
  lineStyle:{
    borderWidth: 0.5,
    borderColor: '#A39E9E',
    marginTop: -15,
    marginBottom: 5,
    backgroundColor: '#A39E9E'
  },
  title: {
    fontWeight: 500,
    fontSize: 17,
    left: 60,
    top: 10,
    position: 'absolute',
    lineHeight: 19.92
  },
  x: {
    left: 20,
    top: 7.96,
    position: 'absolute',
  },
  container1: {
    backgroundColor: '#B7EFC5',
    top: 93,
    height: 141,
    position: 'absolute',
    width: '100%',
    justifyContent: 'center'
  },
  placeholder: {
    width: 91,
    height: 91,
    borderRadius: 45,
    left: 21
  },
  pencil: {
    position: 'absolute',
    top: 75,
    left: 20,
  },
  container2: {
    backgroundColor: 'white',
    top: 234,
    height: 275,
    position: 'absolute',
    width: '100%',
  },
  rect: {
    height: 60,
    left: 34,
  },
  text: {
    color: '#A39E9E',
    fontWeight: 400,
    fontSize: 13,
    top: 0
  },
  editableText: {
    color: 'black',
    fontWeight: 'normal',
    fontSize: 15,
    top: 5,
  },
  container3: {
    backgroundColor: '#B7EFC5',
    position: 'absolute',
    top: 504,
    height: 445,
    width: '100%',
  }
});

export default EditAccount;