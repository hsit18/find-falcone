import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from '@mui/material';
import { getPlanets, getVehicles, getToken, findFalcone } from "../../services";
import Destination from '../../components/Destination';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

const MAX_DESTINATION = 4;

const FindFalconePage = () => {
	const navigate = useNavigate();
	const [planets, setPlanets] = useState([]);
	const [vehicles, setVehicles] = useState([]);

	useEffect(() => {
		Promise.all([getToken, getPlanets(), getVehicles()]).then(response => {
			setPlanets(response[1]);
			setVehicles(response[2]);
		});
	}, []);

	const goToResultPage = () => {
		navigate(`/result`);
	}

	const handleDestinationChange = () => {

	}

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
									planets={planets}
									vehicles={vehicles}
									handleChange={handleDestinationChange}
								/>
							</Paper>

						</Grid>
					))}
			</Grid>
		</>
	)
}

export default FindFalconePage;
