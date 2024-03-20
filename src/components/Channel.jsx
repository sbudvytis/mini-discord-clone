import { Hash } from 'lucide-react'

function Channel({ channels, selectedChannel, handleChannelClick }) {
  return (
    <>
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
    </>
  )
}

export default Channel
