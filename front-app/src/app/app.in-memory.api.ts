import { InMemoryDbService } from 'angular-in-memory-web-api';

export class AppInMemoryApi  implements InMemoryDbService{
      createDb(): any{
        return {
          user: [
            {
              id: 1,
              username: 'user1',
              password: '1234'
            },
            {
              id: 2,
              username: 'user2',
              password: '5678'
            }
          ]
        };
    }
}
