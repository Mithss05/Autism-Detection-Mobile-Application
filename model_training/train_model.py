import os
import tensorflow as tf
from keras.preprocessing import image_dataset_from_directory
from keras.models import Sequential
from keras.applications import MobileNetV2
from keras.layers import GlobalAveragePooling2D, Dense, Dropout
from keras.callbacks import EarlyStopping, ReduceLROnPlateau

# ✅ Step 1: Correct Dataset Path
BASE_DIR = r"C:\documents\ASD\my-project\Dataset\dataset\train"  # Update if needed

if not os.path.exists(BASE_DIR):
    print(f"\n❌ Dataset folder not found! Check your path: {BASE_DIR}")
    raise FileNotFoundError(f"❌ Error: Dataset folder '{BASE_DIR}' not found!")

print("\n✅ Dataset found! Proceeding with training...")

# ✅ Step 2: Detect Class Folder Names Dynamically
folder_names = os.listdir(BASE_DIR)
autistic_folder = next((f for f in folder_names if "autistic" in f.lower()), None)
non_autistic_folder = next((f for f in folder_names if "non" in f.lower()), None)

if not autistic_folder or not non_autistic_folder:
    print(f"❌ Error: One or both class folders are missing!")
    print(f"Detected folders in '{BASE_DIR}': {folder_names}")
    raise FileNotFoundError("❌ Dataset folders are incorrect!")

autistic_path = os.path.join(BASE_DIR, autistic_folder)
non_autistic_path = os.path.join(BASE_DIR, non_autistic_folder)

autistic_count = len(os.listdir(autistic_path))
non_autistic_count = len(os.listdir(non_autistic_path))

print(f"🔹 Autistic images: {autistic_count}")
print(f"🔹 Non-Autistic images: {non_autistic_count}")

# ✅ Step 3: Apply Class Weights to Balance Dataset
total_samples = autistic_count + non_autistic_count
class_weight = {
    0: max(1.0, total_samples / (2 * non_autistic_count)),  # Non-Autistic weight
    1: max(1.0, total_samples / (2 * autistic_count))       # Autistic weight
}

# ✅ Step 4: Load Data Efficiently
batch_size = 32
img_size = (224, 224)

train_dataset = image_dataset_from_directory(
    BASE_DIR,
    image_size=img_size,
    batch_size=batch_size,
    validation_split=0.2,
    subset="training",
    seed=42
)

val_dataset = image_dataset_from_directory(
    BASE_DIR,
    image_size=img_size,
    batch_size=batch_size,
    validation_split=0.2,
    subset="validation",
    seed=42
)

# ✅ Improve Performance by Prefetching
AUTOTUNE = tf.data.AUTOTUNE
train_dataset = train_dataset.prefetch(buffer_size=AUTOTUNE)
val_dataset = val_dataset.prefetch(buffer_size=AUTOTUNE)

# ✅ Step 5: Define Model
base_model = MobileNetV2(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

# ✅ Fine-tune first 100 layers
for layer in base_model.layers[:100]:  
    layer.trainable = False  

model = Sequential([
    base_model,
    GlobalAveragePooling2D(),
    Dense(256, activation='relu'),
    Dropout(0.5),
    Dense(1, activation='sigmoid')
])

# ✅ Step 6: Compile Model
model.compile(optimizer=tf.keras.optimizers.Adam(learning_rate=0.0001), 
              loss='binary_crossentropy', 
              metrics=['accuracy'])

# ✅ Step 7: Training Callbacks
early_stopping = EarlyStopping(monitor='val_loss', patience=5, restore_best_weights=True)
reduce_lr = ReduceLROnPlateau(monitor='val_loss', factor=0.2, patience=3, min_lr=1e-5)

# ✅ Step 8: Train Model
model.fit(
    train_dataset,
    validation_data=val_dataset,
    epochs=30,
    callbacks=[early_stopping, reduce_lr],
    class_weight=class_weight
)

# ✅ Step 9: Save Model in TensorFlow SavedModel Format
MODEL_DIR = "image_classification_model_tf"  # Folder for TensorFlow model
if not os.path.exists(MODEL_DIR):
    os.makedirs(MODEL_DIR)

model.save(MODEL_DIR, save_format="tf")  

print(f"\n✅ Model saved successfully in TensorFlow SavedModel format at: {MODEL_DIR} 🎉")
