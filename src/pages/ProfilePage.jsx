import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { updateProfile, changePassword } from '../services/authService';
import { FaUser, FaEnvelope, FaLock, FaGoogle, FaCalendar, FaSave } from 'react-icons/fa';
import { format } from 'date-fns';

function ProfilePage() {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  // Profile form state
  const [profileData, setProfileData] = useState({
    fullName: user?.fullName || '',
  });

  // Password form state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    const token = localStorage.getItem('skynav_token');
    const result = await updateProfile(profileData, token);

    if (result.success) {
      // Update local user data
      updateUser(result.user);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } else {
      setMessage({ type: 'error', text: result.message || 'Failed to update profile' });
    }

    setLoading(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage({ type: '', text: '' });

    // Validate passwords match
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'Passwords do not match' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    setLoading(true);

    const token = localStorage.getItem('skynav_token');
    const result = await changePassword(
      passwordData.currentPassword,
      passwordData.newPassword,
      token
    );

    if (result.success) {
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      setMessage({ type: 'error', text: result.message || 'Failed to change password' });
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-50 via-primary-50 to-sky-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary-900 mb-2">My Profile</h1>
          <p className="text-primary-700">Manage your account settings and preferences</p>
        </div>

        {/* Message Alert */}
        {message.text && (
          <div
            className={`mb-6 p-4 rounded-xl ${message.type === 'success'
              ? 'bg-green-50 text-green-700 border border-green-200'
              : 'bg-red-50 text-red-700 border border-red-200'
              }`}
          >
            {message.text}
          </div>
        )}

        <div className="space-y-6">
          {/* Profile Information Card */}
          <div className="bg-white rounded-2xl p-6 border border-primary-100 shadow-lg">
            <h2 className="text-xl font-semibold text-primary-900 mb-6 flex items-center gap-2">
              <FaUser className="text-primary-600" />
              Personal Information
            </h2>

            <div className="space-y-4 mb-6">
              {/* Profile Picture */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-full bg-primary-100 flex items-center justify-center">
                  {user?.profilePicture ? (
                    <img
                      src={user.profilePicture}
                      alt={user.fullName}
                      className="w-20 h-20 rounded-full object-cover"
                    />
                  ) : (
                    <FaUser className="text-3xl text-primary-600" />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-primary-900">{user?.fullName}</p>
                  <p className="text-sm text-primary-600">{user?.email}</p>
                </div>
              </div>

              {/* Account Details */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 bg-primary-50 rounded-xl">
                <div className="flex items-center gap-2 text-sm">
                  <FaEnvelope className="text-primary-600" />
                  <div>
                    <p className="text-xs text-primary-600">Email</p>
                    <p className="font-medium text-primary-900">{user?.email}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <FaGoogle className="text-primary-600" />
                  <div>
                    <p className="text-xs text-primary-600">Auth Provider</p>
                    <p className="font-medium text-primary-900 capitalize">
                      {user?.authProvider}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <FaCalendar className="text-primary-600" />
                  <div>
                    <p className="text-xs text-primary-600">Member Since</p>
                    <p className="font-medium text-primary-900">
                      {user?.createdAt && format(new Date(user.createdAt), 'MMM dd, yyyy')}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Edit Profile Form */}
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-primary-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={profileData.fullName}
                  onChange={(e) =>
                    setProfileData({ ...profileData, fullName: e.target.value })
                  }
                  className="input"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="button-primary flex items-center gap-2 justify-center"
              >
                <FaSave />
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>

          {/* Change Password Card (only for local users) */}
          {user?.authProvider === 'local' && (
            <div className="bg-white rounded-2xl p-6 border border-primary-100 shadow-lg">
              <h2 className="text-xl font-semibold text-primary-900 mb-6 flex items-center gap-2">
                <FaLock className="text-primary-600" />
                Change Password
              </h2>

              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-1">
                    Current Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.currentPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, currentPassword: e.target.value })
                    }
                    className="input"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.newPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, newPassword: e.target.value })
                    }
                    className="input"
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-primary-600 mt-1">
                    Must be at least 6 characters
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-primary-700 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) =>
                      setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                    }
                    className="input"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="button-primary flex items-center gap-2 justify-center"
                >
                  <FaLock />
                  {loading ? 'Changing...' : 'Change Password'}
                </button>
              </form>
            </div>
          )}

          {/* Google Account Notice */}
          {user?.authProvider === 'google' && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <FaGoogle className="text-2xl text-blue-600 mt-1" />
                <div>
                  <h3 className="font-semibold text-blue-900 mb-1">
                    Google Account
                  </h3>
                  <p className="text-sm text-blue-700">
                    You signed up using Google. Password management is handled through your
                    Google account for enhanced security.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
