import tensorflow as tf
from tensorflow.keras.models import load_model

# Load the model
model_path = "model/autism_cnn_model.h5"
model = load_model(model_path)

# Summary of the model
model.summary()

# Check the input shape and output
print("Model input shape:", model.input_shape)
print("Model output shape:", model.output_shape)
