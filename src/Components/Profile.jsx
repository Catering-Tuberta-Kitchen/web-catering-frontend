import React from "react";
import ProfilePic from "../assets/dummy-profile.png";

const Profile = () => {
    return (
        <div className="bg-MAIN flex items-center justify-center min-h-screen">
            <div className="bg-THIRD p-10 rounded-3xl w-96">
                <p className="text-white text-lg font-semibold">Profil Picture</p>
                <div className="mt-4">
                    <img
                        src={ProfilePic}
                        alt="profile picture"
                        className="rounded-full w-16 h-16"
                    />
                </div>
                <div className="mt-6">
                    <label className="block text-white text-sm mb-1">Name</label>
                    <input
                        type="text"
                        value="Zakaria"
                        readOnly
                        className="w-full bg-gray-300 text-black px-4 py-2 rounded-md"
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-white text-sm mb-1">Email</label>
                    <input
                        type="email"
                        value="zkuu@tuberta.com"
                        readOnly
                        className="w-full bg-gray-300 text-black px-4 py-2 rounded-md"
                    />
                </div>
                <div className="mt-4">
                    <label className="block text-white text-sm mb-1">No Handphone</label>
                    <input
                        type="text"
                        value="06969696969"
                        readOnly
                        className="w-full bg-gray-300 text-black px-4 py-2 rounded-md"
                    />
                </div>
            </div>
        </div>
    );
};

export default Profile;
