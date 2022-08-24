import React from 'react';
import { render, screen, waitFor, fireEvent } from '../../setupTests';
import PLANET_DATA from '../../data/planets.json';
import VEHICLE_DATA from '../../data/vehicles.json';
import FindFalconePage from './index';


describe('Falcone Page', () => {
  beforeEach(() => {
    global.fetch = jest.fn((url) => {
      switch (url) {
        case 'https://findfalcone.herokuapp.com/vehicles':
          return Promise.resolve({ json: () => VEHICLE_DATA })
        case 'https://findfalcone.herokuapp.com/planets':
          return Promise.resolve({ json: () => PLANET_DATA })
        case 'https://findfalcone.herokuapp.com/token':
          return Promise.resolve({ json: () => ({ token: 'test' }) })
      }
    }) as any;
  });

  test('renders Falcone Page', async () => {
    render(<FindFalconePage />);
    await waitFor(() => screen.findByText(/Select Planet you want to search in/i));
    expect(screen.getByText(/Select Planet you want to search in/i)).toBeInTheDocument();
  });

  test('renders 4 Destinations', async () => {
    render(<FindFalconePage />);
    await waitFor(() => screen.findByText(/Select Planet you want to search in/i));

    await waitFor(() => screen.findAllByText(/Donlon/i), { timeout: 1000 });

    for (let i = 0; i < 4; i++) {
      let destination = screen.getByLabelText(`Select Destination ${i + 1}`);
      expect(destination).toBeInTheDocument();
      fireEvent.change(screen.getByLabelText(`Select Destination ${i + 1}`), { target: { value: PLANET_DATA[i].name } });
      expect((screen.getAllByText(PLANET_DATA[i].name)).length).toBe(1);
    }
  });

})
