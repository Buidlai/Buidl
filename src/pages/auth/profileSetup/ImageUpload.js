import React, { useState } from 'react';
import avater from '../../../assets/avater.svg'
import uploadicon from '../../../assets/uploadicon.svg';

function ImageUpload() {
  const [image, setImage] = useState(null);

  // Function to handle when a file is selected
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    // Validate selected file (optional)
    if (selectedImage) {
      setImage(URL.createObjectURL(selectedImage));
    }
  };

  // Function to handle when the default image is clicked
  const handleDefaultImageClick = () => {
    // Trigger input file click event
    document.getElementById('imageInput').click();
  };

  return (
    <div>
    
      <input
        type="file"
        id="imageInput"
        style={{ display: 'none' }}
        onChange={handleImageChange}
      />
     
      <img
        src={image || avater}
        alt="Avatar"
        style={imageStyle}
        onClick={handleDefaultImageClick}
      />
      <img 
      alt="icon"
      width={32}
      onClick={handleDefaultImageClick}
      style={{marginLeft:-1.5+'rem',position:'absolute',marginTop:3+'rem',cursor:'pointer'}}
      src={uploadicon}/>
    </div>
  );
}

// Styles
const imageStyle = {
  width: '78px',
  height: '78px',
  borderRadius: '50%',
  cursor: 'pointer',
  position:'relative'
};

export default ImageUpload;
