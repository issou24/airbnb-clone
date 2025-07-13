import { getAccessToken } from "../lib/action";

const apiService = {
    get: async function (url: string): Promise<any> {
        const token = await getAccessToken();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const text = await response.text();

        try {
            return JSON.parse(text);
        } catch (err) {
            console.error('Erreur de parsing JSON (GET):', text);
            throw new Error("Réponse non JSON");
        }
    },

    post: async function (url: string, data: any): Promise<any> {
        const token = await getAccessToken();

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        const text = await response.text();

        try {
            return JSON.parse(text);
        } catch (err) {
            console.error('Erreur de parsing JSON (POST):', text);
            throw new Error("Réponse non JSON");
        }
    },

    postWithouToken: async function (url: string, data: any): Promise<any> {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}${url}`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        const text = await response.text();

        try {
            return JSON.parse(text);
        } catch (err) {
            console.error('Erreur de parsing JSON (postWithoutToken):', text);
            throw new Error("Réponse non JSON");
        }
    }
};

export default apiService;
