import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import myimage from "../../../assets/Images/Group/grp.png";

const Group: React.FC = () => {
  const navigation = useNavigate();

  const [name, setName] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  const mySubmission = (e: React.FormEvent) => {
    e.preventDefault();
    navigation("/Group-Detail", {
      state: { name, section, subject, room },
    });
  };

  return (
    <div className="flex flex-col items-center justify-center mt-28">
      {/* Image */}
      <div className="mb-6">
        <img
          src={myimage}
          alt="Group"
          className="w-full max-w-xs sm:max-w-md md:max-w-lg"
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-row items-center justify-center w-full mt-3 space-x-6">
        <span
          onClick={() => setShowForm(true)}
          className="flex items-center justify-center w-28 h-7 text-purple-700 cursor-pointer rounded-md hover:bg-gray-300"
        >
          Create Group
        </span>
        <button className="flex items-center justify-center w-28 h-7 text-white bg-purple-700 rounded-md hover:bg-purple-800">
          Join Group
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white p-6 w-[90%] max-w-lg rounded-lg shadow-lg animate-fadeIn">
            <form onSubmit={mySubmission}>
              <div className="flex flex-col items-center">
                <h2 className="mb-2 text-2xl font-semibold text-black">
                  Create Group
                </h2>

                {/* Inputs */}
                <div className="flex flex-col w-full space-y-3">
                  <div className="flex items-center w-full h-12 px-2 border rounded-md shadow-inner">
                    <input
                      type="text"
                      placeholder="Group name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full h-full outline-none border-none bg-transparent"
                    />
                  </div>

                  <div className="flex items-center w-full h-12 px-2 border rounded-md shadow-inner">
                    <input
                      type="text"
                      placeholder="Section"
                      required
                      value={section}
                      onChange={(e) => setSection(e.target.value)}
                      className="w-full h-full outline-none border-none bg-transparent"
                    />
                  </div>

                  <div className="flex items-center w-full h-12 px-2 border rounded-md shadow-inner">
                    <input
                      type="text"
                      placeholder="Subject"
                      required
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      className="w-full h-full outline-none border-none bg-transparent"
                    />
                  </div>

                  <div className="flex items-center w-full h-12 px-2 border rounded-md shadow-inner">
                    <input
                      type="text"
                      placeholder="Room"
                      required
                      value={room}
                      onChange={(e) => setRoom(e.target.value)}
                      className="w-full h-full outline-none border-none bg-transparent"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-row items-center justify-center w-full mt-4 space-x-6">
                  <span
                    onClick={() => setShowForm(false)}
                    className="flex items-center justify-center w-28 h-8 text-purple-700 cursor-pointer rounded-md hover:bg-gray-200"
                  >
                    Cancel
                  </span>
                  <button
                    type="submit"
                    className="flex items-center justify-center w-28 h-8 text-white bg-purple-700 rounded-md hover:bg-purple-800"
                  >
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Group;
