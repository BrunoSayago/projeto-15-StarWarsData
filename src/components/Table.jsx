import React, { useContext } from 'react';
import { MyContext } from '../context/MyContext';

function Table() {
  const { planetsInfo } = useContext(MyContext);
  console.log(planetsInfo);

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
          planetsInfo.map(({
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
                {rotacao}
              </td>
              <td>
                {orbita}
              </td>
              <td>
                {diameter}
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
                {agua}
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
