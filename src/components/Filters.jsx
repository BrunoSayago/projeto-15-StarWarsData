import React, { useContext } from 'react';
import { MyContext } from '../context/MyContext';

export default function Filters() {
  const { mudaFiltro } = useContext(MyContext);
  return (
    <label htmlFor="name-filter">
      Filtro por nome:
      {' '}
      <input
        type="text"
        name="name-filter"
        id="name-filter"
        data-testid="name-filter"
        onChange={ mudaFiltro }
      />
    </label>
  );
}
