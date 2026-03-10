import torch
import torch.nn as nn
from torchvision import models, transforms
from PIL import Image

# Load model
def load_model():
    model = models.efficientnet_b3(weights=None)
    model.classifier[1] = nn.Linear(
        model.classifier[1].in_features,
        1
    )

    checkpoint = torch.load("breast_cancer_model.pth", map_location="cpu")
    model.load_state_dict(checkpoint["model_state_dict"])

    model.eval()
    return model


model = load_model()

# Image preprocessing
transform = transforms.Compose([
    transforms.Resize((224,224)),
    transforms.ToTensor(),
])


# Prediction function
def predict(image: Image.Image):

    img = transform(image).unsqueeze(0)

    with torch.no_grad():
        output = model(img)
        probability = torch.sigmoid(output).item()

    if probability > 0.5:
        return {"prediction": "Malignant", "confidence": probability}
    else:
        return {"prediction": "Benign", "confidence": probability}