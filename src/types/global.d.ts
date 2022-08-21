export { };

declare global {
    interface Destination {
        timeTaken?: number;
        planet: Planet;
        vehicle?: Vehicle;
    }
    interface Planet {
        name: string;
        distance: number;
    }

    interface Vehicle {
        name: string;
        max_distance: number;
        total_no: number;
        speed: number;
    }

    interface FalconeStore {
        token: string;
        planets: Array<Planet>;
        vehicles: Array<Vehicle>;
        selectedDestinations: {
            [key: string]: Destination
        }
    }
}