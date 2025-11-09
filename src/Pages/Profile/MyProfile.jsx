import React, { use, useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { updateProfile } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";

const MyProfile = () => {
  const {user,setUser,photoUrl} = use(AuthContext);
  const [update, setUpdate] = useState(false);
  const handleUpdate = (e) => {
    e.preventDefault();
    const newName = e.target.name.value;
    const newPhotoUrl = e.target.photo.value;
        // update user profile
        const profile = {
            displayName: newName,
            photoURL: newPhotoUrl
        }
        updateProfile(user, profile)
        .then(() => {
          setUser({ ...user, ...profile });
          toast.success("Profile updated successfully !");
        })
        .catch(error=>{
            console.log(error.message);
            toast.error("Profile update Failed!!");
        })
        setUpdate(false);
  }
  return (
    <div className="bg-base-200 py-10 px-5 min-h-screen">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg ">
        <div className="flex flex-col items-center">
          {
            user && <>

            {
              user.photoURL ?
              <img
              src={user.photoURL}
              alt={user.name}
              className="w-32 h-32 rounded-full object-cover mb-4 border-2 border-primary"
            />
              : user.photoUrl==null ?
              <img src= 'https://imgs.search.brave.com/wsziTmKjC8sgP9UIcqExIg7psh37zxr2o8v1yUKRdwU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvMTExNDQvMTEx/NDQ2MTYucG5n' alt="" />
              : <img src= {`${user.photoUrl}`} />
            }
            <h2 className="text-2xl font-bold text-secondary mb-1">
              {user.displayName}
            </h2>
            <p className="text-gray-600 mb-4">{user.email}</p>
            </>
          }
          {
            update &&
            <form onSubmit={handleUpdate}>
              <input name="name" type="text" className="bg-[#f7fee7] rounded-2xl border px-4 py-2 w-full" placeholder="New Name"/>
              <input name="photo" type="text" className="bg-[#f7fee7] rounded-2xl border px-4 py-2 w-full my-3" placeholder="New PhotoURL"/>
              <button className="btn flex items-center gap-2 bg-primary text-white py-2 px-6 rounded-full transition mx-auto">Save Profile</button>
            </form>
          }
          {
          update ||
          <button onClick={()=>setUpdate(true)} className="btn flex items-center gap-2 bg-primary text-white py-2 px-6 rounded-full transition">
            <FaUserEdit /> Update Profile
          </button>
          }

        </div>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default MyProfile;