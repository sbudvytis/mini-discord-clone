import { TextInput, Button } from 'flowbite-react'

function Input({ inputMessage, setInputMessage, sendMessage, isConnected, currentChannel }) {
  const handleKeyPress = event => {
    if (event.key === 'Enter') {
      sendMessage()
    }
  }

  return (
    <div className="flex p-4 pb-8">
      <TextInput
        className="w-full"
        type="text"
        value={inputMessage}
        placeholder={`Message #${currentChannel || 'channel'}`}
        onChange={e => setInputMessage(e.target.value)}
        onKeyPress={handleKeyPress}
        disabled={!isConnected}
      />
      <Button
        className="focus:ring-0 font-semibold ml-2"
        outline
        gradientDuoTone="purpleToBlue"
        onClick={sendMessage}
        disabled={!isConnected}
      >
        Send
      </Button>
    </div>
  )
}

export default Input
