import sys
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image

# Parse arguments
img_path = sys.argv[1]
model_path = sys.argv[2]

# Load the trained model
model = load_model(model_path)

# Load and preprocess the image
img = image.load_img(img_path, target_size=(224, 224))  # Adjust target_size if needed
img_array = image.img_to_array(img)
img_array = np.expand_dims(img_array, axis=0)
img_array = img_array / 255.0  # Normalize if needed

# Make prediction
predictions = model.predict(img_array)

# Class labels for your model
class_labels = [
    'Apple___Cedar_apple_rust', 'Apple___healthy',
    'Corn_(maize)___Common_rust_', 'Corn_(maize)___Northern_Leaf_Blight',
    'Pepper,_bell___Bacterial_spot', 'Pepper,_bell___healthy'
]

# Get the index of the highest prediction probability
predicted_class_index = np.argmax(predictions[0])
predicted_class_label = class_labels[predicted_class_index]

# Print the prediction
print(f"Predicted class: {predicted_class_label} (Index: {predicted_class_index})")
sys.stdout.flush()