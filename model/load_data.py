import os
import cv2
import numpy as np
from sklearn.model_selection import train_test_split

# Paths to your training dataset
AUTISTIC_DIR = 'C:\\my-project\\Dataset\\dataset\\train\\Autistic'
NON_AUTISTIC_DIR = 'C:\\my-project\\Dataset\\dataset\\train\\Non_Autistic'


# Image size for resizing
IMG_SIZE = 128

def load_data():
    data = []
    labels = []

    # Loop through both folders and label them
    for category, label in [(AUTISTIC_DIR, 1), (NON_AUTISTIC_DIR, 0)]:
        for filename in os.listdir(category):
            img_path = os.path.join(category, filename)
            image = cv2.imread(img_path)
            if image is not None:
                image = cv2.resize(image, (IMG_SIZE, IMG_SIZE))  # Resize image
                image = image / 255.0  # Normalize to 0-1
                data.append(image)
                labels.append(label)

    return np.array(data), np.array(labels)

# Load the data
X, y = load_data()

# Split into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"Training data shape: {X_train.shape}")
print(f"Test data shape: {X_test.shape}")
