import React, { useEffect, useRef, useState } from "react";
import aiService from "../../services/ai.service";
import "./FloatingAIWidget.css";

const FloatingAIWidget = () => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [aiTyping, setAiTyping] = useState(false);

  const [showRecommendations, setShowRecommendations] = useState(true);

  const chatEndRef = useRef(null);

  // Auto-scroll chat
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, aiTyping]);

  const getCurrentLocationAndFetchAI = () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setLoading(true);
    setError("Starting AI service… please wait ⏳");

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const res = await aiService.analyzeLocation(
            position.coords.latitude,
            position.coords.longitude,
          );
          setData(res.data);
          setError(null);
        } catch (err) {
          setError(
            err?.response?.data?.error ||
              err?.response?.data?.detail ||
              "AI service is temporarily unavailable. Please try again.",
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
    setOpen((prev) => !prev);
    if (!open && !data && !loading) {
      getCurrentLocationAndFetchAI();
    }
  };

  const sendMessage = async () => {
    if (!userInput.trim() || !data) return;

    const question = userInput;
    setUserInput("");

    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setShowRecommendations(false);

    setAiTyping(true);

    try {
      const res = await aiService.analyzeLocation(
        data.latitude,
        data.longitude,
        question,
      );

      const reply =
        typeof res.data.suggestions === "string"
          ? res.data.suggestions
          : "I’ve updated my recommendation based on your question.";

      setMessages((prev) => [...prev, { role: "ai", text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "ai", text: "AI is unavailable right now." },
      ]);
    } finally {
      setAiTyping(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
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
                
                {/* Info */}
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

                <button
                  onClick={() => setShowRecommendations((prev) => !prev)}
                  style={{
                    background: "transparent",
                    border: "none",
                    padding: 0,
                    marginBottom: "10px",
                    color: "#2563eb",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                >
                  {showRecommendations
                    ? "Hide recommendations"
                    : "Show recommendations"}
                </button>

                {/* Recommendations */}
                {showRecommendations && (
                  <>
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

                {/* Chat */}
                <div className="ai-chat">
                  <h6>💬 Ask AI</h6>

                  <div className="chat-messages">
                    {messages.map((m, i) => (
                      <div key={i} className={`chat-msg ${m.role}`}>
                        {m.text}
                      </div>
                    ))}

                    {aiTyping && (
                      <div className="chat-msg ai typing">AI is typing…</div>
                    )}

                    <div ref={chatEndRef} />
                  </div>

                  <div className="chat-input">
                    <input
                      type="text"
                      placeholder="Ask about your vehicle condition..."
                      value={userInput}
                      disabled={aiTyping}
                      onChange={(e) => setUserInput(e.target.value)}
                      onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    />
                    <button onClick={sendMessage} disabled={aiTyping}>
                      Send
                    </button>
                  </div>
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
