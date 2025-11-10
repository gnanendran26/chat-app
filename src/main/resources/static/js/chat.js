let stompClient = null;
let username = null;

function connect() {
    // Note: The /chat-websocket endpoint must be configured on your server
    const socket = new SockJS('/chat-websocket');
    stompClient = Stomp.over(socket);
    stompClient.connect({}, function() {
        stompClient.subscribe('/topic/messages', function(msg) { 
            showMessage(JSON.parse(msg.body)); 
        });
        stompClient.subscribe('/topic/online', function(msg) { 
            updateOnlineUsers(JSON.parse(msg.body)); 
        });
    });
}

function sendMessage() {
    // --- UPDATED LOGIC FOR USERNAME HANDLING & UI ---
    if (!username) {
        username = document.getElementById('username').value.trim();
        if (!username) { alert("Enter your name"); return; }
        
        // Hide the name prompt and focus on the message box
        document.getElementById('usernamePrompt').classList.add('d-none');
        document.getElementById('message').focus();
        
        // Notify the server that the user has joined
        stompClient.send("/app/online", {}, username);
    }
    // --- END UPDATED LOGIC ---
    
    const text = document.getElementById('message').value.trim();
    if (!text) return;
    
    // Send the actual message
    stompClient.send("/app/send", {}, JSON.stringify({from: username, text: text}));
    document.getElementById('message').value = '';
}

function showMessage(message) {
    const li = document.createElement("li");
    
    // --- UPDATED LOGIC FOR BUBBLE STYLING ---
    if (message.from === username) {
        li.classList.add("message-self");
        // For self-messages, display the time/status only
        li.innerHTML = `<small class="text-white-50">${message.time}</small>: ${message.text}`; 
    } else {
        li.classList.add("message-other");
        // For others' messages, display name, time, and text
        li.innerHTML = `<strong>${message.from}</strong> <small class="text-muted">${message.time}</small>: ${message.text}`;
    }
    // --- END UPDATED LOGIC ---
    
    const messagesDiv = document.getElementById("messages");
    messagesDiv.appendChild(li);
    messagesDiv.scrollTop = messagesDiv.scrollHeight; // Scroll to bottom
}

function updateOnlineUsers(users) {
    const usersDiv = document.getElementById("users");
    usersDiv.innerHTML = '';
    users.forEach(u => { 
        const li = document.createElement("li"); 
        // Highlight the current user in the list
        if (u === username) {
            li.innerHTML = `<strong>${u} (You)</strong>`;
        } else {
            li.textContent = u; 
        }
        li.classList.add('py-1');
        usersDiv.appendChild(li); 
    });
}

connect();