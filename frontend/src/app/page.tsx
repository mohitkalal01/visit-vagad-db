'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import SearchBar from '@/components/SearchBar';
import ProductCard, { Product } from '@/components/ProductCard';
import StayCard, { Stay } from '@/components/StayCard';
import Badge from '@/components/Badge';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [stays, setStays] = useState<Stay[]>([]);
  const [destinations, setDestinations] = useState<any[]>([]);
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const [productsRes, staysRes, destRes, revRes] = await Promise.all([
          fetch(`${baseUrl}/products`, { credentials: 'include' }).then(res => res.json()),
          fetch(`${baseUrl}/stays`, { credentials: 'include' }).then(res => res.json()),
          fetch(`${baseUrl}/destinations`, { credentials: 'include' }).then(res => res.json()),
          fetch(`${baseUrl}/reviews`, { credentials: 'include' }).then(res => res.json())
        ]);
        
        if (productsRes.success) setProducts(productsRes.data.slice(0, 4));
        if (staysRes.success) setStays(staysRes.data.slice(0, 3));
        if (destRes.success) setDestinations(destRes.data.slice(0, 4));
        if (revRes.success) setTestimonials(revRes.data.slice(0, 6));
      } catch (err) {
        console.error('Failed to fetch home data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      {/* ======================== HERO ======================== */}
      <section style={{
        minHeight: '92vh',
        background: 'linear-gradient(135deg, rgba(18,42,32,0.88) 0%, rgba(26,58,46,0.75) 50%, rgba(96,60,20,0.6) 100%), url(https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80) center/cover no-repeat',
        display: 'flex', alignItems: 'center',
        padding: '4rem 1.5rem',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Floating decorative dots */}
        <div className="hero-circle-1" style={{ position: 'absolute', top: '15%', right: '8%', width: 180, height: 180, borderRadius: '50%', border: '1px solid rgba(224,112,80,0.2)', pointerEvents: 'none' }} />
        <div className="hero-circle-2" style={{ position: 'absolute', top: '10%', right: '5%', width: 300, height: 300, borderRadius: '50%', border: '1px solid rgba(224,112,80,0.1)', pointerEvents: 'none' }} />
        <div className="hero-circle-3" style={{ position: 'absolute', bottom: '10%', left: '3%', width: 200, height: 200, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.08)', pointerEvents: 'none' }} />

        <div className="container-custom" style={{ zIndex: 1 }}>
          {/* Pre-title */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', background: 'rgba(224,112,80,0.15)', border: '1px solid rgba(224,112,80,0.3)', borderRadius: '999px', padding: '0.4rem 1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: '#f0a080', fontFamily: 'Outfit, sans-serif', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
              🌿 Discover Rajasthan's Hidden Gem
            </span>
          </div>

          <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: 'white', lineHeight: 1.1, marginBottom: '1.25rem', maxWidth: 680 }}>
            Experience the Soul of <span style={{ background: 'linear-gradient(135deg, #e07050, #f0a080)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Vagad</span>
          </h1>

          <p style={{ fontSize: 'clamp(1rem, 2vw, 1.2rem)', color: 'rgba(255,255,255,0.8)', maxWidth: 560, lineHeight: 1.7, marginBottom: '2.5rem' }}>
            Tribal culture, ancient temples, Mahi River backwaters, and handcrafted Bhil art — all in Banswara & Dungarpur, Rajasthan.
          </p>

          {/* Stats */}
          <div className="hero-stats" style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', marginBottom: '2.5rem' }}>
            {[['50+', 'Rural Homestays'], ['200+', 'Verified Artisans'], ['15+', 'Destinations'], ['4.8★', 'Avg. Rating']].map(([num, label]) => (
              <div key={label}>
                <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.6rem', color: '#e07050' }}>{num}</div>
                <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.6)' }}>{label}</div>
              </div>
            ))}
          </div>

          {/* Search Bar */}
          <SearchBar />

          {/* CTA Buttons */}
          <div className="hero-ctas" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '1.75rem' }}>
            <Link href="/planner" className="btn-accent">✨ Plan with AI</Link>
            <Link href="/destinations" className="btn-outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.4)' }}>Explore Destinations →</Link>
          </div>
        </div>
      </section>

      {/* ======================== TRUST STRIP ======================== */}
      <div style={{ background: 'var(--primary)', padding: '1rem 1.5rem', overflowX: 'auto' }}>
        <div className="container-custom" style={{ display: 'flex', gap: '2rem', justifyContent: 'center', flexWrap: 'wrap', alignItems: 'center' }}>
          {[
            ['✅', 'RIPS 2024 Certified Platform'],
            ['🏛️', 'Govt. Verified Artisans'],
            ['⭐', 'Paryatan Mitra Hosts'],
            ['🌿', 'Eco-Responsible Tourism'],
            ['🔒', 'Secure Bookings'],
          ].map(([icon, label]) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'rgba(255,255,255,0.85)', fontSize: '0.88rem', fontFamily: 'Outfit, sans-serif', fontWeight: 500, whiteSpace: 'nowrap' }}>
              <span>{icon}</span> {label}
            </div>
          ))}
        </div>
      </div>

      {/* ======================== BHIL BAZAAR SECTION ======================== */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--bg)' }}>
        <div className="container-custom">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <p style={{ color: 'var(--accent)', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                🛍️ Bhil Bazaar
              </p>
              <h2 className="section-title" style={{ margin: 0 }}>Handcrafted Tribal Art</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.4rem' }}>Authentic crafts by Govt. Verified Artisans of Vagad</p>
            </div>
            <Link href="/bazaar" className="btn-outline">Browse All Products →</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {products.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        </div>
      </section>

      {/* ======================== VAGAD STAYS SECTION ======================== */}
      <section style={{ padding: '5rem 1.5rem', background: 'white' }}>
        <div className="container-custom">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2.5rem' }}>
            <div>
              <p style={{ color: 'var(--accent)', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.4rem' }}>
                🏡 Vagad Stays
              </p>
              <h2 className="section-title" style={{ margin: 0 }}>Rural Homestays</h2>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.4rem' }}>Stay with certified Paryatan Mitra hosts across Vagad</p>
            </div>
            <Link href="/stays" className="btn-outline">View All Stays →</Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {stays.map(s => <StayCard key={s._id} stay={s} />)}
          </div>
        </div>
      </section>

      {/* ======================== FEATURED DESTINATIONS SECTION ======================== */}
      <section style={{ padding: '5rem 1.5rem', background: 'var(--bg)' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <p style={{ color: 'var(--accent)', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem' }}>
              📍 Explore Vagad
            </p>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Iconic Landmarks</h2>
            <p className="section-subtitle" style={{ textAlign: 'center' }}>Discover the historical and natural wonders of Rajasthan&apos;s South</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '2rem' }}>
            {destinations.map(dest => (
              <Link key={dest._id} href="/destinations" style={{ textDecoration: 'none' }}>
                <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ height: 220, overflow: 'hidden', position: 'relative' }}>
                    <img 
                      src={dest.images?.[0] || 'https://images.unsplash.com/photo-1548013146-72479768bbaa'} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                      alt={dest.name} 
                    />
                    <div style={{ position: 'absolute', top: '1rem', left: '1rem' }}>
                        <Badge variant="district">{dest.district}</Badge>
                    </div>
                  </div>
                  <div style={{ padding: '1.5rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: 'var(--primary)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>{dest.name}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1rem' }}>{dest.description?.substring(0, 80)}...</p>
                    <div style={{ marginTop: 'auto', color: 'var(--accent)', fontWeight: 700, fontSize: '0.85rem' }}>Explore →</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ======================== AI PLANNER CTA ======================== */}
      <section style={{
        padding: '5rem 1.5rem',
        background: 'linear-gradient(135deg, var(--primary) 0%, var(--primary-light) 50%, #3a6a50 100%)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: 280, height: 280, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.06)' }} />
        <div style={{ position: 'absolute', bottom: '-60px', left: '-30px', width: 220, height: 220, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.04)' }} />
        <div className="container-custom" style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✨</div>
          <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: 'clamp(1.8rem, 4vw, 2.8rem)', color: 'white', marginBottom: '1rem' }}>
            Let AI Plan Your Perfect Vagad Trip
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1.1rem', maxWidth: 520, margin: '0 auto 2rem' }}>
            Answer a few questions — Gemini AI builds your personalised day-wise Vagad itinerary instantly, covering all the must-see landmarks.
          </p>
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/planner" className="btn-accent" style={{ fontSize: '1.05rem', padding: '0.9rem 2rem' }}>✨ Generate My Itinerary</Link>
            <Link href="/destinations" style={{ color: 'rgba(255,255,255,0.8)', border: '1px solid rgba(255,255,255,0.25)', padding: '0.9rem 2rem', borderRadius: '999px', fontFamily: 'Outfit, sans-serif', fontWeight: 600, textDecoration: 'none', transition: 'all 0.2s', fontSize: '1.05rem' }}>Browse Destinations</Link>
          </div>
        </div>
      </section>

      {/* ======================== TESTIMONIALS ======================== */}
      <section style={{ padding: '5rem 1.5rem', background: 'white' }}>
        <div className="container-custom">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 className="section-title" style={{ textAlign: 'center' }}>Traveller Stories</h2>
            <p className="section-subtitle" style={{ textAlign: 'center' }}>What visitors say about Vagad</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1.5rem' }}>
            {testimonials.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '3rem', background: 'var(--bg)', borderRadius: '1rem', color: 'var(--text-muted)' }}>
                    No reviews yet. Be the first to <Link href="/stays" style={{ color: 'var(--primary)', fontWeight: 700 }}>stay</Link> and share your story!
                </div>
            ) : (
                testimonials.map(t => (
                  <div key={t._id} style={{ background: 'var(--bg)', borderRadius: '1rem', padding: '1.75rem', border: '1px solid var(--border)' }}>
                    <div style={{ color: '#f59e0b', fontSize: '1.1rem', marginBottom: '0.75rem' }}>{'⭐'.repeat(t.rating)}</div>
                    <p style={{ color: 'var(--text-dark)', lineHeight: 1.7, fontSize: '0.95rem', marginBottom: '1rem' }}>"{t.comment}"</p>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'Outfit, sans-serif', fontWeight: 700 }}>
                        {t.user_name[0]}
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '0.95rem' }}>{t.user_name}</div>
                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Verified Traveller</div>
                      </div>
                    </div>
                  </div>
                ))
            )}
          </div>
        </div>
      </section>
      <style>{`
        @media (max-width: 768px) {
          .hero-circle-1, .hero-circle-2, .hero-circle-3 {
            display: none !important;
          }
          .hero-stats {
            gap: 1.25rem !important;
            justify-content: space-between !important;
          }
          .hero-ctas {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .hero-ctas > a {
            text-align: center !important;
            justify-content: center !important;
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
