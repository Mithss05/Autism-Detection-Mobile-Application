import uploadToCloudinary from './uploadToCloudinary';
import * as ImagePicker from 'expo-image-picker';
import { Camera } from 'expo-camera';

// Pick an image from the gallery
export const pickImageAndUpload = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    alert('❌ Permission to access gallery denied');
    return;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
  });

  if (!result.canceled) {
    const testImageUri = result.assets[0].uri;
    console.log('🖼️ Selected image URI:', testImageUri);
    await uploadImage(testImageUri);
  } else {
    console.log('❌ No image selected');
  }
};

// Capture an image with the camera
export const takePictureAndUpload = async (cameraRef) => {
  const { status } = await Camera.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    alert('❌ Permission to access camera denied');
    return;
  }

  if (cameraRef) {
    const photo = await cameraRef.takePictureAsync();
    const testImageUri = photo.uri;
    console.log('📸 Captured image URI:', testImageUri);
    await uploadImage(testImageUri);
  } else {
    console.log('❌ Camera ref is missing or not available');
  }
};

// Upload an already saved image
export const uploadSavedImage = async () => {
  const testImageUri = 'C:\my-project\Dataset\dataset\train\Autistic'; // Make sure this is a valid file path
  console.log('🖼️ Using saved image URI:', testImageUri);
  await uploadImage(testImageUri);
};

// Helper function to handle the upload
const uploadImage = async (fileUri) => {
  try {
    const uploadedUrl = await uploadToCloudinary(fileUri);
    if (uploadedUrl) {
      console.log('✅ Upload successful:', uploadedUrl);
    } else {
      console.log('❌ Upload failed');
    }
  } catch (error) {
    console.log('❌ Error uploading image:', error);
  }
};
