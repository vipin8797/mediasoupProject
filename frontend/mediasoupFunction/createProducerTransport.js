// ╔══════════════════════════════════════════════════════╗
// ║  createProducerTransport()                          ║
// ║  Purpose : Create WebRTC Send Transport             ║
// ╠══════════════════════════════════════════════════════╣
// ║  STEP 1 : Request transport params from server      ║
// ║  STEP 2 : Create Producer Transport                 ║
// ║  STEP 3 : 'connect' event                           ║
// ║           - Send DTLS params to server              ║
// ║           - Server connects transport               ║
// ║           - callback() completes connection         ║
// ║                                                     ║
// ║  STEP 4 : 'produce' event                           ║
// ║           - Send kind + RTP params to server        ║
// ║           - Server creates Producer                 ║
// ║           - Producer id returned via callback       ║
// ║                                                     ║
// ║  RETURN : Producer Transport                        ║
// ╚══════════════════════════════════════════════════════╝

const createProducerTransport = (socket, device) => {
  return new Promise(async (resolve, reject) => {
    try {
      // STEP 1: get transport params from server
      const producerTransportParams = await socket.emitWithAck(
        "request-transport",
        {
          type: "producer",
        },
      );

      console.log("transportParams:", producerTransportParams);

      // STEP 2: create send transport
      const producerTransport = device.createSendTransport(
        producerTransportParams,
      );

      // STEP 3: transport connect event
      producerTransport.on(
        "connect",
        async ({ dtlsParameters }, callback, errback) => {
          try {
            const resp = await socket.emitWithAck("connect-transport", {
              dtlsParameters,
              type: "producer",
            });

            if (resp === "ok") {
              callback();
            } else {
              errback();
            }
            // console.log("connet event");
          } catch (err) {
            errback(err);
          }
        },
      );

      // STEP 4: producer creation event
      producerTransport.on(
        "produce",
        async ({ kind, rtpParameters }, callback, errback) => {
          try {
            // console.log("produce event");
            const producerId = await socket.emitWithAck("start-producing", {
              kind,
              rtpParameters,
            });

            if (!producerId || producerId === "error") {
              return errback();
            }
 
            callback({ id: producerId });
          } catch (err) {
            errback(err);
          }
        },
      );

      resolve(producerTransport);
    } catch (err) {
      reject(err);
    }
  });
};

export default createProducerTransport;
