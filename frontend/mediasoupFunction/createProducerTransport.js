

const createProducerTransport  = (socket)=>{
    Promise(async(resolve,reject)=>{
        //server se transport params mango
   const producerTranportParams = await socket.emitWithAck("request-transport",{type:'producer'});

    })
}


export default createProducerTransport;