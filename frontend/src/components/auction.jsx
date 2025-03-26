import React, { useEffect, useState, useRef, useCallback } from "react";
import "../Auction.css";
import "bootstrap-icons/font/bootstrap-icons.css";

const Auction = () => {
  const [messages, setMessages] = useState([]);
  const [currentBid, setCurrentBid] = useState("");
  const [currentMessage, setCurrentMessage] = useState("");
  const [isChatboxOpen, setIsChatboxOpen] = useState(false);
  const socketRef = useRef(null);
  const bidSocketRef = useRef(null);
  const chatMessagesRef = useRef(null);
  const csrfToken = document.cookie.split("=")[1];
  const [l_user, setLuser] = useState({});
  const [auctionData, setAuctionData] = useState([]);
  const [maxBid , setMaxBid ] = useState([]);

  // Fetch auctions with error handling
  const fetchAuctions = useCallback(() => {
    fetch("http://18.212.69.90:8080/API/auction-items", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch auctions");
        }
        return response.json();
      })
      .then((data) => {
        if (Array.isArray(data)) {
          setAuctionData(data);
        } else {
          console.error("Invalid data format:", data);
        }
      })
      .catch((error) => {
        console.error("Error fetching auctions:", error);
        setAuctionData([]);  // Set to empty array in case of error
      });
  }, [csrfToken]);

  // Fetch user data
  const Get_User = useCallback(() => {
    fetch('http://18.212.69.90:8080/API/get_user', {
      method: 'GET',
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setLuser(data);
      })
      .catch((error) => console.error("Error fetching user:", error));
  }, [csrfToken]);

  const toggleChatbox = () => setIsChatboxOpen(!isChatboxOpen);

  // WebSocket for chat
  useEffect(() => {
    socketRef.current = new WebSocket("http://18.212.69.90:8080/ws/chat_auction/general/");
  
    socketRef.current.onmessage = (event) => {
      const receivedData = JSON.parse(event.data);
      if (receivedData.type === 'history') {
        setMessages((prevMessages) => {
          const historyMessages = receivedData.data;
          const updatedMessages = [...historyMessages, ...prevMessages];
          return updatedMessages.slice(-10);
        });
      } else {
        setMessages((prevMessages) => {
          const updatedMessages = [...prevMessages, receivedData];
          if (updatedMessages.length > 10) {
            updatedMessages.shift();
          }
          return updatedMessages;
        });
      }
    };
  
    socketRef.current.onopen = () => {
      console.log("WebSocket connected for chat");
      const fetchHistoryMessage = { type: "fetch_history" };
      socketRef.current.send(JSON.stringify(fetchHistoryMessage));
    };
  
    socketRef.current.onclose = () => console.log("WebSocket disconnected for chat");
  
    return () => {
      if (socketRef.current) socketRef.current.close();
    };
  }, []);

  useEffect(() => {
    bidSocketRef.current = new WebSocket("ws://localhost:8080/ws/bid_auction/1/");
  
    bidSocketRef.current.onopen = () => {
      console.log("WebSocket connected for bidding");
  
      bidSocketRef.current.send(
        JSON.stringify({
          type: "auc_history",
        })
      );
    };
  

    bidSocketRef.current.onmessage = (event) => {

      const receivedData = JSON.parse(event.data);
  
      if (receivedData.type === "auc_history") {
        // Update state with the auction history data
        setMaxBid(receivedData);
      } else if (receivedData.type === "bid") {
        // Handle incoming bid updates
        console.log("New bid received:", receivedData);
        setMaxBid(receivedData);
  
        // Optionally request the latest auction history after receiving a bid
        bidSocketRef.current.send(
          JSON.stringify({
            type: "auc_history",
          })
        );
      }
    };
  
    bidSocketRef.current.onclose = () => {
      console.log("WebSocket disconnected for bidding");
    };
  
    return () => {
      if (bidSocketRef.current) bidSocketRef.current.close();
    };
  }, []);
  

  const sendMessage = (e) => {
    e.preventDefault();
    
    // Ensure message is not empty and WebSocket is open
    if (currentMessage.trim() !== "" && socketRef.current.readyState === WebSocket.OPEN) {
      const messageData = {
        message: currentMessage,
        sender: l_user.id,
      };
  
      // Send the message through WebSocket
      socketRef.current.send(JSON.stringify(messageData));
  
      // Clear input field
      setCurrentMessage("");
  
      // Request the latest auction history after sending the message
      bidSocketRef.current.send(
        JSON.stringify({
          type: "auc_history",
        })
      );
  
      // Fetch chat history after sending the message
      setTimeout(() => {
        const fetchHistoryMessage = { type: "fetch_history" };
        socketRef.current.send(JSON.stringify(fetchHistoryMessage));
      }, 500); // Add a small delay to ensure the server processes the message
    }
  };
  
  const placeBid = (e, auctionId, highestBid) => {
    e.preventDefault();

    if (parseFloat(currentBid) <= parseFloat(highestBid)) {
      alert("Your bid must be higher than the current highest bid.");
      return;
    }

    if (currentBid.trim() !== "" && bidSocketRef.current.readyState === WebSocket.OPEN) {
      const bidData = {
        auctionId : auctionId , 
        bid: currentBid,
        user: l_user.id,
      };
      bidSocketRef.current.send(JSON.stringify(bidData));


      bidSocketRef.current.send(
        JSON.stringify({
          type: "auc_history", 
        })
      );


      setCurrentBid("");
    }
  };

  useEffect(() => {
    fetchAuctions();
  }, [fetchAuctions]);

  useEffect(() => {
    Get_User();
  }, [Get_User]);

  useEffect(() => {
    if (chatMessagesRef.current) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="root-container d-flex flex-column">
      <div className="auction-container container mt-5" style={{ paddingLeft: 0, paddingRight: 0 }}>
        <div className="row m-0">
          {auctionData.length > 0 ? auctionData.map((auctionItem) => (
            <div className="col-12 mb-4 p-0" key={auctionItem.id}>
              <div className="card shadow-lg" style={{ height: "70vh", borderRadius: "15px", width: "100%" }}>
                <div className="row g-0 h-100">
                  <div className="col-md-6">
                    <img
                      src={`http://localhost:8000${auctionItem.image}`}
                      alt={auctionItem.item_name}
                      className="img-fluid rounded-start h-100"
                      style={{ objectFit: "cover", borderRadius: "15px", width: "100%", height: "100%" }}
                    />
                  </div>
                  <div className="col-md-6 d-flex">
                    <div className="card-body d-flex flex-column justify-content-between h-100" style={{ padding: "30px" }}>
                      <div>
                        <h3 className="card-title text-primary">{auctionItem.item_name}</h3>
                        <hr />
                        <p className="card-text text-muted">{auctionItem.description}</p>
                        <hr />
                        <p className="card-text"><strong>Base Price:</strong> <span className="text-success">${auctionItem.base_price}</span></p>
                        <p className="card-text"><strong>Auction Ends At:</strong> <span className="text-danger">{new Date(auctionItem.end_time).toLocaleString()}</span></p>
                        <div className="mt-3">
                          <strong>Current Bid:</strong>
                          <span className="text-warning">${maxBid.max_bid || auctionItem.base_price}</span>

                          <br />

                          <hr />

                          <br />

                         {maxBid.user && (
                            <p className="text-muted mt-2">
                              <strong className="text-success">Highest Bidder:</strong> 
                              <span className="badge bg-warning p-2" style={{ fontSize: '1.2em', fontWeight: 'bold' , margin : '10px' }}>
                                {maxBid.user}
                              </span>
                            </p>
                          )}

                          <hr />
                          <div className="input-group">
                            <input
                              type="number"
                              className="form-control"
                              value={currentBid}
                              onChange={(e) => setCurrentBid(e.target.value)}
                              placeholder="Place a bid"
                              min={auctionItem.base_price}
                            />
                            <button
                              className="btn btn-primary"
                              onClick={(e) => placeBid(e, auctionItem.id, maxBid.max_bid || auctionItem.base_price)}
                            >
                              Place Bid
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )) : <p>No auctions available.</p>}
        </div>
      </div>

      
      {/* Add Chatbox here */}
      <div className="chat-container" style={{ position: "fixed", bottom: 20, left: 20   }}>
  <div className="chat-box-container">
    {/* Chat Toggle Button */}
    <button onClick={toggleChatbox} className="btn btn-outline-primary">
      <i className="bi bi-chat-square-dots"></i> Chat
    </button>

    {/* Chatbox */}
    {isChatboxOpen && (
      <div
        className="chatbox border rounded shadow bg-light"
        style={{
          position: "absolute",
          bottom: 0,
          left: "100%", // Opens to the right of the button
          marginLeft: "10px",
          width: "600px",
          height : "600px"
        }}
      >
        {/* Chat Header */}
        <div className="chatbox-header bg-primary text-white p-2 d-flex justify-content-between align-items-center">
          <h5 className="m-0">Chat</h5>
          <button className="btn btn-sm btn-light" onClick={toggleChatbox}>
            <i className="bi bi-x"></i>
          </button>
        </div>

        {/* Chat Body */}
        <div
          className="chatbox-body p-3"
          ref={chatMessagesRef}
          style={{
            height: "450px",
            overflowY: "auto",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
          }}
        >
          {messages.length > 0 ? (
            messages.map((msg, index) => (
              <div key={index} className="chat-message">
                <span className="chat-sender-name text-primary fw-bold" style={{textAlign : "left"}}>{msg.sender}</span>
                <div className="chat-message-bubble border bg-white p-2 rounded" >
                  {msg.message}
                </div>
                <span className="chat-timestamp text-muted small" style={{textAlign : "left"}}> 
                  {new Date(msg.datetime).toLocaleTimeString()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-muted">No messages</p>
          )}
        </div>

        {/* Chat Footer */}
        <div className="chatbox-footer p-2 bg-light border-top">
          <form onSubmit={sendMessage} className="d-flex align-items-center gap-2">
            <input
              type="text"
              className="form-control"
              placeholder="Type a message..."
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
            />
            <button type="submit" className="btn btn-primary">
              <i className="bi bi-send"></i>
            </button>
          </form>
        </div>
      </div>
    )}
  </div>
</div>

    </div>
  );
};

export default Auction;
