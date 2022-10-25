import React, { useContext, useState } from 'react';
import { MyContext } from '../context/MyContext';

export default function Filters() {
//   const [, setPlanetsInfo] = useState([]);
  const { mudaFiltro, botaoFiltro } = useContext(MyContext);

  const [selectedColumn, setSelectedColumn] = useState('population');
  const [selectedComparison, setSelectedComparison] = useState('maior que');
  const [numberFilter, setNumberFilter] = useState(0);

  const handleChangeSelectColumn = (event) => {
    setSelectedColumn(event.target.value);
  };

  const handleChangeSelectComp = (event) => {
    setSelectedComparison(event.target.value);
  };

  const handleChangeNumb = (event) => {
    setNumberFilter(event.target.value);
  };

  return (
    <div>
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

      <div>
        Filtro por número:
        {' '}
        <select
          name="column-filter"
          data-testid="column-filter"
          value={ selectedColumn }
          onChange={ handleChangeSelectColumn }
        >
          <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option>
        </select>

        <select
          name="comparison-filter"
          data-testid="comparison-filter"
          value={ selectedComparison }
          onChange={ handleChangeSelectComp }
        >
          <option value="maior que">maior que</option>
          <option value="menor que">menor que</option>
          <option value="igual a">igual a</option>
        </select>

        <input
          type="number"
          name="value-filter"
          id="value-filter"
          data-testid="value-filter"
          value={ numberFilter }
          onChange={ handleChangeNumb }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => botaoFiltro(selectedColumn, selectedComparison, numberFilter) }
        >
          Filtrar
        </button>
      </div>

    </div>

  );
}
