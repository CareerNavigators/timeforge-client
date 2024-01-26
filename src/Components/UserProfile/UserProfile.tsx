import React, { useState, useEffect, ChangeEvent, useContext } from "react";
import { AiOutlineEdit, AiOutlineCamera } from "react-icons/ai";
import axios from "axios";
import { AuthContext } from "../../Provider/AuthContext";

interface UserProfile {
  name?: string;
  img_cover?: string;
  country?: string;
  timeZone?: string;
  img_profile?: string;
}

const Profile: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(
    null
  );
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedCountry, setEditedCountry] = useState("");
  const [editedTimeZone, setEditedTimeZone] = useState("");
  const [isChangesMade, setIsChangesMade] = useState(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const fetchUserProfile = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACK_END_API}/user?email=${user.email}`
      );
      setUserProfile(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };
  const handleEdit = () => {
    setIsEditing(true);
  };
  const handleSave = async () => {
    if (isChangesMade) {
      const formData = new FormData();
      formData.append("country", editedCountry);
      formData.append("timeZone", editedTimeZone);
      if (coverPhoto) {
        formData.append("coverPhoto", coverPhoto);
      }
      if (profilePhoto) {
        formData.append("profilePhoto", profilePhoto);
      }
      try {
        const [coverPhotoLink, profilePhotoLink] = await Promise.all([
          coverPhoto && uploadImageToApi(coverPhoto),
          profilePhoto && uploadImageToApi(profilePhoto),
        ]);

        const updatedProfile: UserProfile = {
          ...userProfile,
          country: editedCountry,
          timeZone: editedTimeZone,
          img_cover: coverPhotoLink || userProfile?.img_cover,
          img_profile: profilePhotoLink || userProfile?.img_profile,
        };
        setUserProfile(updatedProfile);
        setIsEditing(false);
        setIsChangesMade(false);
        await updateBackendData(updatedProfile);

        console.log("Edited Data:", JSON.stringify(updatedProfile, null, 2));
      } catch (error) {
        console.error("Error saving changes:", error);
      }
    } else {
      shakeScreen();
    }
  };

  const updateBackendData = async (data: UserProfile) => {
    try {
      await axios.patch("/api/user/update", data);
      console.log("Backend data updated successfully!");
    } catch (error) {
      console.error("Error updating backend data:", error);
    }
  };

  const uploadImageToApi = async (image: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append(
        "upload_preset",
        `${import.meta.env.VITE_IMAGE_UPLOAD_PREST}`
      );
      const response = await axios.post(
        `${import.meta.env.VITE_IMAGE_UPLOAD_API}`,
        formData
      );

      return response.data.url;
    } catch (error) {
      console.error("Error uploading image:", error);
      throw error;
    }
  };
  const shakeScreen = () => {
    console.log("Shaking the screen!");
  };
  const handleCancel = () => {
    setIsEditing(false);
    setEditedCountry(userProfile?.country || "");
    setEditedTimeZone(userProfile?.timeZone || "");
    setIsChangesMade(false);
  };

  const handleCoverPhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const selectedCoverPhoto = event.target.files[0];
      setCoverPhoto(selectedCoverPhoto);
      setCoverPhotoPreview(URL.createObjectURL(selectedCoverPhoto));
      setIsChangesMade(true);
    }
  };
  const handleProfilePhotoChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setProfilePhoto(event.target.files[0]);
      setIsChangesMade(true);
    }
  };
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return (
    <div className="container p-4 mx-auto">
      <div className="mb-8">
        <div className="relative w-full h-56 mb-4 bg-center bg-cover">
          {coverPhotoPreview && (
            <img
              src={coverPhotoPreview}
              alt="Cover Preview"
              className="object-cover w-full h-full rounded-t-md"
            />
          )}
          {isEditing && (
            <label
              htmlFor="coverPhoto"
              className="absolute cursor-pointer top-2 right-2">
              <AiOutlineEdit size={24} />
            </label>
          )}
          {isEditing && (
            <input
              type="file"
              id="coverPhoto"
              accept="image/*"
              className="hidden"
              onChange={handleCoverPhotoChange}
            />
          )}
          <div className="absolute cursor-pointer bottom-4 right-4">
            <AiOutlineCamera size={24} onClick={handleEdit} />
          </div>
        </div>

        {/* Profile Picture */}
        <div className="flex items-center mb-4">
          <div className="relative w-20 h-20">
            <img
              src={
                profilePhoto
                  ? URL.createObjectURL(profilePhoto)
                  : userProfile?.img_profile || ""
              }
              alt="Profile"
              className="object-cover w-full h-full border-4 border-white rounded-full"
            />
            {isEditing && (
              <label
                htmlFor="profilePhoto"
                className="absolute top-0 right-0 cursor-pointer">
                <AiOutlineEdit size={18} onClick={handleEdit} />
              </label>
            )}
            {isEditing && (
              <input
                type="file"
                id="profilePhoto"
                accept="image/*"
                className="hidden"
                onChange={handleProfilePhotoChange}
              />
            )}
          </div>
        </div>
      </div>
      <div
        className={`bg-gray-200 p-4 rounded-md ${isEditing ? "editing" : ""}`}>
        <div className="mb-4">
          <p>Email: {user?.email}</p>
        </div>
        {isEditing ? (
          <>
            <label className="block mt-2">
              Country:
              <input
                type="text"
                value={editedCountry}
                onChange={(e) => setEditedCountry(e.target.value)}
                className="p-1 ml-2 border rounded-md"
              />
            </label>
            <label className="block mt-2">
              Time Zone:
              <input
                type="text"
                value={editedTimeZone}
                onChange={(e) => setEditedTimeZone(e.target.value)}
                className="p-1 ml-2 border rounded-md"
              />
            </label>
          </>
        ) : (
          <>
            <p>Country: {userProfile?.country}</p>
            <p>Time Zone: {userProfile?.timeZone}</p>
          </>
        )}
      </div>
      {isEditing && (
        <div className="fixed bottom-4 right-4">
          <button
            className="px-4 py-2 text-white bg-blue-500 rounded"
            onClick={handleSave}>
            Save Changes
          </button>
          <button
            className="px-4 py-2 ml-2 text-white bg-gray-500 rounded"
            onClick={handleCancel}>
            Cancel
          </button>
        </div>
      )}
    </div>
  );
};

export default Profile;
