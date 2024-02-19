import { EMPTY } from 'rxjs';
import { isJSON } from 'class-validator';
import { WsAdapter } from '@nestjs/platform-ws';

export class AppWsAdapter extends WsAdapter {
  bindMessageHandler(buffer, handlers, transform) {
    try {
      const data = buffer.data;
      if (isJSON(data)) {
        const message = JSON.parse(data);
        const messageHandler = handlers.find(
          (handler) => handler.message === message.type,
        );
        const { callback } = messageHandler;
        return transform(callback(message));
      } else {
        if (data === 'SocketHeart') {
          const messageHandler = handlers.find(
            (handler) => handler.message === 'socket-heart',
          );
          const { callback } = messageHandler;
          return transform(callback(data));
        } else {
          return transform(() => {
            console.log(data);
          });
        }
      }
    } catch (error) {
      console.log('error', error);
      return EMPTY;
    }
  }
}
