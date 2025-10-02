import React from 'react';

const Sidebar = ({ chatSessions, activeChatId, handleSelectChat, handleCreateChat, sidebarOpen, toggleSidebar, handleDeleteChat }) => (
  <>
    {/* Overlay for mobile when sidebar is open */}
    {sidebarOpen && (
      <div className="fixed inset-0 bg-opacity-40 z-30 md:hidden" onClick={toggleSidebar} ></div>
    )}
    <div
      className={`fixed md:fixed top-0 left-0 h-full w-72 max-w-[90vw]  shadow-lg z-40 transition-transform duration-300
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0
        ${sidebarOpen ? 'block' : 'hidden'} md:block md:w-64 rounded-r-xl md:rounded-none`
      }
      style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <span className="font-bold text-lg">Chats</span>
        <button className="md:hidden" onClick={toggleSidebar}>
          <span className="text-xl">×</span>
        </button> 
      </div>
      <div className="p-4 border-b">
        <button
          className="border-2 border-white w-full bg-blue-500 text-white py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          onClick={handleCreateChat}
        >
          + New Chat
        </button>
      </div>
  <ul className=" p-2 md:p-2 space-y-2 overflow-y-auto max-h-[calc(100vh-140px)] overflow-x-hidden">
        {chatSessions.map((chat) => {
          const lastMsg = chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].text : '';
          return (
            <li
              key={chat.id}
              className={`relative w-full p-2 rounded flex items-center hover:bg-gray-100 ${activeChatId === chat.id ? 'bg-blue-100 font-bold' : ''}`}
            >
          <div
  className="flex-1 cursor-pointer pr-4 overflow-hidden"
  onClick={() => handleSelectChat(chat.id)}
>
  <div className="font-semibold truncate" title={chat.title}>
    {chat.title || "Untitled Chat"}
  </div>
  <div
    className="text-xs text-gray-500 truncate"
    title={lastMsg || "No messages yet"}
  >
    {lastMsg}
  </div>
</div>

              <button
                className="absolute right-2 top-1/2 -translate-y-1/2 text-red-500 hover:text-red-700 px-2 py-1 rounded"
                title="Delete chat"
                onClick={(e) => { e.stopPropagation(); handleDeleteChat(chat.id); }}
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

export default Sidebar;
