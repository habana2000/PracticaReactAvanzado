import { getAdvert } from '../selectors';

describe('getAdvert', () => {
  test('should return a advert by advertId', () => {
    const advertId = '1';
    const adverts = [{ id: +advertId }];
    const state = { adverts: { data: adverts } };

    expect(getAdvert(advertId)(state)).toBe(adverts[0]);
  });

  test('should not return any advert', () => {
    const advertId = '1';
    const adverts = [];
    const state = { adverts: { data: adverts } };

    expect(getAdvert(advertId)(state)).toBeUndefined();
  });
});
