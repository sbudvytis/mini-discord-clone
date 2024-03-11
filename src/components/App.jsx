import { useState } from 'react'
import { socket } from '@/libs/socket'
import { useSocket } from '@/hooks/useSocket'
import Message from './Message'
import Input from './Input'
import Header from './Header'
import Sidebar from './Sidebar'
import OnlineUsers from './OnlineUsers'
import { Flowbite } from 'flowbite-react'

function App() {
  const [inputMessage, setInputMessage] = useState('')
  const [usernameInput, setUsernameInput] = useState('')
  const [selectedAvatar, setSelectedAvatar] = useState(null)

  const { isConnected, channels, currentChannel, messages, onlineUsers, setCurrentChannel } =
    useSocket()

  const joinChannel = channelName => {
    socket.emit('message:channel:join', channelName)
    setCurrentChannel(channelName)
  }

  const sendMessage = () => {
    if (inputMessage.trim() !== '' && currentChannel) {
      socket.emit('message:channel:send', currentChannel, inputMessage)
      setInputMessage('')
    }
  }

  const handleConnectButtonClick = () => {
    if (usernameInput.trim() !== '') {
      socket.auth = { username: usernameInput }
      socket.connect()
    }
  }

  const handleDisconnectButtonClick = () => {
    socket.disconnect()
  }

  return (
    <Flowbite>
      <div className="flex h-screen text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-900 transition-all">
        <Sidebar
          channels={channels}
          joinChannel={joinChannel}
          isConnected={isConnected}
          handleConnectButtonClick={handleConnectButtonClick}
          handleDisconnectButtonClick={handleDisconnectButtonClick}
          usernameInput={usernameInput}
          setUsernameInput={setUsernameInput}
          selectedAvatar={selectedAvatar}
          setSelectedAvatar={setSelectedAvatar}
        />

        <div className="flex-1 flex flex-col justify-end">
          <Header currentChannel={currentChannel} isConnected={isConnected} />
          {isConnected && (
            <>
              <Message
                messages={messages}
                currentChannel={currentChannel}
                onlineUsers={onlineUsers}
              />

              <Input
                inputMessage={inputMessage}
                setInputMessage={setInputMessage}
                sendMessage={sendMessage}
                isConnected={isConnected}
                currentChannel={currentChannel}
              />
            </>
          )}
        </div>
        <OnlineUsers onlineUsers={onlineUsers} />
      </div>
    </Flowbite>
  )
}

export default App
