import { useEffect, useState } from 'react';
// import { getLatestAdverts } from './service';
import Button from '../shared/Button';
import Layout from '../layout/Layout';
import Advert from './Advert';
import { Link } from 'react-router-dom';
import { useRef } from 'react';
import { connect } from 'react-redux';
import { getAdverts, getUi } from '../../store/selectors';
import { advertsLoaded } from '../../store/actions';

import './AdvertsPage.css'

const EmptyList = () => (
  <div style={{ textAlign: 'center' }}>
    <p>There are NO adverts posted yet !</p>
    <Button as={Link} variant="primary" to="/adverts/new">
      Post an advert
    </Button>
  </div>
);

const AdvertsPage = ({ adverts , onAdvertsLoaded, isLoading }) => {
  // const navigate = useNavigate();
  const isMounted = useRef(false);
  const [query, setQuery] = useState('');
  const [bottomPrice, setQueryBottomPrice] = useState(null);
  const [topPrice, setQueryTopPrice] = useState(null);
  // const [isLoading, setIsLoading] = useState(true);
  // const [adverts, setAdverts] = useState([]);

  useEffect(() => {
    isMounted.current = true;
  }, []);

  useEffect(() => {
    onAdvertsLoaded();
  }, [onAdvertsLoaded]);

  let filteredAdverts = adverts.filter(advert =>
    (advert.name ?? '').toUpperCase().startsWith(query.toUpperCase()),
  );

  if (bottomPrice && topPrice && (Number(bottomPrice) < Number(topPrice))) {
    filteredAdverts = filteredAdverts.filter(advert =>
      advert.price >= bottomPrice && advert.price <= topPrice
      );
    }

  return (
    <Layout title="List of Adverts">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {!!adverts.length ? (
            <>
            <div className="search-block bordered">
              <div className="search-field">
                <label>
                  Search by name:{' '}
                  <input
                    type="text"
                    style={{ borderWidth: 1 }}
                    value={query}
                    onChange={event => setQuery(event.target.value)}
                    />
                </label>
              </div>
              <div className="search-field">
                <label>
                  Search by price:{' '} between {' '}
                  <input
                    type="number"
                    style={{ borderWidth: 1 }}
                    value={bottomPrice}
                    onChange={event => setQueryBottomPrice(event.target.value)}
                    />
                   {' '} and {' '}
                  <input
                    type="number"
                    style={{ borderWidth: 1 }}
                    value={topPrice}
                    onChange={event => setQueryTopPrice(event.target.value)}
                    />
                </label>
              </div>
            </div>
              <ul>
              {filteredAdverts.map(advert => (
                  <li key={advert.id}>
                    <Link to={`/adverts/${advert.id}`}>
                      <Advert {...advert} />
                    </Link>
                  </li>
              ))}
              </ul>
            </>
          ) : (
            <EmptyList />
          )}
        </div>
      )}
    </Layout>
  );
};

const mapStateToProps = state => ({
  adverts: getAdverts(state),
  ...getUi(state)
});

const mapDispatchToProps = {
  onAdvertsLoaded: advertsLoaded,
};

export default connect(mapStateToProps, mapDispatchToProps)(AdvertsPage);
