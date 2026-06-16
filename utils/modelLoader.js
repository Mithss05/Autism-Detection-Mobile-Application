import * as ort from 'onnxruntime-react-native';
import * as FileSystem from 'expo-file-system';
import { Asset } from 'expo-asset';

// Load model from remote URL
export const loadRemoteModel = async (url) => {
  try {
    const session = await ort.InferenceSession.create(url);
    console.log('✅ ONNX model loaded successfully from remote URL');
    return session;
  } catch (error) {
    console.error('❌ Failed to load the ONNX model from URL:', error);
  }
};

// Load model from local assets
export const loadLocalModel = async () => {
  try {
    const localModelAsset = require('../assets/models/image_classification_model.onnx');
    const asset = await Asset.fromModule(localModelAsset).downloadAsync();

    const modelPath = `${FileSystem.documentDirectory}image_classification_model.onnx`;

    // Copy model to an accessible location if needed
    await FileSystem.copyAsync({
      from: asset.localUri,
      to: modelPath,
    });

    const session = await ort.InferenceSession.create(modelPath.replace('file://', ''));
    console.log('✅ ONNX model loaded successfully from local assets');
    return session;
  } catch (error) {
    console.error('❌ Failed to load the local ONNX model:', error);
  }
};

// Load model from base64 string
export const loadBase64Model = async (base64Model) => {
  try {
    const arrayBuffer = Buffer.from(base64Model, 'base64').buffer;
    const session = await ort.InferenceSession.create(arrayBuffer);
    console.log('✅ ONNX model loaded successfully from base64');
    return session;
  } catch (error) {
    console.error('❌ Failed to load the ONNX model from base64:', error);
  }
};

// Prepare input data
export const prepareInput = (inputData, inputDims) => {
  try {
    const inputTensor = new ort.Tensor('float32', inputData, [1, ...inputDims]);
    console.log('✅ Prepared input tensor:', inputTensor);
    return inputTensor;
  } catch (error) {
    console.error('❌ Error preparing input tensor:', error);
  }
};

// Run model inference
export const runInference = async (session, inputTensor) => {
  try {
    const outputs = await session.run({ input_name: inputTensor });
    console.log('✅ Model output:', outputs);
    return outputs;
  } catch (error) {
    console.error('❌ Error during inference:', error);
  }
};
