'use client';

import { useState, useEffect } from 'react';
import StayCard, { Stay } from '@/components/StayCard';

const TYPES = [
  { key: 'all', label: 'All Types', emoji: '🏠' },
  { key: 'farm_stay', label: 'Farm Stay', emoji: '🌾' },
  { key: 'heritage_home', label: 'Heritage Home', emoji: '🏛️' },
  { key: 'eco_hut', label: 'Eco Hut', emoji: '🌿' },
];

export default function StaysPage() {
  const [stays, setStays] = useState<Stay[]>([]);
  const [activeType, setActiveType] = useState('all');
  const [district, setDistrict] = useState('all');
  const [maxPrice, setMaxPrice] = useState(10000);
  const [loading, setLoading] = useState(true);
  const [ripsOnly, setRipsOnly] = useState(false);

  useEffect(() => {
    const fetchStays = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/stays`, {
            credentials: 'include'
        });
        const data = await res.json();
        if (data.success) {
          setStays(data.data);
        }
      } catch (err) {
        console.error('Failed to fetch stays');
      } finally {
        setLoading(false);
      }
    };
    fetchStays();
  }, []);

  const filtered = stays.filter(s => {
    const typeOk = activeType === 'all' || s.type === activeType;
    const distOk = district === 'all' || s.district?.toLowerCase() === district;
    const priceOk = s.price_per_night <= maxPrice;
    const ripsOk = !ripsOnly || s.rips_certified;
    return typeOk && distOk && priceOk && ripsOk;
  });

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      {/* Hero */}
      <div style={{ background: 'linear-gradient(135deg, #122a20, var(--primary))', padding: '4rem 1.5rem 3rem', textAlign: 'center' }}>
        <p style={{ color: 'rgba(224,112,80,0.8)', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>🏡 Vagad Stays</p>
        <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: 'white', marginBottom: '0.75rem' }}>Rural Homestays</h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto' }}>Stay with certified Paryatan Mitra hosts across the Vagad region</p>
      </div>

      <div className="container-custom" style={{ padding: '2.5rem 1.5rem' }}>
        {/* Filters */}
        <div style={{ background: 'white', borderRadius: '1.25rem', padding: '1.5rem', marginBottom: '2rem', border: '1px solid var(--border)', display: 'flex', gap: '1.5rem', flexWrap: 'wrap', alignItems: 'center' }}>
          {/* Type tabs */}
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            {TYPES.map(t => (
              <button key={t.key} onClick={() => setActiveType(t.key)} style={{ padding: '0.5rem 1rem', borderRadius: '999px', border: activeType === t.key ? 'none' : '1px solid var(--border)', background: activeType === t.key ? 'var(--primary)' : 'white', color: activeType === t.key ? 'white' : 'var(--text-dark)', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem', cursor: 'pointer', transition: 'all 0.2s', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                {t.emoji} {t.label}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center', marginLeft: 'auto' }}>
            {/* District */}
            <select value={district} onChange={e => setDistrict(e.target.value)} style={{ padding: '0.5rem 1rem', borderRadius: '999px', border: '1px solid var(--border)', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', background: 'white', cursor: 'pointer', outline: 'none' }}>
              <option value="all">📍 All Districts</option>
              <option value="banswara">Banswara</option>
              <option value="dungarpur">Dungarpur</option>
            </select>

            {/* Max price */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
              <span>₹ Max</span>
              <input type="range" min={1000} max={10000} step={500} value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} style={{ width: 80, accentColor: 'var(--primary)' }} />
              <span style={{ color: 'var(--primary)', fontWeight: 700 }}>₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>

            {/* RIPS filter */}
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', cursor: 'pointer', fontSize: '0.85rem', fontFamily: 'Outfit, sans-serif', fontWeight: 600 }}>
              <input type="checkbox" checked={ripsOnly} onChange={e => setRipsOnly(e.target.checked)} style={{ accentColor: '#15803d' }} />
              ✅ RIPS Certified Only
            </label>
          </div>
        </div>

        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
          Showing <strong style={{ color: 'var(--primary)' }}>{filtered.length}</strong> homestays
        </p>

        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[...Array(6)].map((_, i) => <div key={i} className="skeleton" style={{ height: 360, borderRadius: '1rem' }} />)}
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {filtered.map(s => <StayCard key={s._id} stay={s} />)}
          </div>
        )}

        {filtered.length === 0 && !loading && (
          <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
            <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🏡</div>
            <p style={{ fontSize: '1.1rem' }}>No stays match your filters. Try adjusting them.</p>
          </div>
        )}
      </div>
    </div>
  );
}
