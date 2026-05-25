'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ProductCard, { Product } from '@/components/ProductCard';

const CATEGORIES = [
    { key: 'all', label: 'All Crafts', emoji: '🎨' },
    { key: 'bamboo_crafts', label: 'Bamboo Crafts', emoji: '🎋' },
    { key: 'stone_carvings', label: 'Stone Carvings', emoji: '🗿' },
    { key: 'textiles', label: 'Tribal Textiles', emoji: '🧵' },
    { key: 'warli', label: 'Warli Paintings', emoji: '🖼️' },
    { key: 'terracotta', label: 'Terracotta', emoji: '🏺' },
];

export default function BazaarPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [activeCategory, setActiveCategory] = useState('all');
    const [district, setDistrict] = useState('all');
    const [loading, setLoading] = useState(true);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                setLoading(true);
                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/products`, {
                    credentials: 'include'
                });
                const data = await res.json();
                if (data.success) {
                    setProducts(data.data);
                }
            } catch (err) {
                console.error('Failed to fetch bazaar products');
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const filtered = products.filter(p => {
        const catOk = activeCategory === 'all' || p.category === activeCategory;
        const distOk = district === 'all' || p.district?.toLowerCase() === district;
        const searchOk = !searchText || p.name.toLowerCase().includes(searchText.toLowerCase()) || p.artisan_name.toLowerCase().includes(searchText.toLowerCase());
        return catOk && distOk && searchOk;
    });

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            {/* Hero */}
            <div style={{ background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 100%)', padding: '4rem 1.5rem 3rem', textAlign: 'center' }}>
                <p style={{ color: 'rgba(224,112,80,0.8)', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>🛍️ Bhil Bazaar</p>
                <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(2rem, 5vw, 3.2rem)', color: 'white', marginBottom: '0.75rem' }}>Tribal Craft Marketplace</h1>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '1.05rem', maxWidth: 500, margin: '0 auto 2rem' }}>Authentic handcrafted products by Govt. Verified Artisans of Vagad region</p>

                {/* Search */}
                <div style={{ maxWidth: 480, margin: '0 auto', position: 'relative' }}>
                    <input
                        type="text"
                        placeholder="Search products or artisans..."
                        value={searchText}
                        onChange={e => setSearchText(e.target.value)}
                        style={{ width: '100%', padding: '0.9rem 1.5rem', borderRadius: '999px', border: 'none', outline: 'none', fontSize: '0.95rem', fontFamily: 'Inter, sans-serif', boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}
                    />
                    <span style={{ position: 'absolute', right: '1.25rem', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem' }}>🔍</span>
                </div>
            </div>

            <div className="container-custom" style={{ padding: '2.5rem 1.5rem' }}>
                {/* Filters Row */}
                <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between' }}>
                    {/* Category tabs */}
                    <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                        {CATEGORIES.map(cat => (
                            <button
                                key={cat.key}
                                onClick={() => setActiveCategory(cat.key)}
                                style={{
                                    padding: '0.5rem 1.1rem',
                                    borderRadius: '999px',
                                    border: activeCategory === cat.key ? 'none' : '1px solid var(--border)',
                                    background: activeCategory === cat.key ? 'var(--primary)' : 'white',
                                    color: activeCategory === cat.key ? 'white' : 'var(--text-dark)',
                                    fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem',
                                    cursor: 'pointer', transition: 'all 0.2s',
                                    display: 'flex', alignItems: 'center', gap: '0.3rem',
                                }}
                            >
                                {cat.emoji} {cat.label}
                            </button>
                        ))}
                    </div>
                    {/* District filter */}
                    <select
                        value={district}
                        onChange={e => setDistrict(e.target.value)}
                        style={{ padding: '0.5rem 1rem', borderRadius: '999px', border: '1px solid var(--border)', fontFamily: 'Inter, sans-serif', fontSize: '0.9rem', background: 'white', cursor: 'pointer', outline: 'none' }}
                    >
                        <option value="all">📍 All Districts</option>
                        <option value="banswara">Banswara</option>
                        <option value="dungarpur">Dungarpur</option>
                    </select>
                </div>

                {/* Results count */}
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                    Showing <strong style={{ color: 'var(--primary)' }}>{filtered.length}</strong> products
                </p>

                {/* Grid */}
                {loading ? (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
                        {[...Array(8)].map((_, i) => <div key={i} className="skeleton" style={{ height: 320, borderRadius: '1rem' }} />)}
                    </div>
                ) : (
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
                        {filtered.map(p => <ProductCard key={p._id} product={p} />)}
                    </div>
                )}

                {filtered.length === 0 && !loading && (
                    <div style={{ textAlign: 'center', padding: '4rem 1rem', color: 'var(--text-muted)' }}>
                        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🔍</div>
                        <p style={{ fontSize: '1.1rem' }}>No products found. Try a different filter.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
