import { useState, useEffect } from 'react'
import { socket } from '@/libs/socket'

export const useDiscordSockets = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [channels, setChannels] = useState([])
  const [currentChannel, setCurrentChannel] = useState('welcome')
  const [messages, setMessages] = useState({})
  const [onlineUsers, setOnlineUsers] = useState([])
  const [selectedAvatar, setSelectedAvatar] = useState(null)

  const handleAvatarSelect = avatar => {
    setSelectedAvatar(avatar)
    socket.emit('user:avatar:select', avatar)
  }

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('channels', receivedChannels => {
      setChannels(receivedChannels)
    })

    socket.on('user:avatar:update', ({ userId, avatar }) => {
      setOnlineUsers(prevUsers => {
        const updatedUsers = prevUsers.map(u => (u.userId === userId ? { ...u, avatar } : u))
        return updatedUsers
      })
    })

    const handleChannelMessage = (channel, message) => {
      setMessages(prevMessages => ({
        ...prevMessages,
        [channel]: [...(prevMessages[channel] || []), { channel, ...message }],
      }))
    }

    socket.on('message:channel', handleChannelMessage)
    socket.on('message:channel:send', handleChannelMessage)

    socket.on('users', users => {
      const sortedUsers = [...users].sort((a, b) => b.connected - a.connected)
      setOnlineUsers(sortedUsers)
    })

    socket.on('user:join', newUser => {
      setOnlineUsers(prevUsers => [...prevUsers, { ...newUser, connected: true }])
    })

    socket.on('user:disconnect', user => {
      setOnlineUsers(prevUsers => {
        const updatedUsers = prevUsers.map(u =>
          u.userId === user.userId ? { ...u, connected: false } : u,
        )
        return updatedUsers
      })
    })

    socket.on('previousMessages', previousMessages => {
      setMessages(previousMessages)
    })

    return () => {
      socket.off('connect', setIsConnected)
      socket.off('disconnect', setIsConnected)
      socket.off('channels', setChannels)
      socket.off('user:avatar:update', setOnlineUsers)
      socket.off('message:channel', handleChannelMessage)
      socket.off('message:channel:send', handleChannelMessage)
      socket.off('users', setOnlineUsers)
      socket.off('user:join', setOnlineUsers)
      socket.off('user:disconnect', setOnlineUsers)
      socket.off('previousMessages', setMessages)
    }
  }, [])

  return {
    isConnected,
    channels,
    currentChannel,
    messages,
    onlineUsers,
    setCurrentChannel,
    setMessages,
    selectedAvatar,
    handleAvatarSelect,
  }
}
