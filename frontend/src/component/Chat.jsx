import React, {useState} from 'react'

const Chat = ({socket}) => {
    const [message, setMessage] = useState("")
    const [allmessage, setallMessage] = useState([])
    console.log(socket);
    const SendChat = () =>{
        console.log(message);
        socket.emit("sendchat", message)
    }

    socket.on("recievemessage",(newmessage)=>{
       console.log(newmessage);
       setallMessage([...allmessage, newmessage])
    })
  return (
    <div>
     <input onChange={(e)=>setMessage(e.target.value)} type="text" />
     <button onClick={SendChat}>Send Message</button>
       <div>
        {allmessage.map((message)=>(
            <h1>{message}</h1>
        ))}
       </div>
    </div>
  )
}

export default Chat