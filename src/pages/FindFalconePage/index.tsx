import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { getPlanets, getVehicles, getToken } from "../../services";
import Destination from '../../components/Destination';
import {
	Grid,
	Paper,
	Card,
	CardActions,
	CardContent,
	Typography,
	Button,
} from "@mui/material";
import type { RootState } from '../../store';
import { setToken, setSelectedDestination, resetDestination } from '../../store/falconeSlice';

const MAX_DESTINATION = 4;

const FindFalconePage = () => {
	const selectedDestination = useSelector((state: RootState) => state.falcone.selectedDestinations);

	const dispatch = useDispatch()
	const navigate = useNavigate();
	const [planets, setPlanets] = useState([]);
	const [vehicles, setVehicles] = useState([]);

	useEffect(() => {
		Promise.all([getToken(), getPlanets(), getVehicles()]).then((response: any) => {
			dispatch(setToken(response[0]?.token as string));
			setPlanets(response[1]);
			setVehicles(response[2]);
		});
	}, [dispatch]);

	const goToResultPage = () => {
		navigate(`/result`);
	}

	const getAvailablePlanets = useCallback(() => {
		const selectedPlanets = Object.values(selectedDestination).map((d: Destination) => d.planet?.name);
		return planets.filter((p: Planet) => selectedPlanets.indexOf(p.name) === -1)
	}, [planets, selectedDestination]);

	const getAvailableVehicles = useCallback(() => {
		const selectedVehicles = Object.values(selectedDestination).map((d: Destination) => d.vehicle);
		const resultVehicles: Array<Vehicle> = [];

		vehicles.forEach((v: Vehicle) => {
			const existingVehicles = selectedVehicles.filter(sv => sv?.name === v.name)
			resultVehicles.push({
				...v,
				total_no: v.total_no - (existingVehicles?.length || 0)
			});
		})
		return resultVehicles;
	}, [vehicles, selectedDestination]);

	const calculateTime = (planet: Planet | undefined, vehicle: Vehicle | undefined) => {
		if (!vehicle?.speed) {
			return 0;
		}
		return (planet?.distance || 0) / (vehicle?.speed || 1)
	}

	const handleDestinationChange = (type: string, index: number, value: string) => {
		const existingDestination: Destination = selectedDestination[index.toString()] as Destination;
		switch (type) {
			case 'PLANET':
				const planetObj = planets.find((p: Planet) => p.name === value);
				if (planetObj) {
					dispatch(setSelectedDestination({
						index, destination: {
							...existingDestination,
							timeTaken: calculateTime(planetObj, existingDestination?.vehicle),
							planet: planetObj
						}
					}));
				}
				break;
			case 'VEHICLE':
				const vehicleObj = vehicles.find((v: Vehicle) => v.name === value);
				if (vehicleObj) {
					dispatch(setSelectedDestination({
						index, destination: {
							...existingDestination,
							timeTaken: calculateTime(existingDestination?.planet, vehicleObj),
							vehicle: vehicleObj
						}
					}));
				}
				break;

		}
	}

	const resetAll = () => {
		dispatch(resetDestination());
	}

	const isAllSelected = () => {
		let counter = 0;
		if (Object.keys(selectedDestination).length !== MAX_DESTINATION) {
			return false;
		}
		for (let i = 0; i < Object.values(selectedDestination).length; i++) {
			if (!(selectedDestination[i].planet || selectedDestination[i].vehicle)) {
				break;
			}
			counter++;
		}
		return counter === MAX_DESTINATION;
	};

	const getTimeTaken = (): number => {
		return Object.values(selectedDestination).reduce((acc: number, curr) => acc + (curr?.timeTaken || 0), 0);
	};

	return (
		<>
			<h2>Select Planet you want to search in</h2>
			<Grid direction="row" container spacing={2}>
				{
					[...Array(MAX_DESTINATION).keys()].map((d, index) => (
						<Grid item xl={3} xs={12} lg={3} md={5}>
							<Paper elevation={8} className="destination">
								<Destination
									index={index}
									planets={getAvailablePlanets()}
									selectedDestination={selectedDestination[index] || {}}
									vehicles={getAvailableVehicles()}
									handleChange={handleDestinationChange}
								/>
							</Paper>

						</Grid>
					))}
				<Grid item xs={8} lg={4}>
					<Card variant="elevation" elevation={8}>
						<CardContent>
							<Typography color="textSecondary" gutterBottom>
								Time Taken
							</Typography>
							<Typography variant="h5" component="h2">
								{getTimeTaken()}
							</Typography>
						</CardContent>
						<CardActions>
							<Button
								disabled={!isAllSelected()}
								variant="outlined"
								size="medium"
								color="primary"
								onClick={goToResultPage}
							>
								Find Falcone
							</Button>
							<Button size="medium" onClick={resetAll}>
								Reset
							</Button>
						</CardActions>
					</Card>
				</Grid>
			</Grid>

		</>
	)
}

export default FindFalconePage;
