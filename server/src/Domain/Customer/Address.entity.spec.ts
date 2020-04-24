import {Address} from './Address.entity';

describe('Address.entity', () => {
  it('testGetters', () => {
    const address = new Address('2 rue Dieu', 'Paris', '75010', 'FR');

    expect(address.getStreet()).toBe('2 rue Dieu');
    expect(address.getCity()).toBe('Paris');
    expect(address.getCountry()).toBe('FR');
    expect(address.getZipCode()).toBe('75010');
  });
});