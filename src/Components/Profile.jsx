import {React, useEffect, useState} from "react";
import ProfilePic from "../assets/dummy-profile.png";
import { auth, db } from "../API/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { toast } from "react-toastify";

function Profile() {
    const [userDetails, setUserDetails] = useState(null);
    const fetchUserData=async()=> {
        auth.onAuthStateChanged(async (user) =>{
            console.log(user);
            const docRef = doc(db, "Users", user.uid);
            const docSnap = await getDoc(docRef);
            if(docSnap.exists()){
                setUserDetails(docSnap.data());
                console.log(docSnap.data());
            } else {
                console.log("Users Tidak Terdaftar");
                
            }

        });
    };
    useEffect(()=>{
        fetchUserData()
    }, [])

    async function handleLogout() {
        try {
            await auth.signOut();
            window.location.href = "/";
            console.log("User Logged Out Successfull");
            toast.success("Berhasil Logout", {
                    position: "top-center",
                    pauseOnHover: false,
                    theme: "dark"
            });
        } catch (error) {
            console.log("Error Logged Out", error.message );
        }
    }
    
    async function handleLogin() {
        try {
            window.location.href = "login-account";
        } catch (error) {
            console.log("Error Logged Out", error.message );
        }
    }

    return (
        <div className="bg-MAIN flex items-center justify-center min-h-screen">
            <div className="bg-THIRD p-10 rounded-3xl w-96">
                <div className="font-lexend">
                    {userDetails ? (
                        <>
                        <p className="text-white text-lg">Profil Picture</p>
                        <div className="mt-4">
                            <img
                                src={ProfilePic}
                                alt="profile picture"
                                className="rounded-full w-16 h-16"
                            />
                        </div>
                        <div className="mt-6">
                            <label className="block text-white text-sm mb-1">Name</label>
                            <p className="w-full bg-gray-300 text-black px-4 py-2 rounded-md">
                            {userDetails.firstName} {userDetails.lastName}
                            </p>
                        </div>
                        <div className="mt-4">
                            <label className="block text-white text-sm mb-1">Email</label>
                            <p className="w-full bg-gray-300 text-black px-4 py-2 rounded-md">
                            {userDetails.email}
                            </p>
                        </div>
                        <div className="mt-4">
                            <label className="block text-white text-sm mb-1">No Handphone</label>
                            <p className="w-full bg-gray-300 text-black px-4 py-2 rounded-md">
                            {userDetails.phone}
                            </p>
                        </div>
                        <button className="bg-PrimFont hover:bg-HOVER text-black py-2 px-4 rounded shadow-lg transition duration-300 mt-5"
                        onClick={handleLogout}
                        >
                            Logout
                        </button>
                        </>
                    ) : (
                        <div className="text-center">
                            <div className="flex justify-center items-center h-full">
                                <div className="w-12 h-12 border-4 border-MAIN border-t-transparent rounded-full animate-spin"></div>
                            </div>
                            <p className="mt-4 text-MAIN font-semibold">Loading...</p>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    );
};

export default Profile;
