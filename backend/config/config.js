//Configs used in code

const config = {
        port: 3000,
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
};

module.exports = config;
