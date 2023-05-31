import { useState, useEffect } from 'react';
import Layout from '../layout/Layout';
import Button from '../shared/Button';
import Photo from '../shared/Photo';
import FormField from '../shared/FormField'
// import ListaSeleccionMultiple from '../shared/ListElement';


import './NewAdvertPage.css';
import { createAdvert, getTags } from './service';
import { useNavigate } from 'react-router-dom';

const MIN_CHARACTERS = 5;
const MAX_CHARACTERS_NAME = 60;

const NewAdvertPage = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [sale, setSale] = useState(null);
  const [price, setPrice] = useState(null);
  const [tags, setTags] = useState([]);
  const [photo, setPhoto] = useState(undefined);
  const [availableTags, setAvailableTags] = useState([]);

  // Captura de tags
  useEffect(() => {
    async function fetchData() {
      const tags = await getTags();
      setAvailableTags(tags);
    }

      fetchData();
   
    }, []);


  const handleChangeName = event => {
    setName(event.target.value);
  };
  function handleCheckboxChange(event) {
    const newValue = event.target.value;
    setSale(newValue === sale ? null : newValue);
  }
  const handleChangePrice = event => {
    setPrice(event.target.value);
  };
  const handleChangeTags = (event) => {
    const opcionesSeleccionadas = Array.from(event.target.selectedOptions, (option) => option.value);
    setTags(opcionesSeleccionadas);
  };

  const handleFileInputChange = (event) => {
    setPhoto(event.target.files[0]);
  };   

  const handleSubmit = async event => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const advert = await createAdvert({ name, sale, price, tags, photo });
      setIsLoading(false);
      navigate(`/adverts/${advert.id}`);
    } catch (error) {
      if (error.status === 401) {
        navigate('/login');
      }
    }
  };

  const isDisabled = isLoading || 
    name.length < MIN_CHARACTERS ||
    (price && price.length === 0) ||
    (tags && tags.length === 0) ||
    !sale;

  const charactersName = `${name.length} / ${MAX_CHARACTERS_NAME} chars (min 5)`;

  return (
    <Layout title="New advert">
      <div className="newAdvertPage bordered">
        <div className="left">
          <Photo />
        </div>
        <div className="right">
          <form onSubmit={handleSubmit}>
            <div className="newAdvertPage-flex"> 
              <div className="FieldLabel right">Name</div>
              <div className="newAdvertPage-characters left">{charactersName}</div>
            </div>
          <FormField
              name="name"
              className="newAdvertPage-formfield"
              placeholder="Advert's name"
              onChange={handleChangeName}
              value={name}
              maxLength={MAX_CHARACTERS_NAME}
              autofocus
              />
            <div className="newAdvertPage-flex"> 
              <div className="FieldLabel right">Price</div>
              <div className="newAdvertPage-characters left">Only numbers</div>
            </div>
            <FormField
              name="price"
              type="number"
              className="newAdvertPage-formfield"
              placeholder="Advert's price"
              onChange={handleChangePrice}
              value={price}
              maxLength={MAX_CHARACTERS_NAME}
            />
            <div>

          <div className="newAdvertPage-flex"> 
            <div className="FieldLabel right">Tags</div>
            <div className="newAdvertPage-characters left">Selected: {tags.join(", ")}</div>
          </div>
          <div>
          <select multiple id="opciones" value={tags} onChange={handleChangeTags}>
        {availableTags.map((tag) => (
          <option value={tag}>
            {tag}
          </option>
        ))}
      </select>
      

          </div>


          <div className="newAdvertPage-flex"> 
      <div className="FieldLabel right">Type</div>
      <div className="newAdvertPage-characters left">For sale / For Buy</div>
    </div>

            <div>

      <label>
        <input
          type="checkbox"
          name="For sale"
          value="true"
          checked={sale === "true"}
          onChange={handleCheckboxChange}
          />
        For sale
      </label>

      <label>
        <input
          type="checkbox"
          name="For buy"
          value="false"
          checked={sale === "false"}
          onChange={handleCheckboxChange}
          />
        For buy
      </label>
    </div>

    <div className="newAdvertPage-flex"> 
      <div className="FieldLabel right">Photo</div>
      <div className="newAdvertPage-characters left">Choose a beautiful picture</div>
    </div>
    <div>
      <input 
        type="file" 
        name="photo" 
        onChange={handleFileInputChange} />
    </div>
    
            </div>
            <div className="newAdvertPage-footer">
              <Button
                type="submit"
                className="newAdvertPage-submit"
                variant="primary"
                disabled={isDisabled}
              >
                Add advert
              </Button>
            </div>
          </form>          
        </div>
      </div>
    </Layout>
  );
};

export default NewAdvertPage;
