'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import Badge from '@/components/Badge';

export default function AdminDashboard() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();
    const [activeTab, setActiveTab] = useState<'bookings' | 'orders' | 'stays' | 'products' | 'users'>('bookings');
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!authLoading && (!user || user.role !== 'admin')) {
            router.push('/');
        }
    }, [user, authLoading, router]);

    const fetchData = async (tab: string) => {
        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/${tab}`, {
                credentials: 'include'
            });
            const json = await res.json();
            if (json.success) setData(json.data);
        } catch (err) {
            console.error('Failed to fetch admin data');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.role === 'admin') {
            fetchData(activeTab);
        }
    }, [activeTab, user]);

    if (authLoading || !user || user.role !== 'admin') return <div style={{ padding: '5rem', textAlign: 'center' }}>Verifying Admin Access...</div>;

    return (
        <div className="admin-container" style={{ background: '#f8fafc', minHeight: '100vh', display: 'flex' }}>
            {/* Sidebar */}
            <div className="admin-sidebar" style={{ width: 280, background: 'var(--primary)', color: 'white', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.5rem', marginBottom: '0.5rem' }}>Visit Vagad</h1>
                    <p style={{ fontSize: '0.85rem', opacity: 0.7 }}>Control Center</p>
                </div>

                <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    {[
                        { id: 'bookings', label: '🏨 Stay Bookings', icon: '📅' },
                        { id: 'orders', label: '🛍️ Shop Orders', icon: '🛒' },
                        { id: 'stays', label: '🏠 Manage Stays', icon: '🏡' },
                        { id: 'products', label: '🎨 Manage Products', icon: '📦' },
                        { id: 'users', label: '👥 User Directory', icon: '👤' },
                    ].map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as any)}
                            style={{
                                background: activeTab === item.id ? 'rgba(255,255,255,0.15)' : 'transparent',
                                border: 'none', color: 'white', padding: '0.85rem 1rem', borderRadius: '0.75rem',
                                textAlign: 'left', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontWeight: 600,
                                transition: 'all 0.2s', fontSize: '0.95rem'
                            }}
                        >
                            {item.label}
                        </button>
                    ))}
                </nav>
            </div>

            {/* Main Content */}
            <div className="admin-content" style={{ flex: 1, padding: '3rem' }}>
                <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
                    <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: 'var(--primary)' }}>
                        {activeTab.charAt(0).toUpperCase() + activeTab.slice(1)} Management
                    </h2>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                        {(activeTab === 'stays' || activeTab === 'products') && (
                            <button className="btn-accent" style={{ fontSize: '0.9rem', padding: '0.6rem 1.2rem' }}>+ Add New {activeTab.slice(0,-1)}</button>
                        )}
                    </div>
                </header>

                {loading ? (
                    <div style={{ padding: '5rem', textAlign: 'center', color: 'var(--text-muted)' }}>Loading records...</div>
                ) : (
                    <div className="admin-table-wrapper" style={{ background: 'white', borderRadius: '1.5rem', border: '1px solid var(--border)', overflow: 'hidden' }}>
                        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                            <thead style={{ background: '#f1f5f9', borderBottom: '1px solid var(--border)' }}>
                                <tr>
                                    <th style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>Details</th>
                                    <th style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>Status</th>
                                    <th style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>Amount</th>
                                    <th style={{ padding: '1rem 1.5rem', fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)', textTransform: 'uppercase' }}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} style={{ padding: '4rem', textAlign: 'center', color: 'var(--text-muted)' }}>No records found in this section.</td>
                                    </tr>
                                ) : (
                                    data.map((item: any) => (
                                        <tr key={item._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '1.25rem 1.5rem' }}>
                                                <div style={{ fontWeight: 700, color: 'var(--text-dark)', marginBottom: '0.25rem' }}>
                                                    {item.stay_name || item.product_name || item.name}
                                                </div>
                                                <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                                                    {item.user_name || item.artisan_name || item.email}
                                                </div>
                                            </td>
                                            <td style={{ padding: '1.25rem 1.5rem' }}>
                                                <Badge variant={item.status === 'confirmed' || item.status === 'active' ? 'rips' : 'district'}>
                                                    {(item.status || 'Active').toUpperCase()}
                                                </Badge>
                                            </td>
                                            <td style={{ padding: '1.25rem 1.5rem', fontWeight: 700, color: 'var(--primary)' }}>
                                                ₹{(item.total_price || item.price || 0).toLocaleString('en-IN')}
                                            </td>
                                            <td style={{ padding: '1.25rem 1.5rem' }}>
                                                <button style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', fontSize: '1.2rem' }}>⋮</button>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <style>{`
        @media (max-width: 900px) {
          .admin-container {
            flex-direction: column !important;
          }
          .admin-sidebar {
            width: 100% !important;
            padding: 1.5rem !important;
            gap: 1.25rem !important;
            flex-direction: row !important;
            justify-content: space-between !important;
            align-items: center !important;
          }
          .admin-sidebar > div {
            margin-bottom: 0 !important;
          }
          .admin-sidebar nav {
            flex-direction: row !important;
            overflow-x: auto !important;
            padding-bottom: 0.25rem !important;
            width: auto !important;
            flex: 1 !important;
            justify-content: flex-end !important;
            gap: 0.5rem !important;
          }
          .admin-sidebar nav button {
            white-space: nowrap !important;
            padding: 0.5rem 0.75rem !important;
            font-size: 0.85rem !important;
          }
          .admin-content {
            padding: 1.5rem !important;
          }
          .admin-content header {
            flex-direction: column !important;
            align-items: stretch !important;
            gap: 1rem !important;
          }
        }
        @media (max-width: 600px) {
          .admin-sidebar {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .admin-sidebar nav {
            justify-content: flex-start !important;
            width: 100% !important;
          }
        }
        .admin-table-wrapper {
          overflow-x: auto !important;
        }
        .admin-table-wrapper table {
          min-width: 600px;
        }
      `}</style>
        </div>
    );
}
