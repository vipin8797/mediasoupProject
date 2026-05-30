
//Importing Dependencies
import './style.css'
import buttons from "../uiStuff/uiButtons";
import {Device} from 'mediasoup-client';
import { io } from "socket.io-client";


//Using Dependencies
const socket = io("http://localhost:3000");
socket.on("connect",()=>{
  console.log(`connected: ${socket.id}`);
});


console.log("main.js rendered");

const joinRoom = ()=>{
  console.log("room joined clicked");
  const roomName = document .getElementById("room-input").value;
  const userName = document.getElementById("username").value;
  console.log("username: ",userName);
  console.log("roomName: ",roomName);
}

buttons.joinRoom.addEventListener("click",joinRoom);

