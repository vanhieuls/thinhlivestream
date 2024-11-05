"use client";

import {useEffect, useState} from "react";
import {uploadMedia, setUserData, getUserData} from "/lib/frontend/api";
import Avatar from "@/app/(main)/Avatar";
import CoverPhoto from "@/app/(main)/CoverPhoto";
import Password from "@/app/Password";

export default function Setting() {
    const [data, setData] = useState(null);
    const [avatarFile, setAvatarFile] = useState(null);
    const [coverPhotoFile, setCoverPhotoFile] = useState(null);
    const [avatarPreview, setAvatarPreview] = useState(null);
    const [coverPhotoPreview, setCoverPhotoPreview] = useState(null);
    const [isUpdatingAvatar, setIsUpdatingAvatar] = useState(false);
    const [isUpdatingCoverPhoto, setIsUpdatingCoverPhoto] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    useEffect(() => {
        getUserData().then(r => {
            if (r.status === "success") {
                setData(r.user);
            }
        });
    }, []);

    useEffect(() => {
        if (avatarFile) {
            const previewUrl = URL.createObjectURL(avatarFile);
            setAvatarPreview(previewUrl);
            return () => URL.revokeObjectURL(previewUrl);
        }
    }, [avatarFile]);

    useEffect(() => {
        if (coverPhotoFile) {
            const previewUrl = URL.createObjectURL(coverPhotoFile);
            setCoverPhotoPreview(previewUrl);
            return () => URL.revokeObjectURL(previewUrl);
        }
    }, [coverPhotoFile]);

    if (!data) {
        return (
            <div
                className="h-screen w-screen bg-gradient-to-b from-neutral to-base-300 via-base-300 via-90% overflow-x-hidden flex justify-center p-20">
            </div>
        );
    }


    const avatarUpdate = () => {
        if (avatarFile) {
            setIsUpdatingAvatar(true);
            uploadMedia(avatarFile).then(r => {
                if (r.status === "success") {
                    setUserData(data.username, {avatar: r.result.url}).then(result => {
                        console.log(result);
                        setIsUpdatingAvatar(false);
                    });
                } else {
                    setIsUpdatingAvatar(false);
                }
            });
        } else {
            alert("Please select a file for the profile picture.");
        }
    };

    const coverPhotoUpdate = () => {
        if (coverPhotoFile) {
            setIsUpdatingCoverPhoto(true);
            uploadMedia(coverPhotoFile).then(r => {
                if (r.status === "success") {
                    setUserData(data.username, {coverphoto: r.result.url}).then(result => {
                        console.log(result);
                        setIsUpdatingCoverPhoto(false);
                    });
                } else {
                    setIsUpdatingCoverPhoto(false);
                }
            });
        } else {
            alert("Please select a file for the cover photo.");
        }
    };

    const changePassword = () => {
        if(confirmPassword !== newPassword) {
            alert("Passwords do not match");

        }
    }

    return (
        <div
            className="h-screen w-screen bg-gradient-to-b from-neutral to-base-300 via-base-300 via-90% overflow-x-hidden flex flex-col gap-4 py-20 px-40">
            <div className="w-full h-fit bg-white/5 rounded-2xl">
                <div className="p-10 flex flex-col gap-8">
                    <div className="flex justify-between items-center">
                        <span className="font-extrabold text-2xl">Profile Picture</span>
                        <button
                            className="btn btn-outline btn-success"
                            onClick={avatarUpdate}
                            disabled={isUpdatingAvatar}
                        >
                            Change Profile Picture
                        </button>
                    </div>
                    <div className="flex flex-row gap-8 items-center w-full h-fit">
                        <div className="w-48 relative">
                            <Avatar src={avatarPreview || undefined}/>
                            {isUpdatingAvatar && (
                                <div
                                    className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-full">
                                    <span className="loading loading-ring loading-lg"></span>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <input
                                type="file"
                                className="file-input file-input-ghost w-full max-w-xs"
                                accept="image/*"
                                onChange={e => setAvatarFile(e.target.files[0])}
                            />
                            <span className="text-white/50 mx-5">Must be JPG, PNG, JPEG and smaller 25MB</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-fit bg-white/5 rounded-2xl">
                <div className="p-10 flex flex-col gap-8">
                    <div className="flex justify-between items-center">
                        <span className="font-extrabold text-2xl">Cover Picture</span>
                        <button
                            className="btn btn-outline btn-success"
                            onClick={coverPhotoUpdate}
                            disabled={isUpdatingCoverPhoto}
                        >
                            Change Cover Picture
                        </button>
                    </div>
                    <div className="flex flex-col gap-8 w-full h-fit">
                        <div className="relative">
                            <CoverPhoto src={coverPhotoPreview || undefined}/>{
                            isUpdatingCoverPhoto && (
                                <div
                                    className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-2xl">
                                    <span className="loading loading-ring loading-lg"></span>
                                </div>
                            )}
                        </div>
                        <div className="flex flex-col gap-2">
                            <input
                                type="file"
                                className="file-input file-input-ghost w-full max-w-xs"
                                accept="image/*"
                                onChange={e => setCoverPhotoFile(e.target.files[0])}
                            />
                            <span className="text-white/50 mx-5">Must be JPG, PNG, JPEG and smaller 25MB</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-full h-fit bg-white/5 rounded-2xl">
                <div className="p-10 flex flex-col gap-8">
                    <div className="flex justify-between items-center">
                        <span className="font-extrabold text-2xl">Security</span>
                        <button
                            className="btn btn-outline btn-success"
                            onClick={changePassword}
                            // disabled={isUpdatingCoverPhoto}
                        >
                            Change Password
                        </button>
                    </div>
                    <div className="flex flex-col w-2/5 gap-8">
                        <div className="flex flex-col gap-4">
                            <span>Current password</span>
                            <input type="password" className="input input-bordered" value={currentPassword}/>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span>New password</span>
                            <input type="password" className="input input-bordered" value={newPassword}/>
                        </div>
                        <div className="flex flex-col gap-4">
                            <span>Confirm password</span>
                            <input type="password" className="input input-bordered" value={confirmPassword}/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
