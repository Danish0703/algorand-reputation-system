// src/components/Account.tsx
import React from 'react';

interface AccountProps {
  address: string | null;
}

const Account: React.FC<AccountProps> = ({ address }) => {
  if (!address) {
    return <p>No account connected.</p>;
  }

  return (
    <div className="account-info">
      <h3>Your Account</h3>
      <p>Address: {address.substring(0, 12)}...{address.slice(-8)}</p>
      {/* You might fetch and display balance here */}
    </div>
  );
};

export default Account;
