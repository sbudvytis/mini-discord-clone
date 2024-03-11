import { Button, TextInput } from 'flowbite-react'
import { socket } from '@/libs/socket'
import avatar1 from '@/assets/avatars/avatar1.png'
import avatar2 from '@/assets/avatars/avatar2.png'
import avatar3 from '@/assets/avatars/avatar3.png'
import avatar4 from '@/assets/avatars/avatar4.png'
import avatar5 from '@/assets/avatars/avatar5.png'

const avatars = [avatar1, avatar2, avatar3, avatar4, avatar5]

function Connection({
  isConnected,
  handleConnectButtonClick,
  handleDisconnectButtonClick,
  usernameInput,
  setUsernameInput,
  selectedAvatar,
  setSelectedAvatar,
}) {
  const handleAvatarSelect = avatar => {
    setSelectedAvatar(avatar)
    socket.emit('user:avatar:select', avatar)
  }

  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      handleConnectButtonClick()
    }
  }

  return (
    <>
      <p className="text-center font-light pt-4">
        {isConnected ? 'You are connected' : 'You are not connected'}
      </p>
      {isConnected ? (
        <Button
          className="mt-4 font-semibold"
          outline
          gradientDuoTone="pinkToOrange"
          onClick={handleDisconnectButtonClick}
        >
          Disconnect
        </Button>
      ) : (
        <div className="pt-4">
          <span className="flex font-semibold mb-4 justify-center text-md">
            Select your avatar:
          </span>
          <div className="flex mb-4 justify-center">
            {avatars.map((avatar, index) => (
              <img
                key={index}
                src={avatar}
                alt={`Avatar ${index + 1}`}
                className={`w-8 h-8 rounded-full cursor-pointer m-1 ${selectedAvatar === avatar ? 'border-2 border-indigo-500' : ''}`}
                onClick={() => handleAvatarSelect(avatar)}
              />
            ))}
          </div>

          <TextInput
            type="text"
            placeholder="Enter your username"
            value={usernameInput}
            onKeyPress={handleKeyPress}
            onChange={e => setUsernameInput(e.target.value)}
          />

          <Button
            className="mt-4 w-full font-semibold"
            outline
            gradientDuoTone="purpleToBlue"
            onClick={handleConnectButtonClick}
          >
            Connect to Server
          </Button>
        </div>
      )}
    </>
  )
}

export default Connection
