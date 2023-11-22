import { publicEnv } from "@/lib/env/public";
import { io } from "socket.io-client";


export const socket = io(publicEnv.NEXT_PUBLIC_SOCKET_URL);