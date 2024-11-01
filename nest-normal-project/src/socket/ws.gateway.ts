import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as WebSocket from 'ws';
import { IncomingMessage } from 'http';
import { v4 as uuidv4 } from 'uuid';

interface typeClient {
  client_id: string;
  source: string;
}

@WebSocketGateway(9090)
export class WsGateway {
  // 链接
  private clientArr: typeClient[] = [];
  // 存储的client
  private clientMap = new Map();
  // client Map
  private fileUUID = '';

  @WebSocketServer()
  server: WebSocket.Server;

  constructor() {
    //
  }

  // 处理链接成功
  async handleConnection(client: WebSocket, request: IncomingMessage) {
    console.log('链接成功');
    client.send(
      JSON.stringify({
        data: 'success',
      }),
    );
  }
  // 链接消失
  handleDisconnect(client: WebSocket) {
    client.close();
  }

  @SubscribeMessage('socket-heart')
  socketHeart(client: any, message: any) {
    this._clientSend(client, {
      data: '心跳已收到',
    });
  }

  /** 判断是否含有此链接
   *
   * @param client websocket链接
   * @param data 发送的数据
   * @returns bool
   */
  private _isHasClient(client: any, data: any) {
    return !!(
      client &&
      'client_id' in client &&
      this.clientMap.has(client['client_id']) &&
      'client_id' in data &&
      data.client_id === client['client_id']
    );
  }
  // 发送数据
  private _clientSend(client: any, data: any) {
    client.send(JSON.stringify(data));
  }
}
