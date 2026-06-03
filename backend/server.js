//Requiring Dependencies
const express = require("express");
const socket  = require("socket.io");
const mediasoup = require("mediasoup");
const path = require("path");
const http = require("http");
const fs = require("fs");
const config = require("./config/config");


const createWorkers = require("./utilities/createWorker");
const Client = require("./classes/Client");
const Room = require("./classes/Room");
const getWorker = require("./utilities/getWorker");
const { generateRouterRtpCapabilities } = require("mediasoup/ortc");

//Using Dependencies
const app = express();
const httpServer = http.createServer(app);
const io = socket(httpServer,{
    cors:{
        origin:`http://localhost:5173`,
    }
})


//Global Variables
let workers = [];
let router = null;
let rooms = []; //array to store all activve rooms in it.


//Middlewares



const initMediasoup =  async()=>{    
    //Creating Worker
    workers = await createWorkers(); //arraya of total workers

    }


initMediasoup();//creating worker and router



//Socket events created to listen for clinet
io.on("connection",(socket)=>{
    let newRoom = false;
    console.log("connected: ",socket.id);
    let client ; //this client obj will be available to all socket listners
    const handshake = socket.handshake; //where auth token and query lives


//socket connect event
    socket.on("joinRoom",async({userName,roomName},ac)=>{
        try{

        
      client = new Client(userName,socket); //creating client obj from class
      
      let requestedRoom = rooms.find(room=>room.roomName == roomName);
      if(!requestedRoom){
        newRoom = true;
        //make a new room
        const workerToUse = await getWorker(workers); 
        requestedRoom = new Room(roomName,workerToUse); //creating room objc
         await requestedRoom.createRouter();  //creating router for room
         rooms.push(requestedRoom);//pushing room to master rooms array

      }   
      
      //add room to the Client obj
      client.room = requestedRoom;
      //add Client in the Room objc
      client.room.addClient(client);

      //add this socket to the socket room
      socket.join(client.room.roomName);

      ac(
        {
            routerRtpCapabilities : client.room.router.rtpCapabilities,
            newRoom,
        }
      )
    
    }catch(err){
        console.warn(err);

    }
    })
    
    
    

})//socket end






//Server
httpServer.listen(config.port, () => {
    console.log(`listening at ${config.port}`);
});        
        
        
        
        
        
        
        
    