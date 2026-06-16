import tensorflow as tf
import tf2onnx
import onnx

# Load your Keras model
print("Loading the Keras model...")
model = tf.keras.models.load_model(r'C:\my-project\model\autism_cnn_model.h5')

# Manually specify output names if necessary
model._name = 'model'  # Give a name to the model to avoid potential issues

# Define the input signature based on the input shape of the model
input_signature = [tf.TensorSpec([None, 224, 224, 3], tf.float32)]  # Adjust the shape if necessary

# Convert the model to ONNX format using tf2onnx
print("Converting the Keras model to ONNX format...")
onnx_model = tf2onnx.convert.from_keras(model, input_signature=input_signature)

# Save the ONNX model
onnx_save_path = "C:/my-project/model/autism_cnn_model.onnx"
print(f"Saving the ONNX model to {onnx_save_path}...")
onnx.save_model(onnx_model, onnx_save_path)

print(f"Model successfully converted and saved as {onnx_save_path}!")
