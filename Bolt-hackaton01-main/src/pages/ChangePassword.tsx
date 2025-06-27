import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const ChangePassword: React.FC = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (newPassword !== confirmPassword) {
      return setError(t('Passwords do not match'));
    }

    try {
      const response = await fetch('http://localhost:5000/change-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: user?.email,
          newPassword,
        }),
      });

      if (response.ok) {
        setSuccess(t('Password updated successfully'));
        setTimeout(() => navigate('/app/settings'), 1500);
      } else {
        const data = await response.json();
        setError(data.message || t('Failed to change password'));
      }
    } catch (err) {
      setError(t('Something went wrong'));
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white dark:bg-slate-800 p-6 rounded-xl shadow mt-10">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">{t('Change Password')}</h1>
      {error && <p className="text-red-500 mb-3">{error}</p>}
      {success && <p className="text-green-600 mb-3">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-white">{t('New Password')}</label>
          <input
            type="password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1 dark:text-white">{t('Confirm New Password')}</label>
          <input
            type="password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg dark:bg-slate-700 dark:text-white"
          />
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600"
        >
          {t('Save')}
        </button>
      </form>
    </div>
  );
};

export default ChangePassword;
