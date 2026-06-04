const config = require("../config/config");

class Client {
  constructor(userName, socket) {
    this.userName = userName;
    this.socket = socket;

    this.upstreamTransport = null;
    //we will have an audio and video consumer
    this.producer = {};

    this.downstreamTransport = [];
    this.consumer = [];
    this.room = null;
  }
  addTransport(type) {
    return new Promise(async (resolve, reject) => {
      const {
        listenIps,
        initialAvailableOutgoingBitrate,
        maxIncomingBitrate,
      } = config.webRtcTransport;

      //creating transport and router will get from Room object
      const transport = await this.room.router.createWebRtcTransport({
        listenIps,
        initialAvailableOutgoingBitrate,
        enableUdp: true,
        enableTcp: true,
        preferUdp: true,
      });

      //setting Bandthwidth Limit
      if (maxIncomingBitrate) {
        try {
          await transport.setMaxIncomingBitrate(maxIncomingBitrate);
        } catch (err) {
          console.log("Error setting Bitetarate:", err);
        }
      }

      //storing transport according to type
      if (type === "producer") {
        this.upstreamTransport = transport;
      } else if (type === "consumer") {
        this.downstreamTransport = transport;
      }

      //sending params to client
      const clientTransportParams = {
        id: transport.id,
        iceParameters: transport.iceParameters,
        iceCandidates: transport.iceCandidates,
        dtlsParameters: transport.dtlsParameters,
      };

      resolve(clientTransportParams); //sending params
    });
  }
}

module.exports = Client;
