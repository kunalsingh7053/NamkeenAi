import React from 'react';

const ChatInput = ({ input, setInput, handleSend }) => (
  <form onSubmit={handleSend} className="w-full px-2 py-2 md:px-4 md:py-4  border-t flex items-center gap-1 md:gap-2" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
    <input
      type="text"
      className="flex-1 px-2 py-2 md:px-4 md:py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm md:text-base"
      placeholder="Type your message..."
      value={input}
      onChange={(e) => setInput(e.target.value)}
      autoFocus
    />
    <button
      type="submit"
      className="border-2 border-white bg-blue-500 text-white px-3 py-2 md:px-4 md:py-2 rounded-lg font-semibold hover:bg-blue-600 transition text-sm md:text-base"
    >
      Send
    </button>
  </form>
);

export default ChatInput;
