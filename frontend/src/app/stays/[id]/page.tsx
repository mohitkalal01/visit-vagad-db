'use client';

import { useState, useEffect } from 'react';

import { useParams, useRouter } from 'next/navigation';
import Badge from '@/components/Badge';
import Link from 'next/link';
import { Stay } from '@/components/StayCard';
import { useAuth } from '@/context/AuthContext';

type StayWithExtras = Stay & { 
  description?: string; 
  amenities?: string[]; 
  host_name?: string;
  distance_from_landmark?: string;
};

export default function StayDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { user } = useAuth();
  
  const [stay, setStay] = useState<StayWithExtras | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImg, setActiveImg] = useState(0);
  const [reviews, setReviews] = useState<any[]>([]);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [newReview, setNewReview] = useState({ rating: 5, comment: '' });
  const [bookingLoading, setBookingLoading] = useState(false);
  const [booked, setBooked] = useState(false);
  const [form, setForm] = useState({
    checkIn: '',
    checkOut: '',
    guests: 1
  });

  const fetchReviews = async () => {
    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${baseUrl}/reviews?reference_id=${id}&type=stay`, {
        credentials: 'include'
      });
      const data = await res.json();
      if (data.success) setReviews(data.data);
    } catch (err) {
      console.error('Failed to load reviews');
    }
  };

  useEffect(() => {
    const fetchStay = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${baseUrl}/stays/${id}`, {
          credentials: 'include'
        });
        const data = await res.json();
        if (data.success) {
          setStay(data.data);
        } else {
          setError(data.error || 'Stay not found');
        }
      } catch (err) {
        setError('Failed to load stay details');
      } finally {
        setLoading(false);
      }
    };
    if (id) {
        fetchStay();
        fetchReviews();
    }
  }, [id]);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
        router.push('/auth/login');
        return;
    }
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL;
        setReviewLoading(true);
        const res = await fetch(`${baseUrl}/reviews`, {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: user.id,
                user_name: user.name,
                reference_id: id,
                type: 'stay',
                rating: newReview.rating,
                comment: newReview.comment
            })
        });
        const data = await res.json();
        if (data.success) {
            setNewReview({ rating: 5, comment: '' });
            fetchReviews();
            alert('Review submitted! Thank you.');
        }
    } catch (err) {
        alert('Failed to submit review');
    } finally {
        setReviewLoading(false);
    }
  };

  if (loading) return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ width: 48, height: 48, borderRadius: '50%', border: '4px solid var(--bg)', borderTop: '4px solid var(--primary)', animation: 'spin 0.8s linear infinite' }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
  if (!stay) return <div style={{ padding: '5rem', textAlign: 'center' }}>Stay not found.</div>;

  const handleBooking = async () => {
    if (!user) {
      router.push('/auth/login');
      return;
    }

    if (!stay) return;

    if (!form.checkIn || !form.checkOut) {
      alert('Please select check-in and check-out dates');
      return;
    }

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL;
      setBookingLoading(true);
      const res = await fetch(`${baseUrl}/bookings`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          stay_id: stay._id,
          stay_name: stay.name,
          host_name: stay.host_name || 'Host',
          check_in: form.checkIn,
          check_out: form.checkOut,
          guests: form.guests,
          price_per_night: stay.price_per_night,
          status: 'pending'
        }),
      });
      const data = await res.json();
      if (data.success) {
        setBooked(true);
      } else {
        alert(data.error || 'Booking failed');
      }
    } catch (err) {
      alert('Connection error');
    } finally {
      setBookingLoading(false);
    }
  };

  const images = stay.images?.length ? stay.images : [`https://picsum.photos/seed/stay-${id}/800/500`];
  const nights = form.checkIn && form.checkOut ? Math.max(1, Math.ceil((new Date(form.checkOut).getTime() - new Date(form.checkIn).getTime()) / 86400000)) : 1;

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '1rem 1.5rem' }}>
        <div className="container-custom" style={{ display: 'flex', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)', alignItems: 'center' }}>
          <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
          <span>›</span><Link href="/stays" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Vagad Stays</Link>
          <span>›</span><span>{stay.name}</span>
        </div>
      </div>

      {error && (
        <div className="container-custom" style={{ padding: '2rem 1.5rem' }}>
          <div style={{ background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: '0.75rem', padding: '1rem', color: '#dc2626', textAlign: 'center' }}>
            {error}
          </div>
        </div>
      )}

      <div className="container-custom" style={{ padding: '3rem 1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: '3rem', alignItems: 'start' }}>
          <div>
            <div style={{ borderRadius: '1.25rem', overflow: 'hidden', height: 420, marginBottom: '1rem' }}>
              <img src={images[activeImg]} alt={stay.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>
            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '2rem' }}>
                {images.map((img, i) => (
                  <button key={i} onClick={() => setActiveImg(i)} style={{ width: 80, height: 60, borderRadius: '0.75rem', overflow: 'hidden', border: i === activeImg ? '2px solid var(--primary)' : '2px solid transparent', cursor: 'pointer', padding: 0 }}>
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </button>
                ))}
              </div>
            )}

            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '2rem', marginBottom: '0.75rem', color: 'var(--text-dark)' }}>{stay.name}</h1>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              {stay.rips_certified && <Badge variant="rips">RIPS 2024 Certified</Badge>}
              {stay.paryatan_mitra_level && <Badge variant="paryatan">Paryatan Mitra L{stay.paryatan_mitra_level}</Badge>}
              {stay.district && <Badge variant="district">{stay.district}</Badge>}
            </div>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, marginBottom: '2rem', fontSize: '0.97rem' }}>{stay.description}</p>

            {stay.amenities && (
              <div>
                <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: 'var(--primary)', marginBottom: '1rem' }}>What&apos;s Included</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.75rem' }}>
                  {stay.amenities.map(a => (
                    <div key={a} style={{ background: 'white', border: '1px solid var(--border)', borderRadius: '0.75rem', padding: '0.65rem 1rem', fontSize: '0.88rem', color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <span style={{ color: 'var(--primary)' }}>✓</span> {a}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', border: '1px solid var(--border)', marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.3rem', flexShrink: 0 }}>
                {stay.host_name?.[0]}
              </div>
              <div>
                <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, fontSize: '1.05rem', color: 'var(--primary)' }}>Hosted by {stay.host_name}</p>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{stay.location} · {stay.distance_from_landmark}</p>
                {stay.rating && <p style={{ fontSize: '0.85rem', color: '#f59e0b', marginTop: '0.25rem' }}>⭐ {stay.rating} · {stay.review_count} reviews</p>}
              </div>
            </div>
          </div>

          {/* Booking Card */}
          <div style={{ position: 'sticky', top: '5rem' }}>
            <div style={{ background: 'white', borderRadius: '1.5rem', padding: '1.75rem', boxShadow: '0 8px 40px rgba(0,0,0,0.1)', border: '1px solid var(--border)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.3rem', marginBottom: '1.5rem' }}>
                <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '2rem', color: 'var(--primary)' }}>₹{stay.price_per_night.toLocaleString('en-IN')}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>/night</span>
              </div>

              {booked ? (
                <div style={{ background: '#dcfce7', border: '1px solid #4ade80', borderRadius: '1rem', padding: '1.5rem', textAlign: 'center' }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>🎉</div>
                  <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#15803d', fontSize: '1.1rem' }}>Booking Confirmed!</p>
                  <p style={{ color: '#166534', fontSize: '0.9rem', marginTop: '0.4rem' }}>Host {stay.host_name} will contact you within 24 hours.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'Outfit, sans-serif', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Check In</label>
                      <input type="date" value={form.checkIn} onChange={e => setForm(f => ({ ...f, checkIn: e.target.value }))} style={{ width: '100%', padding: '0.65rem', border: '1px solid var(--border)', borderRadius: '0.75rem', fontSize: '0.9rem', outline: 'none', fontFamily: 'Inter, sans-serif' }} />
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'Outfit, sans-serif', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Check Out</label>
                      <input type="date" value={form.checkOut} onChange={e => setForm(f => ({ ...f, checkOut: e.target.value }))} style={{ width: '100%', padding: '0.65rem', border: '1px solid var(--border)', borderRadius: '0.75rem', fontSize: '0.9rem', outline: 'none', fontFamily: 'Inter, sans-serif' }} />
                    </div>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.72rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'Outfit, sans-serif', marginBottom: '0.4rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Guests</label>
                    <input type="number" min={1} max={10} value={form.guests} onChange={e => setForm(f => ({ ...f, guests: Number(e.target.value) }))} style={{ width: '100%', padding: '0.65rem', border: '1px solid var(--border)', borderRadius: '0.75rem', fontSize: '0.9rem', outline: 'none', fontFamily: 'Inter, sans-serif' }} />
                  </div>
                  <div style={{ background: 'var(--bg)', borderRadius: '1rem', padding: '1rem', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                      <span>₹{stay.price_per_night.toLocaleString('en-IN')} × {nights} night{nights > 1 ? 's' : ''}</span>
                      <span>₹{(stay.price_per_night * nights).toLocaleString('en-IN')}</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '0.5rem', borderTop: '1px solid var(--border)', fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: 'var(--primary)' }}>
                      <span>Total</span><span>₹{(stay.price_per_night * nights).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                  <button 
                    className="btn-primary" 
                    onClick={handleBooking} 
                    disabled={bookingLoading}
                    style={{ justifyContent: 'center', padding: '1rem', fontSize: '1rem', opacity: bookingLoading ? 0.7 : 1 }}
                  >
                    {bookingLoading ? 'Reserving...' : 'Reserve Stay'}
                  </button>
                  <p style={{ textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-muted)' }}>You won&apos;t be charged yet</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Reviews Section */}
      <div className="container-custom" style={{ padding: '4rem 1.5rem', borderTop: '1px solid var(--border)', marginTop: '4rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
            {/* Reviews List */}
            <div>
                <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '2rem' }}>Guest Reviews ({reviews.length})</h2>
                {reviews.length === 0 ? (
                    <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', border: '1px solid var(--border)', color: 'var(--text-muted)', textAlign: 'center' }}>
                        No reviews yet. Be the first to share your experience!
                    </div>
                ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                        {reviews.map((r: any) => (
                            <div key={r._id} style={{ background: 'white', borderRadius: '1rem', padding: '1.5rem', border: '1px solid var(--border)' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                                        <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: 'var(--primary)', fontSize: '0.9rem' }}>
                                            {r.user_name[0]}
                                        </div>
                                        <div>
                                            <p style={{ fontWeight: 700, fontSize: '0.95rem', color: 'var(--text-dark)' }}>{r.user_name}</p>
                                            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{new Date(r.createdAt).toLocaleDateString()}</p>
                                        </div>
                                    </div>
                                    <div style={{ color: '#f59e0b', fontSize: '0.9rem' }}>{'★'.repeat(r.rating)}{'☆'.repeat(5-r.rating)}</div>
                                </div>
                                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.6 }}>{r.comment}</p>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Review Form */}
            <div>
                <div style={{ background: 'white', borderRadius: '1.5rem', padding: '2rem', border: '1px solid var(--border)', position: 'sticky', top: '5rem' }}>
                    <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Share Your Experience</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Your feedback helps other travelers discover the best of Vagad.</p>
                    
                    <form onSubmit={handleReviewSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'Outfit, sans-serif', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Rating</label>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {[1,2,3,4,5].map(num => (
                                    <button key={num} type="button" onClick={() => setNewReview(prev => ({ ...prev, rating: num }))} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: num <= newReview.rating ? '#f59e0b' : '#e5e7eb', padding: 0 }}>
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>
                        <div>
                            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'Outfit, sans-serif', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Comment</label>
                            <textarea 
                                required
                                rows={4}
                                value={newReview.comment}
                                onChange={e => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                                placeholder="Tell us about your stay, the hospitality, or the location..."
                                style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border)', borderRadius: '1rem', fontSize: '0.95rem', fontFamily: 'Inter, sans-serif', outline: 'none', resize: 'none' }}
                            />
                        </div>
                        <button type="submit" className="btn-primary" disabled={reviewLoading} style={{ justifyContent: 'center', padding: '0.85rem' }}>
                            {reviewLoading ? 'Submitting...' : 'Post Review'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}
