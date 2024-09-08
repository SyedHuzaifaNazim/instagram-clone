import React from 'react';
import Image from 'next/image';

const ProfilePage = () => {
  // Dummy data for profile
  const user = {
    username: 'johndoe',
    name: 'John Doe',
    bio: 'Traveler ✈️ | Photographer 📸 | Coffee Lover ☕️',
    profilePicture: '/profile-picture.jpg', // Add your profile picture
    followers: 1200,
    following: 300,
    posts: 45,
    postImages: [
      '/post1.jpg',
      '/post2.jpg',
      '/post3.jpg',
      '/post4.jpg',
      '/post5.jpg',
      '/post6.jpg',
      '/post7.jpg',
      '/post8.jpg',
      '/post9.jpg',
    ],
  };

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

// Inline CSS styles
const styles = {
  container: {
    width: '80%',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '20px',
  },
  profileImageWrapper: {
    borderRadius: '50%',
    overflow: 'hidden',
    marginRight: '20px',
  },
  profileImage: {
    borderRadius: '50%',
  },
  profileDetails: {
    flex: 1,
  },
  stats: {
    display: 'flex',
    gap: '20px',
    marginTop: '10px',
  },
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
    gap: '10px',
  },
  gridItem: {
    overflow: 'hidden',
  },
};

export default ProfilePage;
