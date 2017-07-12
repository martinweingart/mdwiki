import * as io from '../../../node_modules/socket.io-client';
import { Config } from '../Config';
export const socket = io.connect(`http://${Config.host}:${Config.port}`);
