# Video Conferencing Task List

## User clicks on joinRoom
1.Run joinRoom socket.io event , send up userName and roomName

## Serverget joinRoom event
1.Make Client
2.If room does not exist
-get a worker
-create new room with it's own router
-add new room to mster rooms array

3.Add this Client to the room (whether it's new or not)
4.Add the room to the Client object for convienience
5.Add this socket to the socket.io
6.Eventually, we will need to get all current producers...  come back to this!
7.Send back routerCapabilities, and speaker/producer