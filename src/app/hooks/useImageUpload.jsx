import axios from "axios";
import { useState } from "react";

const useImageUpload = () => {
  const [uploadImages, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET
    );

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData
      );
      return {
        url: res.data.secure_url,
        public_id: res.data.public_id,
      };
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
      return null;
    }
  };

  const imageHandler = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;

    setLoading(true);
    setError(null);

    try {
      const results = await Promise.all(files.map(uploadImage));

      const validUploads = results.filter(Boolean);

      setImages((prev) => [...prev, ...validUploads]);

      return validUploads;
    } catch (err) {
      setError("Image upload failed");
      return [];
    } finally {
      setLoading(false);
    }
  };

  return {
    uploadImages,
    setImages,
    imageHandler,
    loading,
    error,
  };
};

export default useImageUpload;