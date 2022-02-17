import { PersistanceProtocol } from '../classes/interface/persistance-protocol';

export class Persistence implements PersistanceProtocol {
  saveOrder(): void {
    console.log('request saved successfully');
  }
}
