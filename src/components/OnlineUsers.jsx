import { ChevronLast, ChevronFirst } from 'lucide-react'
import { useExpand } from '@/hooks/useExpand'
import defaultAvatar from '@/assets/avatars/serverbot.png'

function OnlineUsers({ onlineUsers }) {
  const [expanded, setExpanded] = useExpand()

  return (
    <aside
      className={`transition-all ${expanded ? 'w-64 bg-slate-100 dark:bg-slate-800 rounded-r-lg drop-shadow-3xl' : 'w-20'} md:relative fixed right-0 mt-4 mb-4 h-[calc(100vh-2rem)]`}
    >
      <div className="h-full flex flex-col p-4 overflow-auto">
        <div className="p-4 pt-2 flex items-center">
          <button
            onClick={() => setExpanded(curr => !curr)}
            className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-900"
          >
            {expanded ? <ChevronLast /> : <ChevronFirst />}
          </button>
        </div>

        {expanded && (
          <>
            <span className="font-bold mb-4 text-xl">Users</span>
            <ul>
              {onlineUsers.map(user => (
                <li key={user.userId} className="p-2 mb-1 font-medium flex items-center">
                  <div className="relative">
                    <img
                      src={user.avatar || defaultAvatar}
                      alt={user.username}
                      className="w-9 h-9 rounded-full"
                    />
                    <span
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                        user.connected ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    ></span>
                  </div>
                  <span className="pl-2">{user.username}</span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </aside>
  )
}

export default OnlineUsers
