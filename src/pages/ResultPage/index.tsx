import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import {
    Grid,
    Card,
    CardActions,
    CardContent,
    Typography,
    Button,
} from "@mui/material";
import type { RootState } from '../../store';
import { findFalcone } from "../../services";
import { resetDestination } from '../../store/falconeSlice';

const ResultPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
    const token = useSelector((state: RootState) => state.falcone.token);
    const selectedDestination = useSelector((state: RootState) => state.falcone.selectedDestinations);
    const [falconeResult, setFalconeResult] = useState<{
        status: string;
        planet_name: string;
        error?: string;
    }>();

    const goToFalconePage = () => {
        dispatch(resetDestination());
        navigate(`/`);
    }

    useEffect(() => {
        const destinationValues = Object.values(selectedDestination);
        const planets = destinationValues.map((d: Destination) => d.planet?.name || "");
        const vehicles = destinationValues.map((d: Destination) => d.vehicle?.name || "");

        if (!token || !planets?.length || !vehicles.length) {
            navigate(`/`);
        }

        findFalcone({
            token: token,
            planet_names: planets,
            vehicle_names: vehicles
        }).then((response: any) => {
            console.log(response);
            setFalconeResult(response);
        });
    }, [token, selectedDestination]);

    return (
        <Grid direction="row" container spacing={2}>
            <Grid item xs={11} lg={11}>
                <Card variant="elevation" elevation={8}>
                    <CardContent>
                        <Typography variant="h5" component="h2">
                            {falconeResult?.status === "success" && "Success! Congratulations on Finding Falcone. King Shan is mighty pleased."}
                            {falconeResult?.status !== "success" && falconeResult?.error}

                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            Time Taken
                        </Typography>
                        <Typography variant="h5" component="h2">
                            100
                        </Typography>
                        <Typography color="textSecondary" gutterBottom>
                            Planet Found
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {falconeResult?.planet_name}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button
                            variant="outlined"
                            size="medium"
                            color="primary"
                            onClick={goToFalconePage}
                        >
                            Start Again
                        </Button>
                    </CardActions>
                </Card>
            </Grid>
        </Grid>
    )
}

export default ResultPage;
