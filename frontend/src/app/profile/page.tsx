'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Badge from '@/components/Badge';

interface Booking {
    _id: string;
    stay_name: string;
    check_in: string;
    check_out: string;
    total_price: number;
    status: string;
    guests: number;
}

interface SavedItinerary {
    _id: string;
    title: string;
    days: number;
    trip_type: string;
    createdAt: string;
}

export default function ProfilePage() {
    const { user, loading: authLoading, logout } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'bookings' | 'itineraries' | 'orders'>('bookings');
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [itineraries, setItineraries] = useState<SavedItinerary[]>([]);
    const [orders, setOrders] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && !user) {
            router.push('/auth/login');
        }
    }, [user, authLoading, router]);

    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                setLoading(true);
                try {
                    const baseUrl = process.env.NEXT_PUBLIC_API_URL;
                    // Fetch bookings
                    const bRes = await fetch(`${baseUrl}/bookings?user_id=${user.id}`, { credentials: 'include' });
                    const bData = await bRes.json();
                    if (bData.success) setBookings(bData.data);

                    // Fetch itineraries
                    const iRes = await fetch(`${baseUrl}/itinerary?user_id=${user.id}`, { credentials: 'include' });
                    const iData = await iRes.json();
                    if (iData.success) setItineraries(iData.data);

                    // Fetch orders
                    const oRes = await fetch(`${baseUrl}/orders?user_id=${user.id}`, { credentials: 'include' });
                    const oData = await oRes.json();
                    if (oData.success) setOrders(oData.data);
                } catch (err) {
                    console.error('Failed to fetch profile data');
                } finally {
                    setLoading(false);
                }
            };
            fetchData();
        }
    }, [user]);

    if (authLoading || !user) return <div style={{ padding: '5rem', textAlign: 'center' }}>Loading profile...</div>;

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh', padding: '3rem 1.5rem' }}>
            <div className="container-custom">
                {/* Header Section */}
                <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2.5rem', border: '1px solid var(--border)', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
                        <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '2rem', fontWeight: 800, fontFamily: 'Outfit, sans-serif' }}>
                            {user.name[0]}
                        </div>
                        <div>
                            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: 'var(--text-dark)' }}>{user.name}</h1>
                            <p style={{ color: 'var(--text-muted)' }}>{user.email} · Explorer Member</p>
                        </div>
                    </div>
                    <button onClick={logout} style={{ padding: '0.75rem 1.5rem', borderRadius: '999px', border: '1px solid #fee2e2', background: '#fef2f2', color: '#dc2626', fontWeight: 700, cursor: 'pointer', fontFamily: 'Outfit, sans-serif' }}>
                        Logout Account
                    </button>
                </div>

                {/* Tabs */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.5rem' }}>
                    <button 
                        onClick={() => setActiveTab('bookings')}
                        style={{ background: 'none', border: 'none', padding: '0.75rem 1rem', fontSize: '1rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif', color: activeTab === 'bookings' ? 'var(--primary)' : 'var(--text-muted)', borderBottom: activeTab === 'bookings' ? '3px solid var(--primary)' : '3px solid transparent', cursor: 'pointer' }}
                    >
                        Stays ({bookings.length})
                    </button>
                    <button 
                        onClick={() => setActiveTab('orders')}
                        style={{ background: 'none', border: 'none', padding: '0.75rem 1rem', fontSize: '1rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif', color: activeTab === 'orders' ? 'var(--primary)' : 'var(--text-muted)', borderBottom: activeTab === 'orders' ? '3px solid var(--primary)' : '3px solid transparent', cursor: 'pointer' }}
                    >
                        Marketplace ({orders.length})
                    </button>
                    <button 
                        onClick={() => setActiveTab('itineraries')}
                        style={{ background: 'none', border: 'none', padding: '0.75rem 1rem', fontSize: '1rem', fontWeight: 700, fontFamily: 'Outfit, sans-serif', color: activeTab === 'itineraries' ? 'var(--primary)' : 'var(--text-muted)', borderBottom: activeTab === 'itineraries' ? '3px solid var(--primary)' : '3px solid transparent', cursor: 'pointer' }}
                    >
                        AI Plans ({itineraries.length})
                    </button>
                </div>

                {/* Content */}
                {loading ? (
                    <div style={{ padding: '3rem', textAlign: 'center' }}>Fetching your records...</div>
                ) : (
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {activeTab === 'bookings' && (
                            <>
                                {bookings.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '5rem', background: 'white', borderRadius: '1.5rem', border: '1px dashed var(--border)' }}>
                                        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>No bookings yet. Start exploring Vagad!</p>
                                    </div>
                                ) : (
                                    bookings.map(b => (
                                        <div key={b._id} style={{ background: 'white', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '0.4rem' }}>{b.stay_name}</h3>
                                                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                    <span>📅 {new Date(b.check_in).toLocaleDateString()} - {new Date(b.check_out).toLocaleDateString()}</span>
                                                    <span>👥 {b.guests} Guests</span>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: 'var(--text-dark)' }}>₹{b.total_price.toLocaleString('en-IN')}</p>
                                                <Badge variant={b.status === 'confirmed' ? 'rips' : 'district'}>
                                                    {b.status.toUpperCase()}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </>
                        )}

                        {activeTab === 'orders' && (
                            <>
                                {orders.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '5rem', background: 'white', borderRadius: '1.5rem', border: '1px dashed var(--border)' }}>
                                        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>No orders yet. Support local artisans!</p>
                                    </div>
                                ) : (
                                    orders.map(o => (
                                        <div key={o._id} style={{ background: 'white', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: 'var(--accent)', marginBottom: '0.4rem' }}>{o.product_name}</h3>
                                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.4rem' }}>by {o.artisan_name}</p>
                                                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                    <span>📦 Status: {o.status}</span>
                                                    <span>🛒 Qty: {o.quantity}</span>
                                                </div>
                                            </div>
                                            <div style={{ textAlign: 'right' }}>
                                                <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.3rem', color: 'var(--text-dark)' }}>₹{o.total_price.toLocaleString('en-IN')}</p>
                                                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(o.createdAt).toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    ))
                                )}
                            </>
                        )}

                        {activeTab === 'itineraries' && (
                            <>
                                {itineraries.length === 0 ? (
                                    <div style={{ textAlign: 'center', padding: '5rem', background: 'white', borderRadius: '1.5rem', border: '1px dashed var(--border)' }}>
                                        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)' }}>No saved plans. Try the AI Planner!</p>
                                    </div>
                                ) : (
                                    itineraries.map(it => (
                                        <div key={it._id} style={{ background: 'white', borderRadius: '1.25rem', padding: '1.5rem', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <div>
                                                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: 'var(--primary)', marginBottom: '0.4rem' }}>{it.title}</h3>
                                                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                                                    <span>⏱️ {it.days} Days</span>
                                                    <span>🎭 {it.trip_type.toUpperCase()}</span>
                                                    <span>🕒 {new Date(it.createdAt).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <button style={{ padding: '0.5rem 1rem', borderRadius: '0.75rem', border: '1px solid var(--primary)', background: 'white', color: 'var(--primary)', fontWeight: 600, cursor: 'pointer' }}>
                                                View Plan
                                            </button>
                                        </div>
                                    ))
                                )}
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
