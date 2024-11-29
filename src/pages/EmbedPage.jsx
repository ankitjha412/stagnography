/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import FileUpload from "../components/Fileupload";
import { embedMessage } from "../utils/steganography"; // Ensure the steganography utility is properly implemented
import '../styles/styles.css';

const EmbedPage = () => {
  const [coverImage, setCoverImage] = useState(null);
  const [secretMessage, setSecretMessage] = useState("");
  const [stegoImage, setStegoImage] = useState(null);

  const handleEmbed = async () => {
    if (coverImage && secretMessage) {
      try {
        const stego = await embedMessage(coverImage, secretMessage);
        if (stego) {
          setStegoImage(stego);
          localStorage.setItem("stegoFile", stego);
        } else {
          alert("Error embedding the message. Please try again!");
        }
      } catch (error) {
        console.error("Embedding error:", error);
        alert("An error occurred while embedding the message.");
      }
    } else {
      alert("Please upload an image and enter a secret message!");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ color: "#333" }}>Embed Message</h2>
      <FileUpload onUpload={setCoverImage} />
      {coverImage && (
        <div>
          <h3>Cover Image Preview:</h3>
          <img
            src={coverImage}
            alt="Cover File"
            style={{
              maxWidth: "600px",
              height: "auto",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          />
        </div>
      )}
      <textarea
        placeholder="Enter secret message"
        value={secretMessage}
        onChange={(e) => setSecretMessage(e.target.value)}
        style={{
          width: "100%",
          height: "100px",
          marginBottom: "10px",
          padding: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
          fontFamily: "Arial, sans-serif",
        }}
      />
      <button
        onClick={handleEmbed}
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
        Embed
      </button>
      {stegoImage && (
        <div>
          <h3>Stego Image:</h3>
          <img
            src={stegoImage}
            alt="Stego File"
            style={{
              maxWidth: "100%",
              height: "auto",
              border: "1px solid #ddd",
              borderRadius: "8px",
              marginTop: "10px",
            }}
          />
          <a
            href={stegoImage}
            download="stego_image.png"
            style={{
              display: "inline-block",
              marginTop: "10px",
              padding: "10px 20px",
              backgroundColor: "#28a745",
              color: "#fff",
              textDecoration: "none",
              borderRadius: "5px",
              fontSize: "16px",
            }}
          >
            Download Stego Image
          </a>
        </div>
      )}
    </div>
  );
};

export default EmbedPage;
