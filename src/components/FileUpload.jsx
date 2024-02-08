import React, { useState } from "react";
import axios from "axios";

const FileUploadComponent = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append(
          "customer",
          "customer_434b83fb787747ee888336b9250e23f0"
        ); // Replace with your customer ID
        formData.append("type", "customerIdentityDocument");
        formData.append("name", "My Customer's Passport");
        formData.append(
          "description",
          "A document showing the information of the customer"
        );
        formData.append("file", file);

        const response = await axios.post(
          "https://api.spherepay.co/v1/file?mock=true", // Replace with the correct URL
          formData,
          {
            headers: {
              Authorization: `Bearer ${process.env.REACT_APP_SPHERE_API_KEY}`, // Replace with your API key
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const files = response.data.data.files;
        console.log("Uploaded files:", files);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
    </div>
  );
};

export default FileUploadComponent;
