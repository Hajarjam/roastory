import React, { useEffect, useMemo, useState } from "react";
import SubCard from "../../common/SubCard.component";
const API_BASE_URL = process.env.REACT_APP_API_URL;




const SubscriptionHistory = () => {
  const [subscriptions, setSubscriptions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadSubscriptions = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Not authenticated");

        const res = await fetch(`${API_BASE_URL}/subscriptions`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || data.message || "Failed to load subscriptions");

        setSubscriptions(Array.isArray(data) ? data : []);
      } catch (err) {
        setError(err.message || "Failed to load subscriptions");
      } finally {
        setLoading(false);
      }
    };

    loadSubscriptions();
  }, []);

  const { active, inactive } = useMemo(() => {
    const activeSubs = subscriptions.filter((s) => s.status === "Active");
    const inactiveSubs = subscriptions.filter((s) => s.status !== "Active");
    return { active: activeSubs, inactive: inactiveSubs };
  }, [subscriptions]);

  if (loading) return <div className="p-8 text-brown">Loading subscriptions...</div>;

  return (
    <div className="min-h-screen bg-peach-light text-brown px-4 py-8 lg:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-4xl font-instrument-serif mb-2">Subscription History</h1>
        {error ? <div className="mb-4 rounded bg-red-100 text-red-700 px-4 py-3">{error}</div> : null}

        <section className="mb-8">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-instrument-serif">Active Subscriptions</h2>
            <span className="text-sm text-brown/70">{active.length} active</span>
          </div>
          <div className="space-y-3">
            {active.length === 0 ? (
              <div className="rounded-xl border border-brown/15 bg-white/60 p-4 text-brown/70">
                No active subscriptions.
              </div>
            ) : (
              active.map((sub) => <SubCard key={sub._id} sub={sub} />)
            )}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-2xl font-instrument-serif">Inactive Subscriptions</h2>
            <span className="text-sm text-brown/70">{inactive.length} inactive</span>
          </div>
          <div className="space-y-3">
            {inactive.length === 0 ? (
              <div className="rounded-xl border border-brown/15 bg-white/60 p-4 text-brown/70">
                No inactive subscriptions.
              </div>
            ) : (
              inactive.map((sub) => <SubCard key={sub._id} sub={sub} />)
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default SubscriptionHistory;
