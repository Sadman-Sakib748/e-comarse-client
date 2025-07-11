import { useState } from "react";
import { toast } from "react-hot-toast";
import useAuth from "../../../hooks/useAuth";

const UpdateProfile = () => {
  const { user, updateUserProfile } = useAuth();

  // Local state for edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Form states initialized with current user data
  const [name, setName] = useState(user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(
    user?.photoURL
  );
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserProfile({ displayName: name, photoURL });
      toast.success("Profile updated successfully!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white shadow-md rounded p-6">
      <div className="flex flex-col items-center space-y-4">
        <img
          src={photoURL}
          alt={name}
          className="w-32 h-32 rounded-full object-cover border"
        />
        {!isEditing && (
          <>
            <h2 className="text-2xl font-semibold">{user?.displayName || "No Name"}</h2>
            <p className="text-gray-600">{user?.email || "No Email"}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Edit Profile
            </button>
          </>
        )}

        {isEditing && (
          <form onSubmit={handleUpdate} className="w-full space-y-4">
            <div>
              <label className="block mb-1 font-medium">Name</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block mb-1 font-medium">Photo URL</label>
              <input
                type="text"
                className="w-full border px-3 py-2 rounded"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                required
                disabled={loading}
              />
            </div>

            <div className="flex justify-between">
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                disabled={loading}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-60"
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
