import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";

const colors = [
    '#FF5733', '#33FF57', '#3357FF', '#F1C40F', '#9B59B6', 
    '#E74C3C', '#1ABC9C', '#2ECC71', '#3498DB', '#34495E'
  ];

const ChatCard = () => {
    const [sender, setSender] = useState("Admin");
    const [userHistory, setUserHistory] = useState([]);
    const [selectedUserId, setSelectedUserId] = useState(null);
    const [users, setUsers] = useState();
    const [messages, setMessages] = useState([]);
    const [activeChat, setActiveChat] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset, setError } = useForm();

    const handleUserClick = (id) => {
      setActiveChat(true);
      setSelectedUserId(id);
    };

    useEffect(() => {
      const socket = new WebSocket(`ws://localhost:8080/messages/${sender}/${selectedUserId}`);
        socket.onopen = () => {
          console.log(`WebSocket connection opened between ${sender} and ${selectedUserId}`);
          socket.send(JSON.stringify({ type: 'getChatHistory', sender: sender, recipient: selectedUserId }));
        };
        socket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          //console.log(data);
          if (data.type === 'getChatHistory') {
            setUserHistory(data.chatHistory);
          }
          if (data.status === 'Message saved successfully') {
            setMessages((prevMessages) => [...prevMessages, data.savedMessage]);
          }
        };
        socket.onerror = (error) => {
          console.error('WebSocket error', error);
        };
        socket.onclose = () => {
          console.log('WebSocket connection closed');
        };
        return () => {
          socket.close();
        };
    }, [sender, selectedUserId, messages]);
    
    console.log("filter all data by user", userHistory);

    
    useEffect(() => {  
          const socket = new WebSocket('ws://localhost:8080/chatUser');
          socket.onopen = () => {
            console.log('WebSocket connection opened to /chatUser');
          };
          socket.onmessage = (event) => {
            const data = JSON.parse(event.data);
            if (data.type === 'uniqueSenders') {
              setUsers(data.users);
            } 
          };
          socket.onerror = (error) => {
            console.error('WebSocket error', error);
          };
          socket.onclose = () => {
            console.log('WebSocket connection closed');
          };
          return () => {
            socket.close();
          };
    }, [messages]);  

    console.log('ffffffffffffffffff=======', users)
    // Send chat using form
    const onSubmit = async (data) => {
      const socket = new WebSocket('ws://localhost:8080/messages');
        try {
          const messageData = { type: 'newMessage', sender: sender, recipient: selectedUserId, ...data};
          socket.onopen = () => {
            socket.send(JSON.stringify(messageData));
            console.log('Message sent:', messageData);
          };
          reset();
        } catch (error) {
          console.error("Error sending SMS:", error);
        }
      };

    const removeChat = () => {
      document.body.classList.remove('chatactive');
      setActiveChat(false);
    };

    return (
            <div className={`chat-app ${activeChat ? 'user-selected' : '' }`}>
                <div className="chat-title">
                    <div className="avataric">
                        <img src="https://www.pikpng.com/pngl/b/109-1099794_ios-emoji-emoji-iphone-ios-heart-hearts-spin.png" />
                    </div>
                    <div className="author-chat">
                        <h1>Bot</h1>
                        <h2>Online</h2>
                    </div>
                    <div className='chatclose' onClick={removeChat}></div>
                </div>
                <div className="messages-group">
                    <div className="messages-content">
                        <div className="mCustomScrollBox">
                            <div className="mCSB_container">
                               {userHistory && userHistory.map((item, ind) => {
                                const isSentByCurrentUser = item.sender === sender;
                                    return (
                                    <div className={`messagebx ${isSentByCurrentUser ? "outbox" : "inbox"}`} key={ind} >
                                        <div className="smsavatar">{item.message}</div> 
                                        <div className="timestamp">{new Date(item.timestamp).toLocaleString()}</div>
                                    </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='allmessage-user'>
                    <div className="allmessage-inn">
                    {users && users.map((data, ind) => {
                        // const firstLetter = data.charAt(0);
                        const firstLetter = 'A';
                        const backgroundColor = colors[ind % colors.length];
                        return (
                            <div className="allmessage-items" key={ind}  onClick={() => handleUserClick(data.sender)}>
                                <span className='userp-name' style={{ backgroundColor }}>{firstLetter}{data && data.online ? <em className="liveic live"></em> : <em className="liveic"></em>}</span>
                                <h4>{data.sender}</h4>
                            </div>
                    )})}
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="message-box" style={{ backgroundColor: errors.message ? '#ffe1e1' : 'white' }}>
                    <textarea required type="text" className="message-input" placeholder="Type message..." {...register("message", { required: 'This field is required',validate: {noWhitespace: value => value.trim() !== '' || 'Message cannot be only whitespace' } })}></textarea>
                    <button type="submit" className="message-submit">Send</button>
                </form> 
            </div>
        );
    }

export default ChatCard;
