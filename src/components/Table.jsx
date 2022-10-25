import React, { useContext } from 'react';
import { MyContext } from '../context/MyContext';

function Table() {
  const {
    planetsInfo,
    filtroNome,
    filtroColuna,
    filtroComparacao,
    filtroNumero,
  } = useContext(MyContext);

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Rotation Period</th>
          <th>Orbital Period</th>
          <th>Diameter</th>
          <th>Climate</th>
          <th>Gravity</th>
          <th>Terrain</th>
          <th>Surface Water</th>
          <th>Population</th>
          <th>Films</th>
          <th>Created</th>
          <th>Edited</th>
          <th>URL</th>
        </tr>
      </thead>
      <tbody>
        {
          planetsInfo
            .filter(({ name: nome }) => (
              nome.toLowerCase().includes(filtroNome.toLowerCase())))
            .filter((elemento) => {
              switch (filtroComparacao) {
              case 'maior que':
                return elemento[filtroColuna] > Number(filtroNumero);
              case 'menor que':
                return elemento[filtroColuna] < Number(filtroNumero);
              case 'igual a':
                return Number(elemento[filtroColuna]) === Number(filtroNumero);
              default:
                return true;
              }
            })
            .map(({
              name: nome,
              rotation_period: rotacao,
              orbital_period: orbita,
              diameter,
              climate,
              gravity,
              terrain,
              surface_water: agua,
              population,
              films,
              created,
              edited,
              url,
            }) => (
              <tr key={ nome }>
                <td>{nome}</td>
                <td>
                  {Number(rotacao)}
                </td>
                <td>
                  {Number(orbita)}
                </td>
                <td>
                  {Number(diameter)}
                </td>
                <td>
                  {climate}
                </td>
                <td>
                  {gravity}
                </td>
                <td>
                  {terrain}
                </td>
                <td>
                  {Number(agua)}
                </td>
                <td>
                  {population}
                </td>
                <td>
                  <ul>

                    {films.map((elemento) => <li key={ elemento }>{elemento}</li>)}
                  </ul>
                </td>
                <td>
                  {created}
                </td>
                <td>
                  {edited}
                </td>
                <td>
                  {url}
                </td>
              </tr>
            ))
        }
      </tbody>
    </table>
  );
}

export default Table;
