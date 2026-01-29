import React, { useState } from "react";
import aiService from "../../services/ai.service";
import "./FloatingAIWidget.css";

const FloatingAIWidget = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const getCurrentLocationAndFetchAI = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    setError(null);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        try {
          const res = await aiService.analyzeLocation(latitude, longitude);
          setData(res.data);
        } catch (err) {
          console.error("AI ERROR FULL:", err);
          console.error("AI ERROR RESPONSE:", err?.response);
          console.error("AI ERROR MESSAGE:", err?.message);
          setError(
            err?.response?.data?.detail ||
              err?.message ||
              "AI service is unavailable",
          );
        } finally {
          setLoading(false);
        }
      },
      (err) => {
        setLoading(false);
        setError("Location permission denied");
      },
    );
  };

  const toggleWidget = () => {
    setOpen(!open);

    // fetch only first time when opening
    if (!open && !data && !loading) {
      getCurrentLocationAndFetchAI();
    }
  };

  return (
    <>
      {/* Floating Button */}
      <div className="ai-fab" onClick={toggleWidget}>
        Get AI suggestions
      </div>

      {/* Popup */}
      {open && (
        <div className="ai-popup">
          <div className="ai-header">
            <span>AI Assistant</span>
            <button onClick={toggleWidget}>✖</button>
          </div>

          <div className="ai-body">
            {loading && <p>📍 Fetching your location...</p>}

            {error && <p style={{ color: "red" }}>{error}</p>}

            {!loading && data && (
              <>
                <p>
                  <strong>AI Result:</strong>
                </p>
                {!loading && data && (
                  <div className="ai-result">
                    <h5>🚘 AI Vehicle Advisory</h5>

                    <div className="ai-meta">
                      <span>📍 Lat: {data.latitude.toFixed(4)}</span>
                      <span> | Lng: {data.longitude.toFixed(4)}</span>
                    </div>

                    <div className="ai-terrain">
                      <strong>🗺️ Terrain:</strong> {data.terrain}
                    </div>

                    <div
                      className={`ai-risk ${data.suggestions.risk_level.toLowerCase()}`}
                    >
                      ⚠️ Risk Level: {data.suggestions.risk_level}
                    </div>

                    <hr />

                    <div>
                      <h6>🔧 Recommended Services</h6>
                      <ul>
                        {data.suggestions.recommended_services.map(
                          (item, idx) => (
                            <li key={idx}>{item}</li>
                          ),
                        )}
                      </ul>
                    </div>

                    <div>
                      <h6>🚗 Driving Tips</h6>
                      <ul>
                        {data.suggestions.driving_tips.map((tip, idx) => (
                          <li key={idx}>{tip}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAIWidget;
