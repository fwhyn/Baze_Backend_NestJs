import {
  ClientProxy,
  ClientProxyFactory,
  Transport,
} from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

class UserClient {
  private client: ClientProxy;

  constructor() {
    this.client = ClientProxyFactory.create({
      transport: Transport.TCP,
      options: {
        host: 'localhost',
        port: 3001,
      },
    });
  }

  async createUser() {
    console.log('Sending "createUser" message...');
    const result = await firstValueFrom(
      this.client.send('createUser', {
        name: 'John Doe',
        email: 'john.doe@example.com',
      }),
    );
    console.log('Response from microservice:', result);
  }
}

const client = new UserClient();
client.createUser().catch(console.error);
