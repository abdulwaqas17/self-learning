// 'use client';

// import { useEffect } from 'react';

// export default function Login() {

//   console.log('Google Client ID:', process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);

//   useEffect(() => {
//     /* global google */
//     if (window.google) {
//       google.accounts.id.initialize({
//         client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
//         callback: handleGoogleResponse
//       });

//       google.accounts.id.renderButton(
//         document.getElementById('googleBtn'),
//         { theme: 'outline', size: 'large' }
//       );
//     }
//   }, []);

//   const handleGoogleResponse = async (response) => {
//     const idToken = response.credential;
//     console.log('Google idToken:', idToken);

//     const res = await fetch(
//       `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`,
//       {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ idToken })
//       }
//     );

//     const data = await res.json();
//     console.log('Backend response:', data);

//     // Temporary (for testing)
//     localStorage.setItem('jwt', data.token);
//   };

//   return (
//     <div style={{ marginTop: '100px', textAlign: 'center' }}>
//       <h1>Login</h1>

//       {/* Google Button */}
//       <div id="googleBtn"></div>

//       {/* Google Script */}
//       <script
//         src="https://accounts.google.com/gsi/client"
//         async
//         defer
//       ></script>
//     </div>
//   );
// }





'use client';

import { useEffect } from 'react';

export default function Login() {

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

  // 🔹 GOOGLE LOGIN
  const handleGoogleResponse = async (response) => {
    const idToken = response.credential;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/google`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idToken })
      }
    );

    const data = await res.json();
    localStorage.setItem('jwt', data.token);

    console.log('✅ Logged in');
  };

  // 🔹 IMAGE SELECT → PRESIGNED URL → PUT TO S3
  const handleImageSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      // 1️⃣ Presigned URL backend se lo
      const presignRes = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload/presigned-url`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            fileName: file.name,
            fileType: file.type,
            uploadFor: "profile_pic"
          })
        }
      );

      const data = await presignRes.json();

      console.log('=============upload url==============');
      console.log(data);
      console.log(data.data);
      console.log(file);
      
      console.log('=============upload url==============');

      // 2️⃣ PUT request → DIRECT S3
      await fetch(data.data.uploadUrl, {
        method: "PUT",
        headers: {
          "Content-Type": file.type
        },
        body: file
      });

      console.log("✅ Image uploaded to S3");


      // (STEP-3 baad mein: backend ko key/url save karwao)

    } catch (err) {
      console.error("❌ Upload failed", err);
    }
  };

  return (
    <div style={{ marginTop: '100px', textAlign: 'center' }}>
      <h1>Login</h1>

      {/* Google Button */}
      <div id="googleBtn"></div>

      <br /><br />

      {/* Image Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleImageSelect}
      />

      {/* Google Script */}
      <script
        src="https://accounts.google.com/gsi/client"
        async
        defer
      ></script>
    </div>
  );
}
