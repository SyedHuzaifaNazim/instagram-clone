// import React from 'react';
// import Image from 'next/image';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../lib/firebase'; // Import the Firebase Firestore instance

// const ProfilePage = ({ userData }) => {
//   const user = JSON.parse(userData);

//   return (
//     <div style={styles.container}>
//       {/* Profile Header */}
//       <div style={styles.header}>
//         <div style={styles.profileImageWrapper}>
//           <Image
//             src={user.profilePicture}
//             alt="Profile Picture"
//             width={150}
//             height={150}
//             style={styles.profileImage}
//           />
//         </div>
//         <div style={styles.profileDetails}>
//           <h2>{user.username}</h2>
//           <p>{user.name}</p>
//           <p>{user.bio}</p>
//           <div style={styles.stats}>
//             <div><strong>{user.posts}</strong> posts</div>
//             <div><strong>{user.followers}</strong> followers</div>
//             <div><strong>{user.following}</strong> following</div>
//           </div>
//         </div>
//       </div>

//       {/* Posts Grid */}
//       <div style={styles.grid}>
//         {user.postImages.map((image, index) => (
//           <div key={index} style={styles.gridItem}>
//             <Image src={image} alt={`Post ${index + 1}`} width={300} height={300} />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export async function getServerSideProps() {
//   const querySnapshot = await getDocs(collection(db, "users"));
//   let userData = {};

//   querySnapshot.forEach((doc) => {
//     // Assuming you're fetching data for one specific user
//     if (doc.id === "profileUserId") {
//       userData = doc.data();
//     }
//   });

//   return {
//     props: {
//       userData: JSON.stringify(userData),
//     },
//   };
// }

// const styles = {
//   container: { width: '80%', margin: '0 auto', fontFamily: 'Arial, sans-serif' },
//   header: { display: 'flex', alignItems: 'center', marginBottom: '20px' },
//   profileImageWrapper: { borderRadius: '50%', overflow: 'hidden', marginRight: '20px' },
//   profileImage: { borderRadius: '50%' },
//   profileDetails: { flex: 1 },
//   stats: { display: 'flex', gap: '20px', marginTop: '10px' },
//   grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' },
//   gridItem: { overflow: 'hidden' },
// };

// export default ProfilePage;





import React from 'react';
import Image from 'next/image';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { getAuth } from 'firebase/auth'; // Import the Firebase Firestore instance

const auth = getAuth();
const user = auth.currentUser;

if (user !== null) {
  user.providerData.forEach((profile) => {
    console.log("Sign-in provider: " + profile.providerId);
    console.log("  Provider-specific UID: " + profile.uid);
    console.log("  Name: " + profile.displayName);
    console.log("  Email: " + profile.email);
    console.log("  Photo URL: " + profile.photoURL);
  });
}

const ProfilePage = ({ userData }) => {
  const user = JSON.parse(userData);

  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div style={styles.container}>
      {/* Profile Header */}
      <div style={styles.header}>
        <div style={styles.profileImageWrapper}>
          <Image
            src={user.profilePicture}
            alt="Profile Picture"
            width={150}
            height={150}
            style={styles.profileImage}
          />
        </div>
        <div style={styles.profileDetails}>
          <h2>{user.username}</h2>
          <p>{user.name}</p>
          <p>{user.bio}</p>
          <div style={styles.stats}>
            <div><strong>{user.posts}</strong> posts</div>
            <div><strong>{user.followers}</strong> followers</div>
            <div><strong>{user.following}</strong> following</div>
          </div>
        </div>
      </div>

      {/* Posts Grid */}
      <div style={styles.grid}>
        {user.postImages.map((image, index) => (
          <div key={index} style={styles.gridItem}>
            <Image src={image} alt={`Post ${index + 1}`} width={300} height={300} />
          </div>
        ))}
      </div>
    </div>
  );
};

export async function getServerSideProps(context) {
  const userId = context.query.userId;

  if (!userId) {
    return {
      notFound: true,
    };
  }

  try {
    const q = query(collection(db, "users"), where("id", "==", userId));
    const querySnapshot = await getDocs(q);
    let userData = {};

    querySnapshot.forEach((doc) => {
      userData = doc.data();
    });

    if (!userData) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        userData: JSON.stringify(userData),
      },
    };
  } catch (error) {
    console.error(error);
    return {
      notFound: true,
    };
  }
}

const styles = {
  container: { width: '80%', margin: '0 auto', fontFamily: 'Arial, sans-serif' },
  header: { display: 'flex', alignItems: 'center', marginBottom: '20px' },
  profileImageWrapper: { borderRadius: '50%', overflow: 'hidden', marginRight: '20px' },
  profileImage: { borderRadius: '50%' },
  profileDetails: { flex: 1 },
  stats: { display: 'flex', gap: '20px', marginTop: '10px' },
  grid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '10px' },
  gridItem: { overflow: 'hidden' },
};

export default ProfilePage;