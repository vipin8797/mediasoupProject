









// ╔══════════════════════════════════════════════════════╗
// ║  createProducerTransport()                           ║
// ║  Purpose : creating WebRtc upstream Transport        ║
// ╠══════════════════════════════════════════════════════╣
// ║  STEP 1  : emit 'request-transport' → get            ║
// ║            transport params from backend             ║
// ║  STEP 2  : create producer from params               ║
// ║  STEP 3  : 'connect'  event → connection establish   ║
// ║  STEP 4  : 'produce'  event → upstream media send    ║
// ║  RETURN  : ProducerTransport export                  ║
// ╚══════════════════════════════════════════════════════╝

const createProducerTransport = (socket, device) => {
  // NOTE: new Promise() hoga, sirf Promise() nahi
  return new Promise(async (resolve, reject) => {

    // STEP 1: ask server params to create ProducerTransport
    const producerTransportParams = await socket.emitWithAck("request-transport", { type: "producer" });
    console.log("transportParams: ", producerTransportParams);

    // STEP 2:  create producerTransport 
    const producerTransport = await device.createSendTransport(producerTransportParams);

    // STEP 3: 'connect' event
    producerTransport.on("connect", async ({ dtlsParameters }, callback, errback) => {
      // TODO: socket se connectTransport call karni hai yahan
    });

    // STEP 4: 'produce' event
    // NOTE: callback and errback order matters.
    producerTransport.on("produce", async ({ kind, rtpParameters }, callback, errback) => {
      // TODO: socket se produce call karni hai, callback mein id bhejna hai
    });

    resolve(producerTransport);
  });
};

export default createProducerTransport;