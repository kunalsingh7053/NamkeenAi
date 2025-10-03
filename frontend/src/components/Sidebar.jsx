import React from "react";
import { Menu, X } from "lucide-react";

const Sidebar = ({
  chatSessions,
  activeChatId,
  handleSelectChat,
  handleCreateChat,
  sidebarOpen,
  toggleSidebar,
  handleDeleteChat,
}) => {
  return (
    <>
      {/* Overlay when sidebar is open (mobile only) */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={toggleSidebar}
        ></div>
      )}

      {/* Hamburger Button (only visible when sidebar is closed in mobile) */}
      {!sidebarOpen && (
        <button
          className="fixed top-4 left-4 z-50 md:hidden p-2 rounded-lg bg-gray-200 dark:bg-gray-800 shadow"
          onClick={toggleSidebar}
        >
          <Menu size={24} />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-72 max-w-[90vw] shadow-lg z-40 transition-transform duration-300
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
        ${sidebarOpen ? "block" : "hidden"} md:block md:w-64`}
        style={{
          background: "var(--color-bg)",   // ✅ same as homepage
          color: "var(--color-text)",      // ✅ text sync with theme
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-4 border-b"
          style={{ borderColor: "var(--color-border)" }} // ✅ theme-based border
        >
          <span className="font-bold text-lg">Chats</span>

          {/* Close button (mobile only) */}
          <button
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            onClick={toggleSidebar}
          >
            <X size={22} />
          </button>
        </div>

        {/* New Chat */}
        <div
          className="p-4 border-b"
          style={{ borderColor: "var(--color-border)" }}
        >
          <button
            className="w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
            onClick={handleCreateChat}
          >
            + New Chat
          </button>
        </div>

        {/* Chat List */}
        <ul className="p-2 space-y-2 overflow-y-auto max-h-[calc(100vh-140px)]">
          {chatSessions.map((chat) => {
            const lastMsg =
              chat.messages.length > 0
                ? chat.messages[chat.messages.length - 1].text
                : "";

            return (
              <li
                key={chat.id}
                className={`relative w-full p-3 rounded-lg flex items-center justify-between cursor-pointer transition
                  hover:bg-gray-100 dark:hover:bg-gray-800
                  ${
                    activeChatId === chat.id
                      ? "bg-blue-100 dark:bg-blue-800 font-bold"
                      : ""
                  }`}
                onClick={() => handleSelectChat(chat.id)}
              >
                <div className="flex-1 pr-2 overflow-hidden">
                  <div className="font-semibold truncate" title={chat.title}>
                    {chat.title || "Untitled Chat"}
                  </div>
                  <div
                    className="text-xs text-gray-500 dark:text-gray-400 truncate"
                    title={lastMsg || "No messages yet"}
                  >
                    {lastMsg || "No messages yet"}
                  </div>
                </div>

                {/* Delete button */}
                <button
                  className="text-red-500 hover:text-red-700 ml-2"
                  title="Delete chat"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteChat(chat.id);
                  }}
                >
                  ❌
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
