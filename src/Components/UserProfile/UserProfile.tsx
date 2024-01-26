/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, ChangeEvent, useCallback } from "react";
import { AiOutlineEdit } from "react-icons/ai";
import axios from "axios";
import { FaRegEdit } from "react-icons/fa";
import { motion, useAnimation } from "framer-motion";
import toast from "react-hot-toast";

interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  img_cover?: string;
  country?: string;
  timeZone?: string;
  img_profile?: string;
}

const Profile: React.FC = () => {
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingImageUpload, setLoadingImageUpload] = useState(false);
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

  const fetchUserProfile = useCallback(async () => {
    const userEmail = JSON.parse(
      localStorage.getItem("user") || "{'id':'65b34882318c020926483957'}"
    ).email;
    setLoadingProfile(true);
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACK_END_API}/user?email=${userEmail}`
      );
      const userProfileData: UserProfile = response.data;

      setUserProfile(userProfileData);
      setCoverPhotoPreview(userProfileData.img_cover || null);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingProfile(false);
    }
  }, []);

  const uploadImageToApi = async (image: File): Promise<string> => {
    setLoadingImageUpload(true);
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append(
        "upload_preset",
        `${import.meta.env.VITE_IMAGE_UPLOAD_PREST}`
      );

      const response = await axios.post(
        `${import.meta.env.VITE_IMAGE_UPLOAD_API}`,
        formData
      );

      toast.success("Profile Updated Successfully");

      return response.data.url;
    } catch (error: any) {
      if (error.response) {
        console.error(
          "Server responded with error status:",
          error.response.status
        );
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received from the server.");
      } else {
        console.error("Error setting up the request:", error.message);
      }

      throw error;
    } finally {
      setLoadingImageUpload(false);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (isChangesMade) {
      setLoadingProfile(true);
      setLoadingImageUpload(true);
      try {
        const formData = new FormData();
        formData.append("country", editedCountry);
        formData.append("timeZone", editedTimeZone);
        if (coverPhoto) {
          formData.append("coverPhoto", coverPhoto);
        }
        if (profilePhoto) {
          formData.append("profilePhoto", profilePhoto);
        }

        const [coverPhotoLink, profilePhotoLink] = await Promise.all([
          coverPhoto && uploadImageToApi(coverPhoto),
          profilePhoto && uploadImageToApi(profilePhoto),
        ]);

        const updatedProfile: UserProfile = {
          ...userProfile,
          country: editedCountry || userProfile?.country,
          timeZone: editedTimeZone || userProfile?.timeZone,
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
      } finally {
        setLoadingProfile(false);
        setLoadingImageUpload(false);
      }
    } else {
      shakeScreen();
    }
  };

  const updateBackendData = async (data: UserProfile) => {
    const userId = JSON.parse(
      localStorage.getItem("user") || "{'id':'65b34882318c020926483957'}"
    ).id;
    try {
      await axios.patch(
        `${import.meta.env.VITE_BACK_END_API}/user/${userId}`,
        data
      );
    } catch (error) {
      console.error("Error updating backend data:", error);
    }
  };
  const controls = useAnimation();
  const shakeScreen = async () => {
    await controls.start({
      x: [-10, 10, -10, 10, 0],
      transition: { duration: 0.5, times: [0, 0.25, 0.5, 0.75, 1] },
    });
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
    <motion.div
      animate={controls}
      className="container h-screen p-4 mx-auto dark:bg-d">
      {loadingProfile && (
        <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-white dark:bg-d ">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 bg-black rounded-full animate-pulse dark:bg-violet-400"></div>
            <div className="w-4 h-4 bg-black rounded-full animate-pulse dark:bg-violet-400"></div>
            <div className="w-4 h-4 bg-black rounded-full animate-pulse dark:bg-violet-400"></div>
          </div>
          <div className="ml-2 text-lg font-semibold text-black dark:text-white">
            Loading Profile...
          </div>
        </div>
      )}
      <div className="mb-8">
        <div className="relative object-top w-full mb-4 bg-center bg-cover h-80">
          {coverPhotoPreview && (
            <img
              src={coverPhotoPreview}
              alt="Cover Preview"
              className="object-cover object-top w-full h-full rounded-t-md"
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
          <div className="absolute bottom-4 right-4">
            <button
              className="px-4 py-2 font-bold text-white transition duration-300 ease-in-out bg-blue-500 rounded-full hover:bg-blue-700"
              onClick={handleEdit}>
              <FaRegEdit size={24} />
            </button>
          </div>
        </div>

        {/* Profile Picture */}
        <div className="flex items-center mb-4">
          <div className="relative w-20 h-20">
            <img
              src={
                profilePhoto
                  ? URL.createObjectURL(profilePhoto)
                  : userProfile?.img_profile
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
        className={`bg-gray-200 dark:bg-d1 p-4 rounded-md ${
          isEditing ? "editing" : ""
        }`}>
        <div className="mb-4">
          <p>Email: {userProfile?.email}</p>
        </div>
        {isEditing ? (
          <>
            <label className="block mt-2">
              Country:
              <input
                type="text"
                value={editedCountry}
                onChange={(e) => setEditedCountry(e.target.value)}
                className="p-1 ml-2 bg-white border rounded-md dark:bg-dw text-dt"
              />
            </label>
            <label className="block mt-2">
              Time Zone:
              <input
                type="text"
                value={editedTimeZone}
                onChange={(e) => setEditedTimeZone(e.target.value)}
                className="p-1 ml-2 bg-white border rounded-md dark:bg-dw text-dt"
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
            onClick={handleSave}
            disabled={loadingProfile || loadingImageUpload}>
            Save Changes
          </button>
          <button
            className="px-4 py-2 ml-2 text-white bg-gray-500 rounded"
            onClick={handleCancel}
            disabled={loadingProfile || loadingImageUpload}>
            Cancel
          </button>
        </div>
      )}
    </motion.div>
  );
};

export default Profile;
