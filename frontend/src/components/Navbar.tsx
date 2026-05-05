'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/destinations', label: 'Destinations' },
    { href: '/bazaar', label: 'Bhil Bazaar' },
    { href: '/stays', label: 'Vagad Stays' },
    { href: '/planner', label: 'AI Planner' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();
    const { user, logout } = useAuth();

    return (
        <nav style={{
            position: 'sticky', top: 0, zIndex: 50,
            background: 'rgba(26,58,46,0.97)',
            backdropFilter: 'blur(12px)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}>
            <div className="container-custom" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem 1.5rem' }}>
                {/* Logo */}
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: '50%',
                        background: 'linear-gradient(135deg, #e07050, #c05a3a)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: '1.1rem', fontWeight: 800, color: 'white', fontFamily: 'Outfit, sans-serif',
                    }}>V</div>
                    <span style={{ fontFamily: 'Outfit, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: 'white', letterSpacing: '-0.02em' }}>
                        Visit<span style={{ color: '#e07050' }}>Vagad</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div style={{ display: 'flex', gap: '0.25rem', alignItems: 'center' }} className="desktop-nav">
                    {navLinks.map(link => (
                        <Link key={link.href} href={link.href} style={{
                            padding: '0.5rem 1rem',
                            borderRadius: '999px',
                            color: pathname === link.href ? '#e07050' : 'rgba(255,255,255,0.85)',
                            fontFamily: 'Inter, sans-serif',
                            fontWeight: 500,
                            fontSize: '0.9rem',
                            textDecoration: 'none',
                            background: pathname === link.href ? 'rgba(224,112,80,0.12)' : 'transparent',
                            transition: 'all 0.2s',
                        }}>
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Auth Buttons / User Profile */}
                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
                    {user ? (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                            <Link href="/profile" style={{ 
                                color: 'white', 
                                fontSize: '0.9rem', 
                                fontFamily: 'Inter, sans-serif',
                                textDecoration: 'none',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}>
                                👤 <span style={{ fontWeight: 600, color: '#e07050' }}>{user.name.split(' ')[0]}</span>
                            </Link>
                            <button onClick={logout} style={{
                                background: 'transparent', border: '1px solid rgba(255,255,255,0.3)', color: 'white',
                                padding: '0.4rem 1rem', borderRadius: '999px', cursor: 'pointer',
                                fontSize: '0.85rem', fontWeight: 600, fontFamily: 'Outfit, sans-serif'
                            }}>
                                Logout
                            </button>
                        </div>
                    ) : (
                        <>
                            <Link href="/auth/login" style={{
                                color: 'rgba(255,255,255,0.85)', fontFamily: 'Inter, sans-serif',
                                fontWeight: 500, fontSize: '0.9rem', textDecoration: 'none',
                                padding: '0.5rem 1rem',
                            }}>
                                Login
                            </Link>
                            <Link href="/auth/signup" style={{
                                background: '#e07050', color: 'white',
                                padding: '0.5rem 1.25rem', borderRadius: '999px',
                                fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.9rem',
                                textDecoration: 'none', transition: 'background 0.2s',
                            }}>
                                Sign Up
                            </Link>
                        </>
                    )}

                    {/* Mobile hamburger */}
                    <button
                        onClick={() => setOpen(!open)}
                        style={{ display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: '0.25rem' }}
                        className="hamburger"
                        aria-label="Toggle menu"
                    >
                        <div style={{ width: 22, height: 2, background: 'white', marginBottom: 5, transition: 'all 0.3s', transform: open ? 'rotate(45deg) translate(5px,5px)' : 'none' }} />
                        <div style={{ width: 22, height: 2, background: 'white', marginBottom: 5, opacity: open ? 0 : 1 }} />
                        <div style={{ width: 22, height: 2, background: 'white', transform: open ? 'rotate(-45deg) translate(5px,-5px)' : 'none', transition: 'all 0.3s' }} />
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {open && (
                <div style={{
                    background: '#122a20', padding: '1rem 1.5rem 1.5rem',
                    display: 'flex', flexDirection: 'column', gap: '0.5rem',
                }}>
                    {navLinks.map(link => (
                        <Link key={link.href} href={link.href} onClick={() => setOpen(false)} style={{
                            color: pathname === link.href ? '#e07050' : 'white',
                            fontFamily: 'Inter, sans-serif', fontWeight: 500,
                            textDecoration: 'none', padding: '0.6rem 0',
                            borderBottom: '1px solid rgba(255,255,255,0.06)',
                        }}>
                            {link.label}
                        </Link>
                    ))}
                    <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.75rem' }}>
                        {user ? (
                             <button onClick={logout} style={{ flex: 1, textAlign: 'center', background: '#e07050', color: 'white', padding: '0.6rem', borderRadius: '999px', border: 'none', cursor: 'pointer', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}>Logout</button>
                        ) : (
                            <>
                                <Link href="/auth/login" onClick={() => setOpen(false)} style={{ flex: 1, textAlign: 'center', border: '1px solid rgba(255,255,255,0.3)', color: 'white', padding: '0.6rem', borderRadius: '999px', textDecoration: 'none', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}>Login</Link>
                                <Link href="/auth/signup" onClick={() => setOpen(false)} style={{ flex: 1, textAlign: 'center', background: '#e07050', color: 'white', padding: '0.6rem', borderRadius: '999px', textDecoration: 'none', fontFamily: 'Outfit, sans-serif', fontWeight: 600, fontSize: '0.9rem' }}>Sign Up</Link>
                            </>
                        )}
                    </div>
                </div>
            )}

            <style>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .hamburger { display: flex !important; flex-direction: column; }
        }
      `}</style>
        </nav>
    );
}
