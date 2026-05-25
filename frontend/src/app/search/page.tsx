'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Badge from '@/components/Badge';

function SearchResultsContent() {
    const searchParams = useSearchParams();
    const query = searchParams?.get('q') || '';
    const [results, setResults] = useState<{ destinations: any[], stays: any[], products: any[] }>({
        destinations: [],
        stays: [],
        products: []
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const performSearch = async () => {
            if (!query) {
                setLoading(false);
                return;
            }
            setLoading(true);
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_URL;
                const res = await fetch(`${baseUrl}/search?q=${encodeURIComponent(query)}`, {
                    credentials: 'include'
                });
                const data = await res.json();
                if (data.success) {
                    setResults(data.data);
                }
            } catch (err) {
                console.error('Search failed');
            } finally {
                setLoading(false);
            }
        };
        performSearch();
    }, [query]);

    if (loading) return <div style={{ padding: '5rem', textAlign: 'center' }}>Searching for &quot;{query}&quot;...</div>;

    const totalCount = results.destinations.length + results.stays.length + results.products.length;

    return (
        <div style={{ background: '#f8fafc', minHeight: '100vh', padding: '4rem 1.5rem' }}>
            <div className="container-custom">
                <header style={{ marginBottom: '3rem' }}>
                    <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '2.5rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>
                        Search Results
                    </h1>
                    <p style={{ color: 'var(--text-muted)' }}>
                        Found {totalCount} results for &quot;<span style={{ color: 'var(--accent)', fontWeight: 700 }}>{query}</span>&quot;
                    </p>
                </header>

                {totalCount === 0 ? (
                    <div style={{ padding: '5rem', textAlign: 'center', background: 'white', borderRadius: '2rem', border: '1px solid var(--border)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                        <h2 style={{ color: 'var(--text-dark)', marginBottom: '1rem' }}>No matches found</h2>
                        <p style={{ color: 'var(--text-muted)' }}>Try searching for &quot;Banswara&quot;, &quot;Homestay&quot;, or &quot;Bamboo&quot;</p>
                        <Link href="/" className="btn-primary" style={{ marginTop: '2rem', display: 'inline-flex' }}>Go Back Home</Link>
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
                        
                        {/* Destinations */}
                        {results.destinations.length > 0 && (
                            <section>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    📍 Destinations <Badge variant="district">{results.destinations.length}</Badge>
                                </h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                    {results.destinations.map(d => (
                                        <Link key={d._id} href={`/destinations#${d.name}`} style={{ textDecoration: 'none' }}>
                                            <div className="card" style={{ height: '100%' }}>
                                                <div style={{ height: 180, background: '#e2e8f0', overflow: 'hidden' }}>
                                                    <img src={d.images?.[0] || 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={d.name} />
                                                </div>
                                                <div style={{ padding: '1.25rem' }}>
                                                    <h3 style={{ color: 'var(--text-dark)', marginBottom: '0.5rem' }}>{d.name}</h3>
                                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{d.district} · {d.type}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Stays */}
                        {results.stays.length > 0 && (
                            <section>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    🏨 Vagad Stays <Badge variant="rips">{results.stays.length}</Badge>
                                </h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                    {results.stays.map(s => (
                                        <Link key={s._id} href={`/stays/${s._id}`} style={{ textDecoration: 'none' }}>
                                            <div className="card" style={{ height: '100%' }}>
                                                <div style={{ height: 180, background: '#e2e8f0', overflow: 'hidden' }}>
                                                    <img src={s.images?.[0] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={s.name} />
                                                </div>
                                                <div style={{ padding: '1.25rem' }}>
                                                    <h3 style={{ color: 'var(--text-dark)', marginBottom: '0.5rem' }}>{s.name}</h3>
                                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{s.district} · ₹{s.price_per_night}/night</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                        {/* Products */}
                        {results.products.length > 0 && (
                            <section>
                                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: 'var(--text-dark)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                    🛍️ Bhil Bazaar <Badge variant="verified">{results.products.length}</Badge>
                                </h2>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
                                    {results.products.map(p => (
                                        <Link key={p._id} href={`/bazaar/${p._id}`} style={{ textDecoration: 'none' }}>
                                            <div className="card" style={{ height: '100%' }}>
                                                <div style={{ height: 180, background: '#e2e8f0', overflow: 'hidden' }}>
                                                    <img src={p.images?.[0] || 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt={p.name} />
                                                </div>
                                                <div style={{ padding: '1.25rem' }}>
                                                    <h3 style={{ color: 'var(--text-dark)', marginBottom: '0.5rem' }}>{p.name}</h3>
                                                    <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{p.category} · ₹{p.price}</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </section>
                        )}

                    </div>
                )}
            </div>
        </div>
    );
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div style={{ padding: '5rem', textAlign: 'center' }}>Loading Search...</div>}>
            <SearchResultsContent />
        </Suspense>
    );
}
