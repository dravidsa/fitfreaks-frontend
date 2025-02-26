import React, { useState } from "react";

const GarminConnect = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleGarminLogin = async () => {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch("http://fitfreaks.in/api/getRequestToken");
            const data = await response.json();

            if (data.oauth_token) {
                // Redirect user to Garmin authentication page
                window.location.href = `https://connect.garmin.com/oauthConfirm?oauth_token=${data.oauth_token}&oauth_callback=${encodeURIComponent("https://fitfreaks.in/api/auth/callback")}`;
            } else {
                setError("Failed to get request token");
            }
        } catch (err) {
            setError("Error connecting to the server");
            console.error("Error:", err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h2>Login with Garmin</h2>
            <button onClick={handleGarminLogin} disabled={loading}>
                {loading ? "Redirecting..." : "Login with Garmin"}
            </button>
            {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
    );
};

export default GarminConnect;
