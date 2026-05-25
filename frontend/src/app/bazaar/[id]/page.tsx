'use client';

import { useState, useEffect } from 'react';

import { useParams, useRouter } from 'next/navigation';
import Badge from '@/components/Badge';
import Link from 'next/link';
import { Product } from '@/components/ProductCard';
import { useAuth } from '@/context/AuthContext';

const categoryLabel: Record<string, string> = {
    bamboo_crafts: 'Bamboo Crafts',
    stone_carvings: 'Stone Carvings',
    textiles: 'Tribal Textiles',
    warli: 'Warli Paintings',
    terracotta: 'Terracotta',
};

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const id = params?.id as string;
    const { user } = useAuth();
    
    const [product, setProduct] = useState<(Product & { description?: string }) | null>(null);
    const [activeImg, setActiveImg] = useState(0);
    const [ordered, setOrdered] = useState(false);
    const [loading, setLoading] = useState(true);
    const [orderLoading, setOrderLoading] = useState(false);
    const [error, setError] = useState('');
    const [reviews, setReviews] = useState<any[]>([]);
    const [reviewLoading, setReviewLoading] = useState(false);
    const [newReview, setNewReview] = useState({ rating: 5, comment: '' });

    const fetchReviews = async () => {
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
            const res = await fetch(`${baseUrl}/reviews?reference_id=${id}&type=product`, {
                credentials: 'include'
            });
            const data = await res.json();
            if (data.success) setReviews(data.data);
        } catch (err) {
            console.error('Failed to load reviews');
        }
    };

    const handleOrder = async () => {
        if (!user) {
            router.push('/auth/login');
            return;
        }

        if (!product) return;

        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_URL;
            setOrderLoading(true);
            const res = await fetch(`${baseUrl}/orders`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    user_id: user.id,
                    product_id: product._id,
                    product_name: product.name,
                    artisan_name: product.artisan_name,
                    price: product.price,
                    quantity: 1,
                }),
            });
            const data = await res.json();
            if (data.success) {
                setOrdered(true);
            } else {
                alert(data.error || 'Order failed');
            }
        } catch (err) {
            alert('Connection error');
        } finally {
            setOrderLoading(false);
        }
    };

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
                    type: 'product',
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

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const baseUrl = process.env.NEXT_PUBLIC_API_URL;
                setLoading(true);
                const res = await fetch(`${baseUrl}/products/${id}`, {
                    credentials: 'include'
                });
                const data = await res.json();
                if (data.success) {
                    setProduct(data.data);
                } else {
                    setError('Product not found');
                }
            } catch (err) {
                setError('Failed to load product');
            } finally {
                setLoading(false);
            }
        };
        if (id) {
            fetchProduct();
            fetchReviews();
        }
    }, [id]);

    if (loading) return (
        <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 48, height: 48, borderRadius: '50%', border: '4px solid var(--bg)', borderTop: '4px solid var(--primary)', animation: 'spin 0.8s linear infinite' }} />
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );

    if (!product) return <div style={{ textAlign: 'center', padding: '5rem' }}>Product not found.</div>;

    const images = product.images?.length ? product.images : [`https://picsum.photos/seed/${id}/700/500`];

    return (
        <div style={{ background: 'var(--bg)', minHeight: '100vh' }}>
            {/* Breadcrumb */}
            <div style={{ background: 'white', borderBottom: '1px solid var(--border)', padding: '1rem 1.5rem' }}>
                <div className="container-custom" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    <Link href="/" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Home</Link>
                    <span>›</span>
                    <Link href="/bazaar" style={{ color: 'var(--primary)', textDecoration: 'none' }}>Bhil Bazaar</Link>
                    <span>›</span>
                    <span>{product.name}</span>
                </div>
            </div>

            <div className="container-custom" style={{ padding: '3rem 1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'start' }}>

                    {/* Image Gallery */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ borderRadius: '1.25rem', overflow: 'hidden', height: 400, background: '#e5e0d8' }}>
                            <img src={images[activeImg]} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                        </div>
                        {images.length > 1 && (
                            <div style={{ display: 'flex', gap: '0.75rem' }}>
                                {images.map((img, i) => (
                                    <button key={i} onClick={() => setActiveImg(i)} style={{ width: 72, height: 56, borderRadius: '0.5rem', overflow: 'hidden', border: i === activeImg ? '2px solid var(--primary)' : '2px solid transparent', cursor: 'pointer', padding: 0 }}>
                                        <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                        <div>
                            <p style={{ color: 'var(--accent)', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '0.4rem' }}>
                                {categoryLabel[product.category] ?? product.category}
                            </p>
                            <h1 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '2rem', color: 'var(--text-dark)', lineHeight: 1.2 }}>{product.name}</h1>
                        </div>

                        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                            {product.artisan_verified && <Badge variant="verified">Govt. Verified Artisan</Badge>}
                            {product.district && <Badge variant="district">{product.district}</Badge>}
                        </div>

                        <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '2.2rem', color: 'var(--primary)' }}>
                            ₹{product.price.toLocaleString('en-IN')}
                        </p>

                        {product.description && (
                            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '0.97rem', borderLeft: '3px solid var(--accent)', paddingLeft: '1rem' }}>
                                {(product as { description?: string }).description}
                            </p>
                        )}

                        {/* Artisan */}
                        <div style={{ background: 'white', borderRadius: '1rem', padding: '1.25rem', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <div style={{ width: 52, height: 52, borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--accent))', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.2rem', flexShrink: 0 }}>
                                {product.artisan_name[0]}
                            </div>
                            <div>
                                <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: 'var(--primary)' }}>{product.artisan_name}</p>
                                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Master Artisan · {product.district}</p>
                            </div>
                        </div>

                        {/* How it works */}
                        <div style={{ background: '#fef7f0', borderRadius: '1rem', padding: '1.25rem', border: '1px solid rgba(224,112,80,0.15)' }}>
                            <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: 'var(--accent)', marginBottom: '0.5rem' }}>📦 Click & Collect Model</p>
                            <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.6 }}>Place your order online. Collect it in-person from the artisan during your Vagad visit — or choose home delivery within 7–10 days.</p>
                        </div>

                        {/* CTA */}
                        {ordered ? (
                            <div style={{ background: '#dcfce7', border: '1px solid #4ade80', borderRadius: '1rem', padding: '1.25rem', textAlign: 'center' }}>
                                <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✅</div>
                                <p style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 700, color: '#15803d', fontSize: '1.1rem' }}>Order Placed!</p>
                                <p style={{ color: '#166534', fontSize: '0.9rem' }}>You&apos;ll receive artisan contact details on your email.</p>
                            </div>
                        ) : (
                            <button
                                className="btn-accent"
                                onClick={handleOrder}
                                disabled={orderLoading}
                                style={{ padding: '1rem 2rem', fontSize: '1.05rem', justifyContent: 'center', opacity: orderLoading ? 0.7 : 1 }}
                            >
                                {orderLoading ? 'Processing...' : '🛒 Click & Collect'}
                            </button>
                        )}

                        <button className="btn-outline" style={{ justifyContent: 'center' }}>💬 Message Artisan</button>
                    </div>
                </div>
            </div>
            
            {/* Reviews Section */}
            <div className="container-custom" style={{ padding: '4rem 1.5rem', borderTop: '1px solid var(--border)', marginTop: '4rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem' }}>
                    {/* Reviews List */}
                    <div>
                        <h2 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.8rem', color: 'var(--primary)', marginBottom: '2rem' }}>Artisan Product Reviews ({reviews.length})</h2>
                        {reviews.length === 0 ? (
                            <div style={{ background: 'white', borderRadius: '1rem', padding: '2rem', border: '1px solid var(--border)', color: 'var(--text-muted)', textAlign: 'center' }}>
                                No reviews yet for this masterpiece. Be the first to share your thoughts!
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
                            <h3 style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.4rem', color: 'var(--primary)', marginBottom: '0.5rem' }}>Review this Product</h3>
                            <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>How is the quality? Does it represent the tribal culture of Vagad?</p>
                            
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
                                    <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 700, color: 'var(--primary)', fontFamily: 'Outfit, sans-serif', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Your Thoughts</label>
                                    <textarea 
                                        required
                                        rows={4}
                                        value={newReview.comment}
                                        onChange={e => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                                        placeholder="What do you love about this craft?"
                                        style={{ width: '100%', padding: '0.75rem 1rem', border: '1px solid var(--border)', borderRadius: '1rem', fontSize: '0.95rem', fontFamily: 'Inter, sans-serif', outline: 'none', resize: 'none' }}
                                    />
                                </div>
                                <button type="submit" className="btn-primary" disabled={reviewLoading} style={{ justifyContent: 'center', padding: '0.85rem' }}>
                                    {reviewLoading ? 'Submitting...' : 'Submit Review'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <style>{`
        @media (max-width: 768px) {
          .product-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}
