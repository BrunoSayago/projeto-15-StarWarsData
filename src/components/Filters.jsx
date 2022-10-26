import React, { useContext } from 'react';
import { MyContext } from '../context/MyContext';

export default function Filters() {
  const {
    listaColuna,
    filterByNumericValues,
    handleFilterByNumericValues,
    mudaFiltro,
    mudaFiltroColuna,
    mudaFiltroComp,
    mudaFiltroNumero,
    botaoApagaTodosFiltros,
    botaoApagaFiltro,
  } = useContext(MyContext);

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
          onChange={ mudaFiltroColuna }
        >
          {
            listaColuna.map((coluna) => (
              <option key={ coluna } value={ coluna }>{coluna}</option>
            ))
          }
          {/* <option value="population">population</option>
          <option value="orbital_period">orbital_period</option>
          <option value="diameter">diameter</option>
          <option value="rotation_period">rotation_period</option>
          <option value="surface_water">surface_water</option> */}
        </select>

        <select
          name="comparison-filter"
          data-testid="comparison-filter"
          onChange={ mudaFiltroComp }
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
          defaultValue={ 0 }
          onChange={ mudaFiltroNumero }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleFilterByNumericValues }
        >
          Filtrar
        </button>
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ botaoApagaTodosFiltros }
        >
          Remover todos filtros
        </button>
      </div>

      {
        filterByNumericValues.map(({ coluna, comparacao, numero }) => (
          <div key={ coluna } data-testid="filter">
            <p>{`${coluna} ${comparacao} ${numero}`}</p>

            <button
              type="button"
              onClick={ () => botaoApagaFiltro(coluna) }
            >
              Excluir Filtro
            </button>
          </div>
        ))
      }

    </div>

  );
}
