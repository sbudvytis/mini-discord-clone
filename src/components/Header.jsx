function Header({ currentChannel, isConnected }) {
  return (
    <div className="p-6 md:mt-0 mt-16">
      <div className="flex items-center justify-center bg-slate-500 w-16 h-16 rounded-full text-5xl text-white">
        #
      </div>
      <div className="text-3xl font-bold pt-5">
        {isConnected && currentChannel ? (
          <>
            Welcome to the <span className="text-indigo-500">{`#${currentChannel}`}</span> channel!
          </>
        ) : (
          'Please connect to the server!'
        )}
      </div>
      <div className="border-b border-slate-200 dark:border-slate-800 pt-4"></div>
    </div>
  )
}

export default Header
