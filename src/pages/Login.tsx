// src/pages/Login.tsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import './Login.css';

export function LoginPage()
{
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) =>
    {
        e.preventDefault();
        setError('');
        
        const success = await login(email, password);
        if (success)
        {
            navigate('/');
        }
        else
        {
            setError('Invalid email or password');
        }
    };

  return (
    <div className="auth-container">
    <div className="auth-box">
      <h2 className="auth-title">Sign in</h2>
      {error && (
        <div className="auth-error">
          {error}
        </div>
      )}
      <form className="auth-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="submit-button">
          Sign in
        </button>
      </form>
    </div>
  </div>
  );
}