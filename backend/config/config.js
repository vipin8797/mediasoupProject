const config = {
  port: 3000,

  // Worker process settings. Keep the RTC port range open in the firewall.
  workerSettings: {
    rtcMinPort: 40000,
    rtcMaxPort: 41000,
    logLevel: "warn",
    logTags: [
      "info",
      "ice",
      "dtls",
      "rtp",
      "srtp",
      "rtcp",
      "score",
      "simulcast",
      "svc",
    ],
  },

  // Codecs supported by the room router.
  routerCodeInfo: [
    {
      kind: "audio",
      mimeType: "audio/opus",
      clockRate: 48000,
      channels: 2,
    },
    {
      kind: "video",
      mimeType: "video/H264",
      clockRate: 90000,
      parameters: {
        "packetization-mode": 1,
        "profile-level-id": "42e01f",
        "level-asymmetry-allowed": 1,
      },
    },
  ],

  // WebRTC transport settings sent to mediasoup.
  webRtcTransport: {
    // Local dev: bind on all interfaces, but announce localhost to the browser.
    // For LAN/public testing, replace announcedIp with the server's reachable IP.
    listenIps: [{ ip: "0.0.0.0", announcedIp: "127.0.0.1" }],

    initialAvailableOutgoingBitrate: 1000000,
    maxIncomingBitrate: 5000000,
  },
};

module.exports = config;
