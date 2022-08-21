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
	selectedDestination?: Destination;
	handleChange: (type: string, index: number, value: string) => void
};

const Destination = ({ index, planets, vehicles, selectedDestination, handleChange }: DestinationProps) => {

	const onChangeDestination = (event: SelectChangeEvent) => {
		handleChange('PLANET', index, event.target.value)
	}

	const onChangeVehicle = (event: React.ChangeEvent<HTMLInputElement>) => {
		handleChange('VEHICLE', index, event.target.value)
	}

	const getIsRangeLess = (vehicleMaxDistance: number) => {
		let distance = selectedDestination?.planet ? selectedDestination?.planet.distance : 0;
		return distance > vehicleMaxDistance;
	};

	const selectedValue = selectedDestination?.planet?.name || "Select Destination";
	return (
		<>
			<FormControl size="small" fullWidth>
				<InputLabel shrink htmlFor={`destination-${index}`}>{`Select Destination ${index + 1}`}</InputLabel>
				<Select
					native
					labelId={`destination-${index}`}
					value={selectedValue}
					onChange={onChangeDestination}
					label={`Destination ${index}`}
					inputProps={{
						id: `destination-${index}`,
					}}
				>
					<option value={selectedValue}>{selectedValue}</option>
					{planets.map((planet: Planet) => <option value={planet.name}>{planet.name}</option>)}
				</Select>
			</FormControl>
			{selectedDestination?.planet?.name &&
				(<FormControl>
					<FormLabel id={`vehicle-${index}`}>Vehicle</FormLabel>
					<RadioGroup
						aria-labelledby={`vehicle-${index}`}
						name={`vehicle-${index}`}
						onChange={onChangeVehicle}
						value={selectedDestination?.vehicle?.name}
					>
						{vehicles.map((vehicle: Vehicle) => (
							<FormControlLabel key={vehicle.name} value={vehicle.name} control={<Radio />} label={`${vehicle.name} - ${vehicle.total_no}`} disabled={vehicle.total_no === 0 || getIsRangeLess(vehicle.max_distance) ? true : false}
							/>
						))}
					</RadioGroup>
				</FormControl>
				)
			}
		</>
	)
};

export default Destination;
