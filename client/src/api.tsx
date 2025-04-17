const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function createTrip(tripData: any) {
    const res = await fetch(API_BASE_URL+"/trips", {
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(tripData),
    });

    if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create trip");
    }

    return res.json();
}