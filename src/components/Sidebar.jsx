import { ChevronLast, ChevronFirst, Hash } from 'lucide-react'
import { DarkThemeToggle } from 'flowbite-react'
import { useExpand } from '@/hooks/useExpand'
import Connection from './Connection'
import { useState } from 'react'

function Sidebar({
  channels,
  joinChannel,
  isConnected,
  handleConnectButtonClick,
  handleDisconnectButtonClick,
  usernameInput,
  setUsernameInput,
  selectedAvatar,
  setSelectedAvatar,
}) {
  const [expanded, setExpanded] = useExpand()
  const [selectedChannel, setSelectedChannel] = useState('welcome')

  const handleChannelClick = channelName => {
    setSelectedChannel(channelName)
    joinChannel(channelName)
  }

  return (
    <aside
      className={`transition-all ${expanded ? 'w-64 bg-slate-100 dark:bg-slate-800 rounded-r-lg drop-shadow-3xl' : 'w-20'} ${window.innerWidth <= 768 ? 'fixed z-10' : ''} mt-4 mb-4`}
      style={{ height: 'calc(100vh - 2rem)' }}
    >
      <div className="h-full flex flex-col p-4">
        <div className="p-4 pt-2 flex justify-end items-center">
          <button
            onClick={() => setExpanded(curr => !curr)}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-900"
          >
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>

        {expanded && (
          <>
            <span className="flex mb-4 text-sm items-center justify-center font-semibold">
              Toggle dark mode <DarkThemeToggle className="ml-2" />
            </span>
            <span className="font-bold mb-4 text-xl">Channels </span>
            <ul className="flex-1 font-medium">
              {channels.map(channel => (
                <li
                  key={channel.name}
                  className={`flex p-2 mb-1 hover:bg-slate-200 dark:hover:bg-slate-900 cursor-pointer transition-all rounded-md ${
                    channel.name === selectedChannel ? 'bg-slate-200 dark:bg-slate-900' : ''
                  }`}
                  onClick={() => handleChannelClick(channel.name)}
                >
                  <Hash /> {channel.name}
                </li>
              ))}
            </ul>
            <Connection
              isConnected={isConnected}
              handleConnectButtonClick={handleConnectButtonClick}
              handleDisconnectButtonClick={handleDisconnectButtonClick}
              usernameInput={usernameInput}
              setUsernameInput={setUsernameInput}
              selectedAvatar={selectedAvatar}
              setSelectedAvatar={setSelectedAvatar}
            />
          </>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
