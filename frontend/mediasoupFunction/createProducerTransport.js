const createProducerTransport = async (socket) => {
  // server se transport params mango
  const producerTransportParams = await socket.emitWithAck("request-transport", {
    type: "producer",
  });

  console.log("transportParams: ", producerTransportParams);
};

export default createProducerTransport;
