import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';
import { HeroCard } from '../components';
import { useForm } from '../../hooks';
import { getHeroesByName } from '../helpers';
import { useMemo } from 'react';
export const SearchPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { q = '' } = queryString.parse(location.search);

  const heroes = useMemo(() => getHeroesByName(q), [q]);
  const showSearch = q.length === 0;
  const showError = q.length > 0 && heroes.length === 0;
  const { searchText, onInputChange } = useForm({
    searchText: q,
  });

  const onSearchSubmit = e => {
    e.preventDefault();
    navigate(`?q=${searchText}`);
  };
  return (
    <>
      <h1>SearchPage</h1>
      <hr />
      <div className='row'>
        <div className='col-5'>
          <h4>Search Form</h4>
          <hr />
          <form onSubmit={onSearchSubmit}>
            <input
              type='text'
              placeholder='search a hero'
              className='form-control'
              name='searchText'
              aoutocomplete='off'
              value={searchText}
              onChange={onInputChange}
            />
            <button className='btn btn-outline-primary mt-1'>Search</button>
          </form>
        </div>
        <div className='col-7'>
          <h4>Results</h4>
          <hr />
          <div
            className='alert alert-primary'
            style={{ display: showSearch ? '' : 'none' }}
          >
            search a hero
          </div>
          <div
            className='alert alert-danger'
            style={{ display: showError ? '' : 'none' }}
          >
            There's no hero with <b>{q}</b>
          </div>
          {q && heroes.map(hero => <HeroCard key={hero.id} {...hero} />)}
        </div>
      </div>
    </>
  );
};
