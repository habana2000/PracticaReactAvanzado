import Button from '../shared/Button';
import { useNavigate, useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import { useEffect } from 'react';
import { deleteAdvert } from './service';
import { getAdvert } from '../../store/selectors';
import { useDispatch, useSelector } from 'react-redux';
import { advertLoad } from '../../store/actions';

const AdvertPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { advertId } = useParams();

  const advert = useSelector(getAdvert(advertId));

  useEffect(() => {
    dispatch(advertLoad(advertId));
  }, [dispatch, advertId]);
  
  const handleDeleteClick = async () => { 
    const confirmed = window.confirm("Do you really want to delete it?");
    if (confirmed) {
      await deleteAdvert(advertId);
      navigate('/adverts');
    }
  };
  
  if (advert) {
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
