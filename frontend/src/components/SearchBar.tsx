'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const destinations = ['Banswara', 'Dungarpur', 'Both'];
const experiences = ['Cultural', 'Nature', 'Spiritual', 'Adventure', 'Craft'];

export default function SearchBar() {
    const [q, setQ] = useState('');
    const [destination, setDestination] = useState('');
    const [experience, setExperience] = useState('');
    const [dates, setDates] = useState('');
    const router = useRouter();

    const handleSearch = () => {
        if (q) {
            router.push(`/search?q=${encodeURIComponent(q)}`);
            return;
        }
        const params = new URLSearchParams();
        if (destination) params.set('destination', destination);
        if (experience) params.set('experience', experience);
        if (dates) params.set('dates', dates);
        router.push(`/planner?${params.toString()}`);
    };

    return (
        <div className="search-bar-container" style={{
            background: 'rgba(255,255,255,0.97)',
            borderRadius: '999px',
            padding: '0.5rem 0.5rem 0.5rem 0.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: 0,
            boxShadow: '0 8px 40px rgba(0,0,0,0.18)',
            maxWidth: 820,
            width: '100%',
            flexWrap: 'wrap',
        }}>
            {/* Quick Search */}
            <div style={{ flex: 1.5, minWidth: 200, padding: '0.5rem 1.25rem', borderRight: '1px solid #e5e0d8', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'Outfit, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    🔍 Quick Search
                </label>
                <input
                    type="text"
                    placeholder="Search anything..."
                    value={q}
                    onChange={e => setQ(e.target.value)}
                    style={{ border: 'none', outline: 'none', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', color: '#1a1a1a', background: 'transparent', width: '100%' }}
                />
            </div>

            {/* Destination */}
            <div style={{ flex: 1, minWidth: 140, padding: '0.5rem 1.25rem', borderRight: '1px solid #e5e0d8', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'Outfit, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    📍 Destination
                </label>
                <select
                    value={destination}
                    onChange={e => setDestination(e.target.value)}
                    style={{ border: 'none', outline: 'none', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', color: '#1a1a1a', background: 'transparent', cursor: 'pointer', width: '100%' }}
                >
                    <option value="">Where to?</option>
                    {destinations.map(d => <option key={d} value={d}>{d}</option>)}
                </select>
            </div>

            {/* Experiences */}
            <div style={{ flex: 1, minWidth: 140, padding: '0.5rem 1.25rem', borderRight: '1px solid #e5e0d8', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'Outfit, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    🎯 Experiences
                </label>
                <select
                    value={experience}
                    onChange={e => setExperience(e.target.value)}
                    style={{ border: 'none', outline: 'none', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', color: '#1a1a1a', background: 'transparent', cursor: 'pointer', width: '100%' }}
                >
                    <option value="">What interests you?</option>
                    {experiences.map(e => <option key={e} value={e}>{e}</option>)}
                </select>
            </div>

            {/* Dates */}
            <div style={{ flex: 1, minWidth: 140, padding: '0.5rem 1.25rem', display: 'flex', flexDirection: 'column', gap: 2 }}>
                <label style={{ fontSize: '0.7rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'Outfit, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    📅 Dates
                </label>
                <input
                    type="text"
                    placeholder="When are you going?"
                    value={dates}
                    onFocus={e => (e.target.type = 'date')}
                    onBlur={e => { if (!e.target.value) e.target.type = 'text'; }}
                    onChange={e => setDates(e.target.value)}
                    style={{ border: 'none', outline: 'none', fontSize: '0.9rem', fontFamily: 'Inter, sans-serif', color: '#1a1a1a', background: 'transparent', width: '100%' }}
                />
            </div>

            {/* Search Button */}
            <button
                onClick={handleSearch}
                style={{
                    background: 'linear-gradient(135deg, #e07050, #c05a3a)',
                    color: 'white', border: 'none', borderRadius: '999px',
                    padding: '0.85rem 1.75rem',
                    fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem',
                    cursor: 'pointer', whiteSpace: 'nowrap',
                    transition: 'all 0.2s',
                    display: 'flex', alignItems: 'center', gap: '0.4rem',
                    flexShrink: 0,
                }}
            >
                🔍 Search
            </button>

            <style>{`
        @media (max-width: 768px) {
          .search-bar-container {
            flex-direction: column !important;
            border-radius: 1.25rem !important;
            padding: 1.25rem !important;
            gap: 0.75rem !important;
            align-items: stretch !important;
          }
          .search-bar-container > div {
            border-right: none !important;
            border-bottom: 1px solid #e5e0d8 !important;
            padding: 0.5rem 0 !important;
            min-width: 100% !important;
          }
          .search-bar-container > div:nth-child(4) {
            border-bottom: none !important;
          }
          .search-bar-container > button {
            width: 100% !important;
            justify-content: center !important;
            margin-top: 0.5rem !important;
          }
        }
      `}</style>
        </div>
    );
}
