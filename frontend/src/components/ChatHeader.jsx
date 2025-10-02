import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';




const getInitialMode = () => {
  const storedMode = localStorage.getItem('theme');
  if (storedMode === 'dark' || storedMode === 'light') {
    return storedMode;
  }
  return 'light';
};

const ChatHeader = () => {
  const navigate  = useNavigate();
  // Track current mode, initialize from localStorage
  const [mode, setMode] = useState(getInitialMode);

  // Update theme and localStorage when mode changes
  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', mode);
  }, [mode]);

  return (
    <div className="flex justify-between px-4 pt-4 pb-2 border-b sticky top-0 z-10" style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <div>
        <h2 className="text-xl font-bold">NamkeenAI</h2>
        <span className="text-sm">Chat History</span>
      </div>
      <div className="flex flex-col gap-2 items-center">
        {mode === 'light' ? (
          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
            onClick={() => setMode('dark')}
            aria-label="Dark mode"
          >
            {/* Moon icon (SVG) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6" >
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
            </svg>
          </button>
        ) : (
          <button
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 focus:outline-none"
            onClick={() => setMode('light')}
            aria-label="Light mode"
          >
            {/* Sun icon (SVG) */}
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364-6.364l-1.414 1.414M6.05 17.95l-1.414 1.414M17.95 17.95l-1.414-1.414M6.05 6.05L4.636 7.464M12 8a4 4 0 100 8 4 4 0 000-8z" />
            </svg>
          </button>
        )}
      <div className='bg-blue-500 rounded p-2 border-2 border-white'>
        <button onClick={()=>navigate('/profile')}>

        <img src="../public/images/shield-user-fill.png" alt="" />
        </button>
      </div>
      </div>
    </div>
  );
};

export default ChatHeader;
