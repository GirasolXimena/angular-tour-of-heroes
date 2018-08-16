import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 10, name: 'Ben' },
      { id: 2, name: 'Christy' },
      { id: 1, name: 'Ally' },
      { id: 3, name: 'Dev' },
      { id: 4, name: 'Mary' },
      { id: 11, name: 'Bill' },
      { id: 12, name: 'Curtis' },
      { id: 13, name: 'Dan' },
      { id: 14, name: 'Deric' },
      { id: 15, name: 'Gwyneth' },
      { id: 16, name: 'Herman' },
      { id: 17, name: 'Jake' },
      { id: 18, name: 'James' },
      { id: 19, name: 'Johnny' },
      { id: 20, name: 'Josh' },
      { id: 21, name: 'Law' },
      { id: 22, name: 'Lauren' },
      { id: 23, name: 'Miller' },
      { id: 24, name: 'Nate' },
      { id: 25, name: 'Robert' },
      { id: 26, name: 'Sasha' },
      { id: 27, name: 'Sean' },
      { id: 28, name: 'Shannon' },
    ];
    return {heroes};
  }
 
}