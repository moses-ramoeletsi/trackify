import React, { useState } from 'react';
import { User, Lock, AlertTriangle, Eye, EyeOff } from 'lucide-react';

const UserProfile = ({ user, onUpdateProfile, onDeleteAccount, onCancel }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [isChangingPassword, setIsChangingPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: user.name || '',
        email: user.email,
        phone: user.phone || ''
    });
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handlePasswordChange = (e) => {
        const { name, value } = e.target;
        setPasswordData({
            ...passwordData,
            [name]: value
        });
    };

    const handleProfileUpdate = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            setError('Please enter a valid email address');
            return;
        }

        // Check if email is already in use (if changed)
        if (formData.email !== user.email) {
            const allUsers = JSON.parse(localStorage.getItem('users') || '[]');
            const emailExists = allUsers.some(u => u.email === formData.email && u.email !== user.email);
            if (emailExists) {
                setError('This email is already in use');
                return;
            }
        }

        // Update the user profile
        const updatedUser = {
            ...user,
            name: formData.name,
            email: formData.email,
            phone: formData.phone
        };

        onUpdateProfile(updatedUser);
        setSuccess('Profile updated successfully');
        setIsEditing(false);
    };

    const handlePasswordUpdate = (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');

        // Validate current password
        if (passwordData.currentPassword !== user.password) {
            setError('Current password is incorrect');
            return;
        }

        // Validate new password
        if (passwordData.newPassword.length < 6) {
            setError('New password must be at least 6 characters long');
            return;
        }

        // Validate password confirmation
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('New passwords do not match');
            return;
        }

        // Update the user's password
        const updatedUser = {
            ...user,
            password: passwordData.newPassword
        };

        onUpdateProfile(updatedUser);
        setSuccess('Password updated successfully');
        setIsChangingPassword(false);
        
        // Reset password fields
        setPasswordData({
            currentPassword: '',
            newPassword: '',
            confirmPassword: ''
        });
    };

    // When opening the change password form, prefill with current password
    const startChangingPassword = () => {
        setPasswordData({
            ...passwordData,
            currentPassword: user.password
        });
        setIsChangingPassword(true);
    };

    return (
        <div>
            <h2 className="text-xl font-semibold mb-4 sm:mb-6 flex items-center">
                <User className="mr-2 flex-shrink-0" size={20} />
                <span className="truncate">User Profile</span>
            </h2>

            {error && (
                <div className="mb-4 p-2 sm:p-3 bg-red-50 border border-red-200 rounded-md flex items-start">
                    <AlertTriangle className="text-red-500 mr-2 mt-0.5 flex-shrink-0" size={18} />
                    <span className="text-red-700 text-sm sm:text-base">{error}</span>
                </div>
            )}

            {success && (
                <div className="mb-4 p-2 sm:p-3 bg-green-50 border border-green-200 rounded-md">
                    <span className="text-green-700 text-sm sm:text-base">{success}</span>
                </div>
            )}

            <div className="mb-6 sm:mb-8">
                {!isEditing ? (
                    <div className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <p className="text-xs sm:text-sm text-gray-500">Name</p>
                                <p className="font-medium text-sm sm:text-base truncate">{user.name || 'Not provided'}</p>
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm text-gray-500">Email</p>
                                <p className="font-medium text-sm sm:text-base truncate">{user.email}</p>
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm text-gray-500">Phone</p>
                                <p className="font-medium text-sm sm:text-base truncate">{user.phone || 'Not provided'}</p>
                            </div>
                            <div>
                                <p className="text-xs sm:text-sm text-gray-500">Account Expires</p>
                                <p className="font-medium text-sm sm:text-base truncate">
                                    {new Date(user.expirationTime).toLocaleDateString()}
                                </p>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-wrap gap-2">
                            <button
                                onClick={() => setIsEditing(true)}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-cyan-500 text-white rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                            >
                                Edit Profile
                            </button>
                            <button
                                onClick={startChangingPassword}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-gray-500 text-white rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Change Password
                            </button>
                            <button
                                onClick={onCancel}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Return to Dashboard
                            </button>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                />
                            </div>
                            <div className="sm:col-span-1">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                    required
                                />
                            </div>
                            <div className="sm:col-span-1">
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    Phone
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500"
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            <button
                                type="submit"
                                className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-cyan-500 text-white rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                            >
                                Save Changes
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsEditing(false);
                                    setError('');
                                    // Reset form data to original values
                                    setFormData({
                                        name: user.name || '',
                                        email: user.email,
                                        phone: user.phone || ''
                                    });
                                }}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {isChangingPassword && (
                <div className="border-t pt-4 sm:pt-6">
                    <h3 className="text-base sm:text-lg font-medium mb-4 flex items-center">
                        <Lock className="mr-2 flex-shrink-0" size={18} />
                        <span className="truncate">Change Password</span>
                    </h3>
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                        <div className="grid grid-cols-1 gap-4">
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    Current Password
                                </label>
                                <div className="relative">
                                    {/* Option 1: Show actual password (pre-filled) */}
                                    <div className="flex items-center w-full px-3 py-2 text-sm border border-gray-300 rounded-md">
                                        <span className="flex-grow truncate">
                                            {showCurrentPassword ? passwordData.currentPassword : '••••••'}
                                        </span>
                                        <button
                                            type="button"
                                            className="text-gray-500 hover:text-cyan-500 focus:outline-none flex-shrink-0 ml-1"
                                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                            tabIndex="-1"
                                        >
                                            {showCurrentPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                    </div>
                                    
                                    {/* Hidden input to store the actual value */}
                                    <input 
                                        type="hidden"
                                        name="currentPassword"
                                        value={passwordData.currentPassword}
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showNewPassword ? "text" : "password"}    
                                        name="newPassword"
                                        value={passwordData.newPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500 pr-10"
                                        required
                                        minLength={6}
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-cyan-500 focus:outline-none"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        tabIndex="-1"
                                    >
                                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                            </div>
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1">
                                    Confirm New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={passwordData.confirmPassword}
                                        onChange={handlePasswordChange}
                                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-cyan-500 pr-10"
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-cyan-500 focus:outline-none"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        tabIndex="-1"
                                    >
                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-4">
                            <button
                                type="submit"
                                className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-cyan-500 text-white rounded-md hover:bg-cyan-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2"
                            >
                                Update Password
                            </button>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsChangingPassword(false);
                                    setError('');
                                    // Reset password data
                                    setPasswordData({
                                        currentPassword: '',
                                        newPassword: '',
                                        confirmPassword: ''
                                    });
                                }}
                                className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="border-t pt-4 sm:pt-6 mt-6 sm:mt-8">
                <h3 className="text-base sm:text-lg font-medium mb-2 sm:mb-4 text-red-600">Danger Zone</h3>
                <p className="text-xs sm:text-sm text-gray-600 mb-4">
                    Once you delete your account, there is no going back. This action cannot be undone.
                </p>
                <button
                    onClick={onDeleteAccount}
                    className="px-3 py-1.5 sm:px-4 sm:py-2 text-sm bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                >
                    Delete Account
                </button>
            </div>
        </div>
    );
};

export default UserProfile;