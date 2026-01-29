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
        try {
          const res = await aiService.analyzeLocation(
            position.coords.latitude,
            position.coords.longitude,
          );
          setData(res.data);
        } catch (err) {
          setError(
            err?.response?.data?.detail ||
              err?.message ||
              "AI service unavailable",
          );
        } finally {
          setLoading(false);
        }
      },
      () => {
        setLoading(false);
        setError("Location permission denied");
      },
    );
  };

  const toggleWidget = () => {
    setOpen(!open);
    if (!open && !data && !loading) {
      getCurrentLocationAndFetchAI();
    }
  };

  return (
    <>
      {/* Floating action button */}
      <button className="ai-trigger" onClick={toggleWidget}>
        <span className="ai-dot" />
        AI Assist
      </button>

      {open && (
        <div className="ai-panel">
          <div className="ai-panel-header">
            <span>AI Insights</span>
            <button onClick={toggleWidget}>×</button>
          </div>

          <div className="ai-panel-body">
            {loading && <div className="ai-state">Analyzing location…</div>}
            {error && <div className="ai-error">{error}</div>}

            {!loading && data && (
              <>
                <div className="ai-info">
                  <div>
                    <span className="label">Terrain</span>
                    <span className="value">{data.terrain}</span>
                  </div>

                  <div
                    className={`risk ${data.suggestions.risk_level.toLowerCase()}`}
                  >
                    Risk: {data.suggestions.risk_level}
                  </div>
                </div>

                <div className="ai-section">
                  <h6>Recommended Services</h6>
                  <ul>
                    {data.suggestions.recommended_services.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="ai-section">
                  <h6>Driving Tips</h6>
                  <ul>
                    {data.suggestions.driving_tips.map((t, i) => (
                      <li key={i}>{t}</li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FloatingAIWidget;
