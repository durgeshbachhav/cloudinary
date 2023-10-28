import { useState } from "react";
import axios from "axios";

const Form = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [image, setImage] = useState(null);
  const [imageBase64, setImageBase64] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const response = await axios.post("http://localhost:7000/api/user", 
      
     { name, username, image: imageBase64 },{
        headers: {
          "Content-Type": "application/json",
        }
      }
    );
    console.log("response ", response);
    setData(response.data)
  };

  const setFileToBase64 = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setImageBase64(reader.result);
    };
  };

  // receive file from form
  const handleImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setFileToBase64(file);
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Hello there!</h1>

        <p className="mt-4 text-gray-500">
          Please provide your name, username, and profile image
        </p>
      </div>

      <form
        action=""
        onSubmit={handleSubmit}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <div>
          <label htmlFor="name">Name</label>

          <div className="relative">
            <input
              type="text"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label htmlFor="username">Username</label>

          <div className="relative">
            <input
              type="text"
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="profile_image"
            className="block font-medium text-deepgray"
          >
            Upload image
          </label>

          <input
            name="image"
            className="w-full rounded-lg border-gray-200 p-3 text-sm"
            placeholder="Image"
            type="file"
            accept="image/*"
            id="image"
            onChange={handleImage}
          />
        </div>

        <div className="flex items-center justify-between">
          <button
            onClick={handleSubmit}
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
export default Form;
