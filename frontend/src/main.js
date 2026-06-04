// ════════════════════════════════════════
//  main.js
//  Purpose : App entry point — socket, 
//            device, transport setup
// ════════════════════════════════════════


// ── Dependencies ─────────────────────────
import './style.css'
import buttons from "../uiStuff/uiButtons";
import { Device } from 'mediasoup-client';
import { io } from "socket.io-client";
import createProducerTransport from '../mediasoupFunction/createProducerTransport';


// ── Global Variables ──────────────────────
let device = null;
let producerTransport = null;


// ── Socket Init ───────────────────────────
const socket = io("http://localhost:3000");
socket.on("connect", () => {
  console.log(`connected: ${socket.id}`);
});


// ── enableFeed() ──────────────────────────
// Camera stream lo aur UI update karo
const enableFeed = async () => {
  const localStream = await navigator.mediaDevices.getUserMedia({
    video: true,
    // audio: true,
  });

  buttons.localMediaLeft.srcObject = localStream;
  buttons.enableFeed.disabled = true;
  buttons.sendFeed.disabled = false;
  buttons.muteBtn.disabled = false;
};


// ── joinRoom() ────────────────────────────
// Room join karo, device load karo
const joinRoom = async () => {
  const roomName = document.getElementById("room-input").value;
  const userName = document.getElementById("username").value;

  const response = await socket.emitWithAck("joinRoom", { roomName, userName });

  device = new Device();
  await device.load({ routerRtpCapabilities: response.routerRtpCapabilities });

  buttons.control.classList.remove("d-none");
};


// ── sendFeed() ────────────────────────────
// ProducerTransport banao aur stream bhejo
const sendFeed = async () => {
  producerTransport = await createProducerTransport(socket, device);
  console.log("producerTransport: ", producerTransport);
};


// ── Event Listeners ───────────────────────
buttons.joinRoom.addEventListener("click", joinRoom);
buttons.enableFeed.addEventListener("click", enableFeed);
buttons.sendFeed.addEventListener("click", sendFeed);