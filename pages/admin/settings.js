import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { Alert } from 'react-bootstrap';

const Settings = () => {
  return (
    <AdminLayout>
      <h2 className="mb-4">Settings</h2>
      <Alert variant="info">
        Settings page is under development.
      </Alert>
    </AdminLayout>
  );
};

export default Settings;
