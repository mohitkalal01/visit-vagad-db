'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

const typeColors: Record<string, string> = {
    Spiritual: '#7c3aed',
    Nature: '#16a34a',
    Heritage: '#b45309',
    Culture: '#d97706',
};

export default function DestinationsPage() {
    const [destinations, setDestinations] = useState<any[]>([]);

    useEffect(() => {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/destinations`)
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setDestinations(data.data);
                }
            })
            .catch(err => console.error("Error fetching destinations", err));
    }, []);

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            {/* Hero */}
            <div style={{ background: 'linear-gradient(135deg, #122a20, var(--primary))', padding: '4rem 1.5rem 3rem', textAlign: 'center' }}>
                <p style={{ color: 'rgba(224,112,80,0.8)', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>🗺️ Destinations & Experiences</p>
                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: 'white', marginBottom: '0.75rem' }}>Discover Vagad</h1>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto 2rem' }}>Temples, backwaters, tribal crafts, and heritage palaces across Banswara & Dungarpur</p>
                <Link href="/planner" className="btn-accent" style={{ display: 'inline-flex' }}>✨ Plan Your Visit with AI</Link>
            </div>

            <div className="container-custom" style={{ padding: '3rem 1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '2rem' }}>
                    {destinations.map(dest => (
                        <div key={dest._id} id={dest._id} className="card" style={{ overflow: 'hidden' }}>
                            <div style={{ position: 'relative', height: 220, overflow: 'hidden' }}>
                                <img src={dest.images?.[0]} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.4s ease' }}
                                    onMouseOver={e => (e.currentTarget.style.transform = 'scale(1.06)')}
                                    onMouseOut={e => (e.currentTarget.style.transform = 'scale(1)')}
                                />
                                <div style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', display: 'flex', gap: '0.5rem' }}>
                                    <span style={{ background: 'rgba(0,0,0,0.55)', color: 'white', borderRadius: '999px', padding: '0.2rem 0.7rem', fontSize: '0.75rem', fontWeight: 600, fontFamily: 'Outfit, sans-serif' }}>
                                        {dest.icon} {dest.type}
                                    </span>
                                </div>
                                <div style={{ position: 'absolute', top: '0.75rem', right: '0.75rem' }}>
                                    <span style={{ background: typeColors[dest.type] ?? '#6b7280', color: 'white', borderRadius: '999px', padding: '0.2rem 0.65rem', fontSize: '0.72rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif' }}>
                                        📍 {dest.district}
                                    </span>
                                </div>
                            </div>

                            <div style={{ padding: '1.5rem' }}>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>{dest.name}</h2>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.7, marginBottom: '1rem' }}>{dest.description}</p>

                                <div style={{ marginBottom: '1rem' }}>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                                        {dest.highlights?.map((h: string) => (
                                            <span key={h} style={{ background: 'var(--bg)', border: '1px solid var(--border)', color: 'var(--text-dark)', borderRadius: '999px', padding: '0.2rem 0.6rem', fontSize: '0.75rem', fontFamily: 'Outfit, sans-serif', fontWeight: 500 }}>
                                                ✓ {h}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'var(--bg)', borderRadius: '0.75rem', padding: '0.75rem 1rem' }}>
                                    <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>⏰ {dest.timing}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Map Section */}
                <div style={{ marginTop: '4rem' }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Vagad Region Map</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>All destinations are within Banswara & Dungarpur districts of Southern Rajasthan</p>
                    <div style={{ borderRadius: '1.25rem', overflow: 'hidden', border: '1px solid var(--border)', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d922234!2d74.0!3d23.5!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39681f9d0d4f8ec5%3A0xb3d8c7c1e37123db!2sVagad%20Region!5e0!3m2!1sen!2sin!4v1"
                            width="100%" height="420" style={{ border: 0, display: 'block' }} allowFullScreen loading="lazy"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
