import { ChevronLast, ChevronFirst } from 'lucide-react'
import { DarkThemeToggle } from 'flowbite-react'
import { useExpand } from '@/hooks/useExpand'
import Connection from './Connection'
import Channel from './Channel'
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
  handleAvatarSelect,
}) {
  const [expanded, setExpanded] = useExpand()
  const [selectedChannel, setSelectedChannel] = useState('welcome')

  const handleChannelClick = channelName => {
    setSelectedChannel(channelName)
    joinChannel(channelName)
  }

  return (
    <aside
      className={`transition-all ${expanded ? 'w-64 bg-slate-100 dark:bg-slate-800 rounded-r-lg drop-shadow-3xl' : 'w-20'} md:relative fixed z-10 mt-4 mb-4 h-[calc(100vh-2rem)]`}
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
            <Channel
              channels={channels}
              selectedChannel={selectedChannel}
              handleChannelClick={handleChannelClick}
            />
            <Connection
              isConnected={isConnected}
              handleConnectButtonClick={handleConnectButtonClick}
              handleDisconnectButtonClick={handleDisconnectButtonClick}
              usernameInput={usernameInput}
              setUsernameInput={setUsernameInput}
              selectedAvatar={selectedAvatar}
              handleAvatarSelect={handleAvatarSelect}
            />
          </>
        )}
      </div>
    </aside>
  )
}

export default Sidebar
