import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

async function updateUserProfileApi({ displayName, photoURL }) {
  return new Promise((resolve) =>
    setTimeout(() => resolve({ success: true }), 1500)
  );
}

const UpdateProfile = () => {
  const { user, updateUserProfile } = useAuth();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(user?.photoURL || "");
  const [loading, setLoading] = useState(false);

  const [photoPreview, setPhotoPreview] = useState(photoURL);
  const [photoError, setPhotoError] = useState(false);

  useEffect(() => {
    setPhotoPreview(photoURL);
    setPhotoError(false);
  }, [photoURL]);

  const handleUpdate = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Name can't be empty!");
      return;
    }
    if (!photoURL.trim()) {
      toast.error("Photo URL can't be empty!");
      return;
    }

    setLoading(true);
    try {
      const apiRes = await updateUserProfileApi({ displayName: name, photoURL });
      if (apiRes.success) {
        if (updateUserProfile) {
          await updateUserProfile({ displayName: name, photoURL });
        }
        toast.success("Profile updated successfully!");
        setIsEditing(false);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-14 bg-white shadow-lg rounded-lg p-8 border border-gray-200">
      <div className="flex flex-col items-center space-y-5">
        <div className="relative w-36 h-36">
          <img
            src={photoError ? "/default-avatar.png" : photoPreview}
            alt={name || "User Avatar"}
            onError={() => setPhotoError(true)}
            className="w-36 h-36 rounded-full object-cover border-4 border-blue-500 shadow-md"
          />
          {isEditing && (
            <div className="absolute bottom-0 right-0 bg-blue-600 rounded-full p-2 cursor-pointer hover:bg-blue-700 transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.232 5.232l3.536 3.536M9 13.5V17h3.5l7-7-3.5-3.5-7 7z"
                />
              </svg>
            </div>
          )}
        </div>

        {!isEditing && (
          <>
            <h2 className="text-3xl font-semibold text-gray-800">{user?.displayName || "No Name"}</h2>
            <p className="text-gray-600 text-sm tracking-wide">{user?.email || "No Email"}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-5 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow transition"
            >
              Edit Profile
            </button>
          </>
        )}

        {isEditing && (
          <form onSubmit={handleUpdate} className="w-full space-y-6">
            <div>
              <label className="block mb-2 font-semibold text-gray-700">Full Name</label>
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={loading}
                placeholder="Enter your full name"
                required
                autoFocus
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold text-gray-700">Photo URL</label>
              <input
                type="url"
                className={`w-full px-4 py-2 border rounded focus:outline-none transition
                  ${photoError ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-blue-500"}`}
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                disabled={loading}
                placeholder="Enter a valid image URL"
                required
              />
              {photoError && (
                <p className="text-red-600 mt-1 text-sm">Can't load image from this URL.</p>
              )}
            </div>

            <div className="flex justify-between items-center">
              <button
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setName(user?.displayName || "");
                  setPhotoURL(user?.photoURL || "");
                  setPhotoError(false);
                }}
                disabled={loading}
                className="px-5 py-2 border border-gray-300 rounded hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded shadow hover:bg-blue-700 transition disabled:opacity-50"
              >
                {loading ? "Updating..." : "Save Changes"}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateProfile;
