const config = require("./config");











//Function to create Transport
const getTransport = async (router) => {

  const transport = await router.createWebRtcTransport({
    enableTcp: true,
    enableUdp: true,
    preferUdp: true,
    listenInfos: [
      {
        protocol: 'udp',
        ip: config.sendTransport_Udp_ip,
      },
      {
        protocol: 'tcp',
        ip: config.sendTransport_Tcp_ip,
      }
    ]
  });


  //Params to sent cleint
  const clientTransportParams = {
    id             : transport.id,
    iceParameters  : transport.iceParameters,
    iceCandidates  : transport.iceCandidates,
    dtlsParameters : transport.dtlsParameters,
  };

  return { transport, clientTransportParams };
};



module.exports = getTransport;