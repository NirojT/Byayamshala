// import { Client, Message } from '@stomp/stompjs';
// import { useEffect } from 'react';
// import { IGlobalStore } from './interface';
// import { useGlobalStore } from './store';
// import { host, tenantName } from './config';

// const useWebSocket = () => {
 
//   const brokerURL=`ws://${host}:9000/api/ws`;

 
  
//   const setSocketMsg=useGlobalStore((state:IGlobalStore)=>state.setSocketMessage);
//   useEffect(() => {
//     const client = new Client({
//       brokerURL: brokerURL,
//       debug: (str: string) => {
//         console.log(str);
//       },
//       connectHeaders: {
       
//         "X-Tenant":tenantName
//       },
//     });

//     client.activate();

//     client.onConnect = (frame) => {
//       console.log('Connected to WebSocket server', frame);
//       client.subscribe('/group', (message: Message) => {
        
//         setSocketMsg(message.body)
//       });

//       // You can send a message to the server if needed
//       // client.publish({ destination: '/app/someEndpoint', body: 'Hello, server!' });
//     };

//     return () => {
//       // Cleanup WebSocket connection on component unmount
//       client.deactivate();
//     };
//   }, []); // Empty dependency array ensures the effect runs only once

//   // You can return any values or functions that you want to expose to the component using this hook
// };

// export default useWebSocket;

















// // import React, { useEffect } from 'react';
// // import { Client, Message } from '@stomp/stompjs';

// // const WebSocketComponent: React.FC = () => {
// //   useEffect(() => {
   
// //     const client = new Client({
// //       brokerURL: 'ws://localhost:9000/ws',
// //       debug: (str: string) => {
// //         console.log(str);
// //       },
// //     });

// //     client.activate();

// //     client.onConnect = (frame) => {
// //       console.log('Connected to WebSocket server', frame);
// //       client.subscribe('/group', (message: Message) => {
// //         console.log('Received:', message.body);
// //       });

// //       // You can send a message to the server if needed
// //       // client.publish({ destination: '/app/someEndpoint', body: 'Hello, server!' });
// //     };

// //     return () => {
// //       // Cleanup WebSocket connection on component unmount
// //       client.deactivate();
// //     };
// //   }, []);

// //   return <div>WebSocket Example</div>;
// // };

// // export default WebSocketComponent;









































// // import Stomp from "stompjs";
// // // import { Client } from "@stomp/stompjs";
// // import SockJS from "sockjs-client";

// // const socket = new SockJS("http://192.168.88.249:9000/ws");
// // // const socket = new SockJS("http://localhost:9000/ws");
// // // const stompClient = new Client();

// //  const stompClient = Stomp.over(socket);

// // // const getCookie = (name: string) => {
// // //   const value = `; ${document.cookie}`;
// // //   const parts = value.split(`; ${name}`);
// // //   if (parts.length === 2) {
// // //     return parts.pop()?.split(";").shift();
// // //   }
// // // };

// // // const headers = {
// // //   Authorization: "Bearer " + localStorage.getItem("token"),
// // //   "X-XSRF-TOKEN": getCookie("XSRF-TOKEN"),
// // // };

// // export const connectWebSocket = () => {
// //   stompClient.connect(
// //     (frame: any) => {
// //       console.log("Connected to WebSocket");
// //       stompClient.subscribe("/group", (message: any) => {
// //         console.log("Received:", message.body);
// //       });
// //     },
// //     (error: any) => {
// //       console.error("Error connecting to WebSocket:", error);
// //     }
// //   );
// // };

// // export const disconnectWebSocket = () => {
// //   if (stompClient.connected) {
// //     stompClient.disconnect(() => {
// //       console.log("Disconnected from WebSocket");
// //     });
// //   }
// // };
