/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardBody,
  Avatar,
  Typography,
  Tooltip,
  Input,
  CardHeader,
  Textarea,
} from "@material-tailwind/react";
import { BiPencil } from "react-icons/bi";
import {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { AuthContext } from "../../Provider/AuthContext";
import axios from "axios";
import toast from "react-hot-toast";
import { motion, useAnimation } from "framer-motion";
import { AiOutlineEdit } from "react-icons/ai";

interface UserProfile {
  id?: string;
  name?: string;
  email?: string;
  img_cover?: string;
  location?: string;
  timeZone?: string;
  img_profile?: string;
  phone?: string;
  desc?: string;
}

export function Profile() {
  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingImageUpload, setLoadingImageUpload] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile>();
  const [coverPhoto, setCoverPhoto] = useState<File | null>(null);
  const [coverPhotoPreview, setCoverPhotoPreview] = useState<string | null>(
    null
  );
  const [profilePhoto, setProfilePhoto] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedLocation, setEditedLocation] = useState("");
  const [editedPhone, setEditedPhone] = useState("");
  const [editedTimeZone, setEditedTimeZone] = useState("");
  const [EditedDescription, setEditedDescription] = useState("");
  const [isChangesMade, setIsChangesMade] = useState(false);
  const { userData, setUserData } = useContext(AuthContext);
  // fetch user data
  const fetchUserProfile = useCallback(async () => {
    const userEmail = userData?.email;

    if (userEmail) {
      try {
        setLoadingProfile(true);

        const response = await axios.get(
          `${import.meta.env.VITE_BACK_END_API}/user?email=${userEmail}`
        );

        const userProfileData: UserProfile = response.data;
        setUserProfile(userProfileData);
        setCoverPhotoPreview(
          userProfileData.img_cover ||
            "https://cdn.discordapp.com/attachments/1065689957525630997/1198863824783155271/3L6gDuf.png?ex=65c9ae71&is=65b73971&hm=e6cfcb9041394544326bb8681a1ffafba1b3b5f4fdbfbf311d379438a1ff37da&"
        );
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoadingProfile(false);
      }
    } else {
      setLoadingProfile(true);
    }
  }, [userData?.email]);

  // hodleedit
  const handleEdit = () => {
    setIsEditing(true);
  };

  // handle upload
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
  // handle save
  const handleSave = async () => {
    if (isChangesMade) {
      setLoadingProfile(true);
      setLoadingImageUpload(true);
      try {
        const formData = new FormData();
        formData.append("location", editedLocation);
        formData.append("phone", editedPhone);
        formData.append("timeZone", editedTimeZone);
        formData.append("desc", EditedDescription);

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
          location: editedLocation || userProfile?.location,
          phone: editedPhone || userProfile?.phone,
          desc: EditedDescription || userProfile?.desc,
          timeZone: editedTimeZone || userProfile?.timeZone,
          img_cover: coverPhotoLink || userProfile?.img_cover,
          img_profile: profilePhotoLink || userProfile?.img_profile,
        };
        setUserProfile(updatedProfile);
        setIsEditing(false);
        setIsChangesMade(false);
        await updateBackendData(updatedProfile);
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
  // update user data
  const updateBackendData = async (data: UserProfile) => {
    const userId = userData._id;
    try {
      await axios
        .patch(`${import.meta.env.VITE_BACK_END_API}/user/${userId}`, data)
        .then((response) => {
          setUserData(response.data);
        });
    } catch (error) {
      console.error("Error updating backend data:", error);
    }
  };
  // shake screnn
  const controls = useAnimation();
  const shakeScreen = async () => {
    await controls.start({
      x: [-10, 10, -10, 10, 0],
      transition: { duration: 0.5, times: [0, 0.25, 0.5, 0.75, 1] },
    });
  };
  const handleCancel = () => {
    setIsEditing(false);
    setEditedLocation(userProfile?.location || "");
    setEditedTimeZone(userProfile?.timeZone || "");
    setEditedPhone(userProfile?.phone || "");
    setEditedDescription(userProfile?.desc || "");
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

  const coverPhotoStyles = `
  .coverPhoto {
    background-image: url('${coverPhotoPreview}');
    background-position: center;
  }`;

  return (
    <>
      <motion.div animate={controls} className="w-screen">
        {loadingProfile && (
          <div className="fixed top-0 left-0 z-50 flex items-center justify-center w-full h-full bg-white dark:bg-d">
            <div className="flex flex-col items-center">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-black rounded-full animate-pulse dark:bg-violet-400"></div>
                <div className="w-4 h-4 bg-black rounded-full animate-pulse dark:bg-violet-400"></div>
                <div className="w-4 h-4 bg-black rounded-full animate-pulse dark:bg-violet-400"></div>
              </div>
              {/* <div className="ml-2 text-lg font-semibold text-black dark:text-white">
              Loading Profile...
            </div> */}
            </div>
          </div>
        )}
        <div>
          <style>{coverPhotoStyles}</style>
          <div className="relative">
            {coverPhotoPreview && (
              <div className="relative w-full overflow-hidden bg-center bg-cover h-[340px] rounded-b-xl coverPhoto">
                <div className="absolute inset-0 w-full h-full bg-gray-900/75" />
              </div>
            )}
            {isEditing && (
              <label
                htmlFor="coverPhoto"
                className="absolute text-white cursor-pointer top-2 right-2">
                <AiOutlineEdit  size={24} />
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
          </div>
          <Card
            className="mx-3 mb-6 -mt-16 border lg:mx-4 border-blue-gray-100"
            placeholder={undefined}>
            <CardBody className="p-4" placeholder={undefined}>
              <div className="flex flex-wrap items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-6">
                  <div className="relative w-20 h-20">
                    <Avatar
                      src={
                        profilePhoto
                          ? URL.createObjectURL(profilePhoto)
                          : userProfile?.img_profile
                      }
                      alt="bruce-mars"
                      variant="rounded"
                      className="object-cover w-full h-full rounded-lg shadow-lg shadow-blue-gray-500/40"
                      placeholder={undefined}
                    />{" "}
                    {isEditing && (
                      <label
                        htmlFor="profilePhoto"
                        className="absolute cursor-pointer -right-2 -top-2">
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
                  <div>
                    <Typography
                      variant="h5"
                      color="blue-gray"
                      className="mb-1"
                      placeholder={undefined}>
                      {userProfile?.name}
                    </Typography>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-600"
                      placeholder={undefined}>
                      User
                    </Typography>
                  </div>
                </div>
              </div>
              <div className="grid gap-12 px-4 mb-12 gird-cols-1 lg:grid-cols-2 xl:grid-cols-3">
                <Card
                  color="transparent"
                  shadow={false}
                  placeholder={undefined}>
                  <CardHeader
                    color="transparent"
                    shadow={false}
                    floated={false}
                    className="flex items-center justify-between gap-4 mx-0 mt-0 mb-4"
                    placeholder={undefined}>
                    <Typography
                      variant="h6"
                      color="blue-gray"
                      placeholder={undefined}>
                      Profile Information
                    </Typography>
                    <Tooltip
                      className="text-black bg-transparent"
                      content="Edit Profile"
                      animate={{
                        mount: { scale: 1, y: 0 },
                        unmount: { scale: 0, y: 25 },
                      }}>
                      <div>
                        <BiPencil
                          onClick={handleEdit}
                          className="w-4 h-4 cursor-pointer text-blue-gray-500"
                        />
                      </div>
                    </Tooltip>
                  </CardHeader>
                  <CardBody className="p-0" placeholder={undefined}>
                    <Typography
                      variant="small"
                      className="font-normal text-blue-gray-500"
                      placeholder={undefined}>
                      {userData?.desc || "Edit to add description"}
                    </Typography>

                    <hr className="my-8 border-blue-gray-50" />

                    <ul className="flex flex-col gap-4 p-0">
                      <li className="flex items-center gap-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold capitalize"
                          placeholder={undefined}>
                          Name:
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                          placeholder={undefined}>
                          {userProfile?.name}
                        </Typography>
                      </li>

                      <li className="flex items-center gap-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold capitalize"
                          placeholder={undefined}>
                          Mobile:
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                          placeholder={undefined}>
                          {userProfile?.phone || "Edit to add phone Number"}
                        </Typography>
                      </li>

                      <li className="flex items-center gap-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold capitalize"
                          placeholder={undefined}>
                          Email:
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                          placeholder={undefined}>
                          {userProfile?.email}
                        </Typography>
                      </li>

                      <li className="flex items-center gap-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold capitalize"
                          placeholder={undefined}>
                          Location:
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                          placeholder={undefined}>
                          {userProfile?.location || "Edit to add Location"}
                        </Typography>
                      </li>
                      <li className="flex items-center gap-4">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-semibold capitalize"
                          placeholder={undefined}>
                          Time Zone:
                        </Typography>
                        <Typography
                          variant="small"
                          className="font-normal text-blue-gray-500"
                          placeholder={undefined}>
                          {userProfile?.timeZone}
                        </Typography>
                      </li>
                    </ul>
                  </CardBody>
                </Card>
                <div className="flex flex-col items-center justify-start gap-8">
                  {isEditing ? (
                    <>
                      <Input
                        type="text"
                        defaultValue={userProfile?.location}
                        onChange={(e) => setEditedLocation(e.target.value)}
                        variant="standard"
                        label="Location"
                        placeholder=""
                        crossOrigin={undefined}
                      />
                      <Input
                        type="text"
                        variant="standard"
                        label="Time Zone:"
                        placeholder=""
                        crossOrigin={undefined}
                        defaultValue={userProfile?.timeZone}
                        onChange={(e) => setEditedTimeZone(e.target.value)}
                      />
                      <Input
                        type="tel"
                        variant="standard"
                        label="Phone Number"
                        placeholder=""
                        crossOrigin={undefined}
                        defaultValue={userProfile?.phone}
                        onChange={(e) => setEditedPhone(e.target.value)}
                      />
                      <Textarea
                        defaultValue={userProfile?.desc}
                        onChange={(e) => setEditedDescription(e.target.value)}
                        variant="outlined"
                        label="description"
                      />
                    </>
                  ) : null}
                </div>
              </div>
            </CardBody>
          </Card>
        </div>{" "}
      </motion.div>
      {isEditing && (
        <div className="absolute bottom-5 right-56">
          <button
            className="px-4 py-2 text-white rounded bg-dt"
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
    </>
  );
}
