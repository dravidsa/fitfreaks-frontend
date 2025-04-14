import os
import requests
from PIL import Image
from io import BytesIO

# Base directory for images
base_dir = '../public/images/groups'

# Sample image URLs from Pexels (free to use)
images = {
    # Running Club
    'running-club-hero.jpg': 'https://images.pexels.com/photos/2774589/pexels-photo-2774589.jpeg',
    'beginners-running.jpg': 'https://images.pexels.com/photos/3253501/pexels-photo-3253501.jpeg',
    'marathon-training.jpg': 'https://images.pexels.com/photos/2403890/pexels-photo-2403890.jpeg',
    'mumbai-marathon.jpg': 'https://images.pexels.com/photos/2402777/pexels-photo-2402777.jpeg',
    'weekend-run.jpg': 'https://images.pexels.com/photos/1654498/pexels-photo-1654498.jpeg',
    'gallery1.jpg': 'https://images.pexels.com/photos/3621183/pexels-photo-3621183.jpeg',
    'gallery2.jpg': 'https://images.pexels.com/photos/4719931/pexels-photo-4719931.jpeg',
    'coach1.jpg': 'https://images.pexels.com/photos/3912516/pexels-photo-3912516.jpeg',
    'coach2.jpg': 'https://images.pexels.com/photos/3912953/pexels-photo-3912953.jpeg',
    
    # Cycling Club
    'cycling-club-hero.jpg': 'https://images.pexels.com/photos/5807576/pexels-photo-5807576.jpeg',
    'beginners-cycling.jpg': 'https://images.pexels.com/photos/2158963/pexels-photo-2158963.jpeg',
    'advanced-cycling.jpg': 'https://images.pexels.com/photos/2404253/pexels-photo-2404253.jpeg',
    'cycle-race.jpg': 'https://images.pexels.com/photos/2404251/pexels-photo-2404251.jpeg',
    'sunday-ride.jpg': 'https://images.pexels.com/photos/5807573/pexels-photo-5807573.jpeg',
    'cycling1.jpg': 'https://images.pexels.com/photos/5807572/pexels-photo-5807572.jpeg',
    'cycling2.jpg': 'https://images.pexels.com/photos/163491/bike-mountain-mountain-biking-trail-163491.jpeg',
    'coach3.jpg': 'https://images.pexels.com/photos/1854177/pexels-photo-1854177.jpeg',
}

def download_and_save_image(url, filename):
    try:
        response = requests.get(url)
        img = Image.open(BytesIO(response.content))
        
        # Convert to RGB if needed
        if img.mode in ('RGBA', 'P'):
            img = img.convert('RGB')
        
        # Resize if too large
        max_size = 1200
        if max(img.size) > max_size:
            ratio = max_size / max(img.size)
            new_size = tuple(int(dim * ratio) for dim in img.size)
            img = img.resize(new_size, Image.LANCZOS)
        
        # Save with quality optimization
        img.save(os.path.join(base_dir, filename), 'JPEG', quality=85, optimize=True)
        print(f'Successfully downloaded and saved {filename}')
    except Exception as e:
        print(f'Error downloading {filename}: {str(e)}')

def main():
    # Create directory if it doesn't exist
    os.makedirs(base_dir, exist_ok=True)
    
    # Download all images
    for filename, url in images.items():
        download_and_save_image(url, filename)

if __name__ == '__main__':
    main()
