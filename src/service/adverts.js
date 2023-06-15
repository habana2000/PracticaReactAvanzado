import client from '../api/client';

const advertsUrl = '/api/v1/adverts';

export const getLatestAdverts = () => {
  const url = `${advertsUrl}`;
  return client.get(url);
};

export const getAdvert = advertId => {
  const url = `${advertsUrl}/${advertId}`;
  return client.get(url);
};

export const createAdvert = advert => {
  const url = advertsUrl;
  const headers = {
    'Content-Type': 'multipart/form-data',
  };
  return client.post(url, advert, { headers});
};

export const deleteAdvert = advertId => {
  const url = `${advertsUrl}/${advertId}`;
  return client.delete(url);
};



