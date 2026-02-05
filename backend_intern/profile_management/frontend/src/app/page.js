'use client';

import { useEffect } from 'react';

export default function Login() {

  console.log('Google Client ID:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

  useEffect(() => {
    /* global google */
    if (window.google) {
      google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
        callback: handleGoogleResponse
      });

      google.accounts.id.renderButton(
        document.getElementById('googleBtn'),
        { theme: 'outline', size: 'large' }
      );
    }
  }, []);

  const handleGoogleResponse = async (response) => {
    const idToken = response.credential;
    console.log('Google idToken:', idToken);

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      }
    );

    const data = await res.json();
    console.log('Backend response:', data);

    // Temporary (for testing)
    localStorage.setItem('jwt', data.token);
  };

  return (
    <div style={{ marginTop: '100px', textAlign: 'center' }}>
      <h1>Login</h1>

      {/* Google Button */}
      <div id="googleBtn"></div>

      {/* Google Script */}
      <script
        src="https://accounts.google.com/gsi/client"
        async
        defer
      ></script>
    </div>
  );
}
