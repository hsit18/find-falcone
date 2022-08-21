export { };

declare global {
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

    interface FindFalconeAPIBody {
        token: string;
        planets: Array<string>;
        vehicles: Array<string>;
    }
}