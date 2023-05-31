import Button from '../shared/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import { useEffect, useState } from 'react';
import { getAdvert, deleteAdvert } from './service';

const AdvertPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  const [advert, setAdvert] = useState(null);

  useEffect(() => {
    getAdvert(params.advertId)
      .then(advert => setAdvert(advert))
      .catch(error => {
        if (error.status === 404) {
          return navigate('/404');
        }
        setError(error);
      });
  }, [params.advertId, navigate]);

  const handleDeleteClick = async () => { 
    const confirmed = window.confirm("Do you really want to delete it?");
    if (confirmed) {
      await deleteAdvert(params.advertId);
      navigate('/adverts');
    }
  };

  return (
    <Layout title="Advert detail">{advert && <div>
      <table>
        <tr>
          <td>
            <div>Name: {advert.name}</div>
            <div>Sale: {advert.sale}</div>
            <div>Price: {advert.price}</div>
            <div>tags: {advert.tags.join(", ")}</div>
          </td>
          <td>
            <div className="right">
              <img className="advert-foto" 
              src={advert.photo ? advert.photo : "https://media.istockphoto.com/vectors/no-image-available-icon-vector-id1216251206?k=6&m=1216251206&s=612x612&w=0&h=G8kmMKxZlh7WyeYtlIHJDxP5XRGm9ZXyLprtVJKxd-o="} 
              alt="Imagen"
              width= "100%"
              max-width= "100px" 
              />
            </div>
          </td>
        </tr>
        <tr>
          <td>
          <Button
                type="submit"
                className="newAdvertPage-submit"
                variant="primary"
                onClick={handleDeleteClick}
              >
                Delete advert
              </Button>
          </td>
        </tr>
      </table>
      </div>}
    </Layout>
  );
};

export default AdvertPage;
