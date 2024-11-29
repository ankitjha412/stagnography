/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import FileUpload from "../components/Fileupload";
import { extractMessage } from "../utils/steganography"; // Ensure the steganography utility is properly implemented
import '../styles/styles.css';

const ExtractPage = () => {
  const [stegoImage, setStegoImage] = useState(null);
  const [extractedMessage, setExtractedMessage] = useState("");

  const handleExtract = async () => {
    if (stegoImage) {
      try {
        const message = await extractMessage(stegoImage);
        if (message) {
          setExtractedMessage(message);
          readMessage(message); // Read out the extracted message
        } else {
          alert("No message found in the image, or the image is not valid.");
        }
      } catch (error) {
        console.error("Extraction error:", error);
        alert("An error occurred while extracting the message.");
      }
    } else {
      alert("Please upload a stego image!");
    }
  };

  // Function to read out the extracted message using the Web Speech API
  const readMessage = (message) => {
    if (!message) return;

    const utterance = new SpeechSynthesisUtterance(message);
    utterance.lang = "en-IN"; // Set language to English (US)
    utterance.rate = 1; // Set speaking rate (1 is normal speed)
    utterance.pitch = 1; // Set pitch (1 is normal pitch)
    speechSynthesis.speak(utterance); // Speak the message
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#333" }}>Extract Message</h2>
      <FileUpload onUpload={setStegoImage} />
      {stegoImage && (
        <div>
          <h3>Stego Image Preview:</h3>
          <img
            src={stegoImage}
            alt="Stego File"
            style={{
              maxWidth: "100%",
              height: "auto",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          />
        </div>
      )}
      <button
        onClick={handleExtract}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Extract
      </button>
      {extractedMessage && (
        <div>
          <h3>Extracted Message:</h3>
          <textarea
            value={extractedMessage}
            readOnly
            style={{
              width: "100%",
              height: "100px",
              marginTop: "10px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "5px",
              fontFamily: "Arial, sans-serif",
              backgroundColor: "#f9f9f9",
            }}
          />
          <button
            onClick={() => readMessage(extractedMessage)}
            style={{
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "blue",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
            }}
          >
            Read Out Loud
          </button>
        </div>
      )}
    </div>
  );
};

export default ExtractPage;
