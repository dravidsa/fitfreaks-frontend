#!/bin/bash

# Create routes directory if it doesn't exist
mkdir -p public/images/routes

# Download Sinhagad Fort images
curl -o public/images/routes/sinhagad-fort.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Sinhagad_Fort_Pune.jpg/1280px-Sinhagad_Fort_Pune.jpg"
curl -o public/images/routes/sinhagad-map.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5d/Sinhagad_trek_map.jpg/1280px-Sinhagad_trek_map.jpg"

# Download Bopdev Ghat images
curl -o public/images/routes/bopdev-ghat.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Bopdev_Ghat.jpg/1280px-Bopdev_Ghat.jpg"
curl -o public/images/routes/bopdev-map.jpg "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Bopdev_Ghat_trek_map.jpg/1280px-Bopdev_Ghat_trek_map.jpg"
