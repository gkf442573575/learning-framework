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

@WebSocketGateway()
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
    const client_id = uuidv4();
    client['client_id'] = client_id;
    this.clientMap.set(client_id, client);
    this.clientArr.push({
      client_id,
      source: '',
    });
    client.send(
      JSON.stringify({
        type: 'server-client',
        data: {
          client_id,
        },
      }),
    );
  }
  // 链接消失
  handleDisconnect(client: WebSocket) {
    if (
      client &&
      'client_id' in client &&
      this.clientMap.has(client['client_id'])
    ) {
      // 移除链接
      const clientId = client['client_id'];
      this.clientMap.delete(clientId);
      const clientIndex = this.clientArr.findIndex(
        (item) => item.client_id === clientId,
      );
      if (clientIndex > -1) {
        this.clientArr.splice(clientIndex, 1);
        return;
      }
    }
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
