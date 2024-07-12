// import React, { useEffect, useState } from 'react';
// import './UserDetails.css';

// const UserDetails = () => {
//   const [user, setUser] = useState(null);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchUserDetails = async () => {
//       const token = localStorage.getItem('access_token');
//       if (!token) {
//         setError('User not logged in');
//         return;
//       }

//       try {
//         const response = await fetch('http://127.0.0.1:5555/logs/user', {
//           headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         const data = await response.json();

//         if (!response.ok) {
//           setError(data.msg || 'Failed to fetch user details');
//         } else {
//           setUser(data);
//         }
//       } catch (error) {
//         setError('An error occurred while fetching user details');
//       }
//     };

//     fetchUserDetails();
//   }, []);

//   if (error) {
//     return <div className="user-details-error">{error}</div>;
//   }

//   if (!user) {
//     return <div className="user-details-loading">Loading...</div>;
//   }

//   return (
//     <div className="user-details-container">
//       <h2>User Details</h2>
//       <p><strong>Username:</strong> {user.username}</p>
//       <p><strong>Email:</strong> {user.email}</p>
//       <p><strong>Profile:</strong> {user.profile}</p>
//       <p><strong>Created At:</strong> {new Date(user.created_at).toLocaleString()}</p>
//       <p><strong>Updated At:</strong> {new Date(user.updated_at).toLocaleString()}</p>
//     </div>
//   );
// };

// export default UserDetails;
