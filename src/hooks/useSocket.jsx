import { useState, useEffect } from 'react'
import { socket } from '@/libs/socket'

export const useSocket = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [channels, setChannels] = useState([])
  const [currentChannel, setCurrentChannel] = useState('welcome')
  const [messages, setMessages] = useState({})
  const [onlineUsers, setOnlineUsers] = useState([])

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

    return () => {
      socket.off('connect')
      socket.off('disconnect')
      socket.off('channels')
      socket.off('user:avatar:update')
      socket.off('message:channel')
      socket.off('message:channel:send')
      socket.off('users')
      socket.off('user:join')
      socket.off('user:disconnect')
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
  }
}
