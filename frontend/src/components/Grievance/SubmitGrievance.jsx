import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, FileText, Layers, Star, MessageSquare, Image as ImageIcon } from 'lucide-react';

const SubmitGrievance = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    priority: "Medium",
  });
  const [photo, setPhoto] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  const handleCameraCapture = (e) => {
    const file = e.target.files[0];
    setPhoto(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPhotoPreview(reader.result);
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

  const removeFile = () => {
    setPhoto(null);
    setPhotoPreview(null);
  };

 
  const formDataToObject = (formData) => {
    const object = {};

    formData.forEach((value, key) => {
      object[key] = value;
    });

    return object;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const token = sessionStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      // Create FormData for other fields
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("priority", formData.priority);

      // If there's an image, upload it to Cloudinary
      if (photo) {
        // Replace with your Cloudinary upload preset and cloud name
        const uploadPreset = "uttkarsh";
        const cloudName = "dwlezv6pr";

        const formData = new FormData();
        formData.append("file", photo);
        formData.append("upload_preset", uploadPreset);
        formData.append("cloud_name", cloudName);

        // Upload image to Cloudinary
        const cloudinaryResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const cloudinaryData = await cloudinaryResponse.json();

        if (cloudinaryResponse.ok) {
          // Get the image URL from Cloudinary's response
          const imageUrl = cloudinaryData.secure_url;
          console.log("image url: " + imageUrl);
          formDataToSend.append("photo", imageUrl); // Add Cloudinary URL to form data
        } else {
          setError("Image upload failed");
          return;
        }
      }

      let obj = formDataToObject(formDataToSend);
      console.log(obj);
      // Send the form data to your backend
      const response = await fetch("http://localhost:8080/api/grievances", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json", // Ensure you specify JSON
        },
        body: JSON.stringify(obj), // Convert object to JSON string
      });
      if (response.ok) {
        alert("Grievance submitted successfully!");
        navigate("/dashboard", { state: { refresh: true } });
      } else {
        const data = await response.json();
        setError(data.message || "Failed to submit grievance");
      }
    } catch (err) {
      setError("An error occurred while submitting the grievance");
    } finally {
      setLoading(false);
    }
  };

  // Camera modal handlers
  const openCamera = async () => {
    setShowCamera(true);
    setTimeout(async () => {
      if (videoRef.current) {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          videoRef.current.srcObject = stream;
          videoRef.current.play();
        } catch (err) {
          setError('Unable to access camera');
          setShowCamera(false);
        }
      }
    }, 100);
  };

  const closeCamera = () => {
    setShowCamera(false);
    if (videoRef.current && videoRef.current.srcObject) {
      const tracks = videoRef.current.srcObject.getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const context = canvasRef.current.getContext('2d');
      context.drawImage(videoRef.current, 0, 0, 320, 240);
      canvasRef.current.toBlob(blob => {
        setPhoto(new File([blob], 'camera-photo.png', { type: 'image/png' }));
        setPhotoPreview(URL.createObjectURL(blob));
        closeCamera();
      }, 'image/png');
    }
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Modern gradient background with pattern overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-purple-400 via-indigo-300 to-blue-200 opacity-90" />
      <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />

      <div className="w-full max-w-lg mx-auto z-10">
        <div className="bg-white/60 backdrop-blur-xl shadow-2xl rounded-2xl p-8 border border-white/40 ring-1 ring-white/30">
          <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-700 via-indigo-600 to-blue-600 mb-2 text-center drop-shadow">Submit New Grievance</h2>
          <p className="text-indigo-500 text-center mb-6 font-medium">Fill out the form below to submit your grievance.</p>

          {error && (
            <div className="mb-4 flex items-center bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded relative" role="alert">
              <X className="h-5 w-5 mr-2" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="relative">
              <label htmlFor="title" className="block text-sm font-medium text-zinc-700 mb-1">Title</label>
              <div className="relative">
                <FileText className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-5 w-5" />
                <input
                  type="text"
                  name="title"
                  id="title"
                  required
                  className="pl-10 pr-3 py-2 block w-full border border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Enter grievance title"
                />
              </div>
            </div>

            <div className="relative">
              <label htmlFor="category" className="block text-sm font-medium text-zinc-700 mb-1">Category</label>
              <div className="relative">
                <Layers className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-5 w-5" />
                <select
                  id="category"
                  name="category"
                  required
                  className="pl-10 pr-3 py-2 block w-full border border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  value={formData.category}
                  onChange={handleChange}
                >
                  <option value="">Select a category</option>
                  <option value="Academic">Academic</option>
                  <option value="Administration">Administration</option>
                  <option value="Administration">Administration</option>
                  <option value="Infrastructure">Infrastructure</option>
                  <option value="Hostel">Hostel</option>
                  <option value="General">General</option>
                  <option value="Hostel">Hostel</option>
                  <option value="General">General</option>
                </select>
              </div>
            </div>

            <div className="relative">
              <label htmlFor="priority" className="block text-sm font-medium text-zinc-700 mb-1">Priority</label>
              <div className="relative">
                <Star className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 h-5 w-5" />
                <select
                  id="priority"
                  name="priority"
                  required
                  className="pl-10 pr-3 py-2 block w-full border border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
            </div>

            <div className="relative">
              <label htmlFor="description" className="block text-sm font-medium text-zinc-700 mb-1">Description</label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 text-zinc-400 h-5 w-5" />
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  className="pl-10 pr-3 py-2 block w-full border border-zinc-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe your grievance in detail"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-zinc-700 mb-1">Photo Attachment</label>
              <div className="mt-1 flex flex-col items-center justify-center px-6 pt-5 pb-6 border-2 border-dashed border-zinc-300 rounded-lg bg-zinc-50">
                {photoPreview ? (
                  <div className="flex flex-col items-center gap-2">
                    <img src={photoPreview} alt="Preview" className="h-24 w-24 object-cover rounded-lg border border-zinc-200" />
                    <span className="text-xs text-zinc-500">{photo?.name || 'Camera Photo'}</span>
                    <button
                      type="button"
                      onClick={removeFile}
                      className="text-red-600 hover:text-red-500 flex items-center gap-1 text-xs"
                    >
                      <X className="h-4 w-4" /> Remove
                    </button>
                  </div>
                ) : (
                  <>
                    <label
                      htmlFor="file-upload"
                      className="flex flex-col items-center cursor-pointer mb-2"
                    >
                      <ImageIcon className="h-10 w-10 text-purple-400 mb-2" />
                      <span className="text-purple-600 font-medium">Upload photo</span>
                      <span className="text-xs text-zinc-500">JPG, PNG up to 10MB</span>
                      <input
                        id="file-upload"
                        name="photo"
                        type="file"
                        accept="image/*"
                        className="sr-only"
                        onChange={handleFileChange}
                      />
                    </label>
                    <button
                      type="button"
                      onClick={openCamera}
                      className="text-purple-600 font-medium hover:underline text-sm mt-2"
                    >
                      <span>Take Photo</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="bg-white py-2 px-4 border border-zinc-300 rounded-lg shadow-sm text-sm font-medium text-zinc-700 hover:bg-zinc-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-base font-semibold rounded-lg text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition"
              >
                {loading ? 'Submitting...' : 'Submit Grievance'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Camera Modal */}
      {showCamera && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-2xl shadow-xl p-6 flex flex-col items-center">
            <video ref={videoRef} width={320} height={240} className="rounded-lg mb-4" autoPlay />
            <canvas ref={canvasRef} width={320} height={240} className="hidden" />
            <div className="flex gap-4">
              <button
                type="button"
                onClick={capturePhoto}
                className="px-6 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold shadow hover:from-purple-700 hover:to-indigo-700"
              >
                Capture
              </button>
              <button
                type="button"
                onClick={closeCamera}
                className="px-6 py-2 rounded-lg bg-zinc-200 text-zinc-700 font-semibold shadow hover:bg-zinc-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubmitGrievance;
