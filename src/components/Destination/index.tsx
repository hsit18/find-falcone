import React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';

export interface DestinationProps {
    index: number;
    planets: Array<Planet>;
    vehicles: Array<Vehicle>;
    selectedPanet?: Planet;
    selectedVehicle?: Vehicle;
    handleChange: (event: SelectChangeEvent | React.ChangeEvent<HTMLInputElement>) => void
};

const Destination = ({ index, planets, vehicles, selectedPanet, selectedVehicle, handleChange }: DestinationProps) => {
    return (
        <>
            <FormControl size="small" fullWidth>
                <InputLabel id={`destination-${index}`}>Destination {index + 1}</InputLabel>
                <Select
                    labelId={`destination-${index}`}
                    value={selectedPanet?.name || ''}
                    label={`Destination ${index}`}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    {planets.map((planet: Planet) => <MenuItem value={planet.name}>{planet.name}</MenuItem>)}
                </Select>
            </FormControl>
            <FormControl>
                <FormLabel id={`vehicle-${index}`}>Vehicle</FormLabel>
                <RadioGroup
                    aria-labelledby={`vehicle-${index}`}
                    name={`vehicle-${index}`}
                    onChange={handleChange}
                    value={selectedVehicle}
                >
                    {vehicles.map((vehicle: Vehicle) => (
                        <FormControlLabel key={vehicle.name} value={vehicle.name} control={<Radio />} label={vehicle.name} />
                    ))}
                </RadioGroup>
            </FormControl>
        </>
    )
};

export default Destination;
