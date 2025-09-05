import React, { useState, useEffect, useRef } from "react";
import { Users, ChevronDown, Paperclip, Send, Plus } from "lucide-react";

const letterColors: Record<string, { color: string; bg: string }> = {
  A: { color: "#0047AB", bg: "#B3D9FF" },
  B: { color: "#800080", bg: "#E6CCFF" },
  C: { color: "#006400", bg: "#B2FFB2" },
  D: { color: "#8B0000", bg: "#FFB3B3" },
  E: { color: "#FF8C00", bg: "#FFE0B3" },
  F: { color: "#2E8B57", bg: "#C2F0C2" },
  G: { color: "#800000", bg: "#FFCCCC" },
  H: { color: "#4682B4", bg: "#CCE5FF" },
  I: { color: "#708090", bg: "#E0E6EB" },
  J: { color: "#9932CC", bg: "#E5CCFF" },
  K: { color: "#FF1493", bg: "#FFCCE5" },
  L: { color: "#228B22", bg: "#CCFFCC" },
  M: { color: "#FF4500", bg: "#FFD6CC" },
  N: { color: "#2F4F4F", bg: "#D9E6E6" },
  O: { color: "#DAA520", bg: "#FFF0CC" },
  P: { color: "#191970", bg: "#CCCCFF" },
  Q: { color: "#B22222", bg: "#FFCCCC" },
  R: { color: "#0066CC", bg: "#CCE5FF" },
  S: { color: "#556B2F", bg: "#E5F0CC" },
  T: { color: "#FF6347", bg: "#FFD9D4" },
  U: { color: "#20B2AA", bg: "#CCF5F2" },
  V: { color: "#9400D3", bg: "#E0CCFF" },
  W: { color: "#A0522D", bg: "#F2D9CC" },
  X: { color: "#4682B4", bg: "#CCE0FF" },
  Y: { color: "#FFD700", bg: "#FFF7CC" },
  Z: { color: "#708090", bg: "#E6EBF0" },
};

type Message = {
  text: string;
  time: string;
};

type Group = {
  name: string;
  section: string;
  firstname: string;
  messages: Message[];
};

const GroupDetail: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [section, setSection] = useState<string>("");
  const [subject, setSubject] = useState<string>("");
  const [room, setRoom] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);
  const [toggle, setToggle] = useState<boolean>(false);
  const [inputmessage, setInputmessage] = useState<string>("");
  const [addgroup, setAddgroup] = useState<Group[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<Group | null>(null);

  const bottomRef = useRef<HTMLDivElement | null>(null);
  const currentTime = new Date().toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [addgroup]);

  const mymessages = () => {
    if (!inputmessage.trim() || !selectedGroup) return;
    const message: Message = { text: inputmessage, time: currentTime };

    setAddgroup((prev) =>
      prev.map((group) =>
        group.name === selectedGroup.name && group.section === selectedGroup.section
          ? { ...group, messages: [...group.messages, message] }
          : group
      )
    );

    setInputmessage("");
  };

  const addgroups = () => {
    const firstChar = name.charAt(0).toUpperCase();
    const groups: Group = {
      name,
      section,
      firstname: firstChar,
      messages: [],
    };
    setAddgroup((prev) => [...prev, groups]);
    setName("");
    setSection("");
    setRoom("");
    setSubject("");
  };

  return (
    <div className="flex flex-row mt-16 ml-5 h-screen">
      {/* Sidebar */}
      <div className="w-1/3 max-w-xs border-r-2 overflow-y-auto">
        <div
          className="flex items-center mt-5 px-3 py-2 cursor-pointer hover:bg-gray-300 rounded-lg"
          onClick={() => setToggle(!toggle)}
        >
          <Users />
          <p className="ml-4 mr-auto">Groups</p>
          <ChevronDown className={`${toggle ? "rotate-180" : ""} transition`} />
        </div>

        <div className="flex items-start mt-5">
          <button
            className="bg-blue-900 text-white w-10 h-9 flex items-center justify-center rounded-md cursor-pointer hover:w-14 transition-all"
            onClick={() => setShowForm(true)}
          >
            <Plus />
          </button>
        </div>

        {!toggle &&
          addgroup.map((e, i) => {
            const { color, bg } = letterColors[e.firstname] || {
              color: "#333",
              bg: "#ddd",
            };
            return (
              <div
                key={i}
                className="flex items-center mt-5 px-2 py-2 cursor-pointer hover:bg-gray-300 rounded-xl w-60"
                onClick={() => setSelectedGroup(e)}
              >
                <div
                  className="w-8 h-8 flex items-center justify-center rounded-full"
                  style={{ backgroundColor: bg, color }}
                >
                  {e.firstname}
                </div>
                <div className="ml-4">
                  <p>{e.name}</p>
                  <p className="text-xs">{e.section}</p>
                </div>
              </div>
            );
          })}
      </div>

      {/* Chat */}
      <div className="flex flex-col w-full">
        {selectedGroup && (
          <div className="flex items-center px-6 h-14 bg-gray-300 sticky top-0 z-10">
            <div
              className="w-10 h-10 flex items-center justify-center rounded-full font-bold"
              style={{
                backgroundColor: letterColors[selectedGroup.firstname]?.bg || "#ddd",
                color: letterColors[selectedGroup.firstname]?.color || "#333",
              }}
            >
              {selectedGroup.firstname}
            </div>
            <div className="ml-4">
              <p className="font-medium">{selectedGroup.name}</p>
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex flex-col flex-grow overflow-y-auto bg-gray-200 p-4">
          {selectedGroup &&
            addgroup
              .find(
                (g) =>
                  g.name === selectedGroup.name && g.section === selectedGroup.section
              )
              ?.messages.map((msg, i) => (
                <div
                  key={i}
                  className="bg-purple-700 text-white max-w-[60%] px-3 py-2 rounded-md mt-2 self-end"
                >
                  <p>{msg.text}</p>
                  <p className="text-xs text-right mt-1">{msg.time}</p>
                </div>
              ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="flex items-center justify-center h-14 bg-gray-300 px-4">
          <Paperclip className="cursor-pointer mr-3" />
          <textarea
            placeholder="Type a message"
            className="flex-grow outline-none resize-none p-2 rounded-md"
            rows={1}
            value={inputmessage}
            onChange={(e) => setInputmessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                mymessages();
              }
            }}
          />
          <Send className="cursor-pointer ml-3" onClick={mymessages} />
        </div>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg animate-fadeIn">
            <h2 className="text-2xl font-semibold mb-4">Create Group</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                addgroups();
                setShowForm(false);
              }}
              className="flex flex-col space-y-3"
            >
              <input
                className="border rounded-md px-3 py-2"
                type="text"
                placeholder="Group name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                className="border rounded-md px-3 py-2"
                type="text"
                placeholder="Section"
                required
                value={section}
                onChange={(e) => setSection(e.target.value)}
              />
              <input
                className="border rounded-md px-3 py-2"
                type="text"
                placeholder="Subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
              <input
                className="border rounded-md px-3 py-2"
                type="text"
                placeholder="Room"
                required
                value={room}
                onChange={(e) => setRoom(e.target.value)}
              />

              <div className="flex justify-between mt-4">
                <button
                  type="button"
                  className="px-4 py-2 text-purple-700 rounded hover:bg-gray-200"
                  onClick={() => setShowForm(false)}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupDetail;
