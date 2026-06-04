// ╔══════════════════════════════════════════════════════╗
// ║  createProducer()                                   ║
// ║  Purpose : create audio & video producers           ║
// ╠══════════════════════════════════════════════════════╣
// ║  STEP 1 : get audio & video tracks from stream      ║
// ║  STEP 2 : create audio producer                     ║
// ║  STEP 3 : create video producer                     ║
// ║  RETURN : audioProducer + videoProducer             ║
// ╚══════════════════════════════════════════════════════╝

const createProducer = (localStream, producerTransport) => {
  return new Promise(async (resolve, reject) => {

    try {
      // STEP 1: get audio & video tracks from local stream
      const audioTrack = localStream.getAudioTracks()[0];
      const videoTrack = localStream.getVideoTracks()[0];

      // STEP 2: create audio producer
      const audioProducer = await producerTransport.produce({
        track: audioTrack,
      });

      // STEP 3: create video producer
      const videoProducer = await producerTransport.produce({
        track: videoTrack,
      });

      // RETURN: send both producers back
      resolve({
        audioProducer,
        videoProducer,
      });

    } catch (err) {
      console.log("Error creating producers:", err);
      reject(err);
    }
  });
};

export default createProducer;