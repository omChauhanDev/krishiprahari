import sys
import pickle
from PIL import Image
import numpy as np
import os

# Suppress TensorFlow logging
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

# Load the model
with open('model/cnn_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Define or load class labels
class_labels = ['Early Blight', 'Healthy', 'Late Blight'] # Replace with your actual class labels

def preprocess_image(image_path):
    img = Image.open(image_path)
    img = img.resize((256, 256)) # Resize to expected input size
    img_array = np.array(img) / 255.0 # Normalize the image
    if img_array.ndim == 2: # Convert grayscale to RGB if necessary
        img_array = np.stack([img_array] * 3, axis=-1)
    return img_array

def predict(image_path):
    processed_image = preprocess_image(image_path)
    processed_image = np.expand_dims(processed_image, axis=0)
    prediction = model.predict(processed_image, verbose=0)  # Set verbose=0 to suppress progress bar
    class_index = np.argmax(prediction)
    class_label = class_labels[class_index]
    return class_label

if __name__ == "__main__":
    image_path = sys.argv[1]
    result = predict(image_path)
    print(result, end='')  # Print without newline
    sys.stdout.flush()  # Ensure output is flushed