import React from 'react';
import { render } from '@testing-library/react';
import Provider from '../context/MyContext';

function renderWithContext(children) {
    return render(
        <Provider>
          {children}
        </Provider>
    )
}

export default renderWithContext;
