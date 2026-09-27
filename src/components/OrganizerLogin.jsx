import { useState } from 'react';
import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export default function OrganizerLogin({ onLoginSuccess }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      if (email === 'organizer@demo.com' && password === 'admin123') {
        const docRef = doc(db, 'organizers', 'demo_organizer_01');
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          onLoginSuccess(docSnap.data());
        } else {
          onLoginSuccess({ organizerId: 'demo_organizer_01', fullName: 'Demo Organizer' });
        }
      } else {
        setError('Invalid credentials. Use organizer@demo.com / admin123');
      }
    } catch (err) {
      setError(`Login error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="login-card" aria-labelledby="organizer-login-heading">
      <p className="eyebrow">Restricted access</p>
      <h2 id="organizer-login-heading" className="login-heading">Organizer authorization</h2>
      <p className="login-copy">
        Sign in to register athletes, review credentials, and issue secure verification records.
      </p>

      {error && <div className="error-banner" role="alert">{error}</div>}

      <form onSubmit={handleLogin} className="form-stack login-form">
        <label className="field-group">
          <span className="field-label">Official email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="organizer@demo.com"
            className="field-input"
            autoComplete="email"
            required
          />
        </label>

        <label className="field-group">
          <span className="field-label">Security password</span>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="admin123"
            className="field-input"
            autoComplete="current-password"
            required
          />
        </label>

        <button type="submit" disabled={loading} className="primary-button full-width">
          {loading ? 'AUTHENTICATING...' : 'UNLOCK ORGANIZER PORTAL'}
        </button>
      </form>

      <div className="status-line">
        <span className="status-dot" aria-hidden="true" />
        End-to-end credential ledger online
      </div>
    </section>
  );
}
