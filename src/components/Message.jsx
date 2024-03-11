import serverBotAvatar from '@/assets/avatars/serverbot.png'

function Message({ messages, currentChannel, onlineUsers }) {
  return (
    <div className="m-2 pr-2 pl-2 overflow-auto ">
      {messages[currentChannel]?.map((message, index) => {
        const user = onlineUsers.find(u => u.userId === message.userId)
        const avatar = user ? user.avatar : serverBotAvatar

        return (
          <div
            key={index}
            className="border-b border-slate-200 dark:border-slate-800 pb-2 pt-2 flex"
          >
            <img
              src={avatar || serverBotAvatar}
              alt={message.username}
              className="w-10 h-10 rounded-full m-1 mr-2"
            />
            <div>
              <span className="text-indigo-500 font-semibold">{message.username}</span>
              <span className="text-sm mx-2 text-slate-500">
                {new Date(message.timestamp).toLocaleString()}
              </span>
              <div className="mr-4 text-sm md:text-base">{message.message || ''}</div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Message
