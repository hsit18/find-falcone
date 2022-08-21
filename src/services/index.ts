const API_ENDPOINT = "https://findfalcone.herokuapp.com";
const COMMON_HEADERS = {
    headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
    },
    method: "POST"
};

export const getPlanets = () => {
    return fetch(`${API_ENDPOINT}/planets`).then(response => response.json());
};

export const getVehicles = () => {
    return fetch(`${API_ENDPOINT}/vehicles`).then(response => response.json());
};

export const getToken = () => {
    return fetch(`${API_ENDPOINT}/token`, COMMON_HEADERS).then(response => response.json());
};

export const findFalcone = (data: FindFalconeAPIBody) => {
    return fetch(`${API_ENDPOINT}/find`, {
        ...COMMON_HEADERS,
        body: JSON.stringify(data)
    }).then(response => response.json());
};

