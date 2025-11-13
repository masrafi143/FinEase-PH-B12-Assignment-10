import React, { useState, useEffect, useContext } from "react";
import { FaUserEdit } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../provider/AuthProvider";

const MyProfile = () => {
  const { user, dbUser, setDbUser } = useContext(AuthContext);
  const [update, setUpdate] = useState(false);
  const [loading, setLoading] = useState(true);

  const demoUser = {
    image:
      "https://imgs.search.brave.com/wsziTmKjC8sgP9UIcqExIg7psh37zxr2o8v1yUKRdwU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4t/aWNvbnMtcG5nLmZs/YXRpY29uLmNvbS8x/MjgvMTExNDQvMTEx/NDQ2MTYucG5n",
  };

  // Fetch DB user info
  useEffect(() => {
    if (user?.email) {
      fetch(`https://finease-server-c7jy.onrender.com/users?email=${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          setDbUser(data[0]);
          setLoading(false);
        })
        .catch((err) => console.error(err));
    }
  }, [user, setDbUser]);

  if (loading)
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <span className="loading loading-spinner text-primary w-12 h-12"></span>
      </div>
    );

  const handleUpdate = (e) => {
    e.preventDefault();
    const newName = e.target.name.value;
    const newPhoto = e.target.photo.value;

    const updatedInfo = {
      name: newName,
      image: newPhoto,
      email: dbUser.email,
    };

    fetch(`https://finease-server-c7jy.onrender.com/users/${dbUser._id}`, {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(updatedInfo),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.modifiedCount > 0) {
          toast.success("Profile updated successfully!");
          setDbUser({ ...dbUser, ...updatedInfo });
          setUpdate(false);
        } else {
          toast.info("No changes detected.");
        }
      })
      .catch((err) => {
        console.error(err);
        toast.error("Update failed!");
      });
  };

  const userPhoto = dbUser?.image || demoUser.image;

  return (
    <div className="py-10 px-5 min-h-screen">
      <div className="max-w-md mx-auto bg-white p-6 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <img
            className="h-[40vh] w-[40vh] rounded-full object-cover mb-4 border-2 border-primary"
            src={userPhoto}
            alt="User"
          />
          <h2 className="text-2xl font-bold text-secondary mb-1">
            {dbUser?.name}
          </h2>
          <p className="text-gray-600 mb-4">{dbUser?.email}</p>

          {update && (
            <form onSubmit={handleUpdate} className="w-full">
              <input
                name="name"
                defaultValue={dbUser?.name}
                type="text"
                className="bg-[#f7fee7] rounded-2xl border px-4 py-2 w-full mb-2"
                placeholder="New Name"
              />
              <input
                name="photo"
                defaultValue={dbUser?.image}
                type="text"
                className="bg-[#f7fee7] rounded-2xl border px-4 py-2 w-full mb-3"
                placeholder="New Photo URL"
              />
              <button className="btn bg-primary text-white w-full">
                Save Profile
              </button>
            </form>
          )}

          {!update && (
            <button
              onClick={() => setUpdate(true)}
              className="btn flex items-center gap-2 bg-primary text-white py-2 px-6 rounded-full transition"
            >
              <FaUserEdit /> Update Profile
            </button>
          )}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default MyProfile;