import React, { useState } from 'react';

function App(){
  const [image, setImage] = useState(null);
  const [fileName, setFileName] = useState('');
  const [error, setError] = useState('');

  // Handle the image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/jpeg') {
      setFileName(file.name);  // Extract file name from the uploaded image
      setImage(null);  // Clear any previous error or image
      setError('');

      // Log the file name and load corresponding image from public/output
      console.log(file.name);
      loadImageFromPublicFolder(file.name);
    } else {
      alert('Please upload a valid .jpg image');
    }
  };

  // Load the image from public/output folder based on uploaded file name
  const loadImageFromPublicFolder = (uploadedFileName) => {
    // Construct the path to the image inside the public/output folder
    const imagePath = `/output/${uploadedFileName}`;
    
    // Check if the image exists by trying to load it
    const img = new Image();
    img.onload = () => {
      setImage(imagePath); // If image loads, display it
    };
    img.onerror = () => {
      setError('Image not found in the output folder');
      setImage(null);  // Clear any previously set image
    };
    img.src = imagePath;  // Try to load the image
  };

  return (
    <div>
      <h1>Upload and Get Detected Image</h1>

      {/* Input to upload image */}
      <input
        type="file"
        accept="image/jpeg"
        onChange={handleImageUpload}
      />

      {/* Display uploaded image */}
      {image && !error && (
        <div>
          <h2>Uploaded Image:</h2>
          <img src={image} alt="Uploaded" style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
      )}

      {/* Display error message if image is not found */}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default App;
