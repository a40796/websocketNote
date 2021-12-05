const express = require('express');
const app = express();
const server =  require('http').createServer(app);
const WebSocket = require('ws');

const wss = new WebSocket.Server({server:server});

wss.on('connection',function connection(ws){
    console.log('a new client connected!');
    ws.send('welcome new client');
    ws.on('message',function incoming(message){
        console.log('received: %s',message);
        ws.send(`your message is ${message}`);
        // user can contact each other 
        wss.clients.forEach(function (client){
            const bufferMsg = Buffer.from(message).toString();
            if(client !== ws && client.readyState === WebSocket.OPEN){
                client.send(bufferMsg)
            }
        })  
    })
})

app.get('/',(req,res)=>{
    res.send(`you are on the homepage when ${new Date()}`)
})

server.listen(3000,()=>{
    console.log('Listeng on port:3000');
})