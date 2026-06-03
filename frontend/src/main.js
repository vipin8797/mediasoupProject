
//Importing Dependencies
import './style.css'
import buttons from "../uiStuff/uiButtons";
import {Device} from 'mediasoup-client';
import { io } from "socket.io-client";
import createProducerTransport from '../mediasoupFunction/createProducerTransport';

//Global variables
let device = null;
let producerTransport = null;

//Using Dependencies
const socket = io("http://localhost:3000");
socket.on("connect",()=>{
  console.log(`connected: ${socket.id}`);
});


//Function to get User Media
const enableFeed = async () => {
    const localStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
    });

    buttons.localMediaLeft.srcObject = localStream;
    buttons.enableFeed.disabled = true;
    buttons.sendFeed.disabled = false;
    buttons.muteBtn.disabled = false;
}


// console.log("main.js rendered");





const joinRoom = async()=>{
  console.log("room joined clicked");
  const roomName = document .getElementById("room-input").value;
  const userName = document.getElementById("username").value;

  const response = await socket.emitWithAck("joinRoom",({roomName,userName}));
  device = new Device();
  await device.load({
    routerRtpCapabilities:response.routerRtpCapabilities,
  });
  // console.log(response);
  console.log(device);

//enabling UI buttons
buttons.control.classList.remove("d-none");

}



const sendFeed = async()=>{
  producerTransport = await createProducerTransport(socket);
}


buttons.joinRoom.addEventListener("click",joinRoom);
buttons.enableFeed.addEventListener("click",enableFeed);
buttons.sendFeed.addEventListener("click",enableFeed);
