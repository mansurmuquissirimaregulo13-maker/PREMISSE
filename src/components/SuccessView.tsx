import React, { useState } from 'react';
import { CheckCircle2, Building, ArrowRight, X } from 'lucide-react';

interface SuccessViewProps {
  balance: number;
  onWithdraw: () => void;
}

const SuccessView: React.FC<SuccessViewProps> = ({ balance, onWithdraw }) => {
  const [selectedBank, setSelectedBank] = useState<string | null>(null);
  const [accountName, setAccountName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [isWithdrawing, setIsWithdrawing] = useState(false);

  const handleWithdrawClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (accountName && accountNumber) {
      setIsWithdrawing(true);
      // Simulate API call for withdrawal
      setTimeout(() => {
        onWithdraw();
      }, 1500);
    }
  };

  return (
    <div className="card fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: '24px', padding: '40px 24px' }}>
      
      {!selectedBank ? (
        <>
          <CheckCircle2 size={64} color="#10b981" />
          
          <div>
            <h1 className="welcome-title" style={{ marginBottom: '8px' }}>Congratulations! 🎉</h1>
            <p className="welcome-subtitle" style={{ fontSize: '16px' }}>You have completed all tasks and unlocked your withdrawal.</p>
          </div>

          <div className="balance-card" style={{ width: '100%' }}>
            <div className="balance-label">AVAILABLE BALANCE</div>
            <div className="balance-amount" style={{ justifyContent: 'center' }}>
              <span className="balance-currency">R</span>
              {balance.toLocaleString('en-ZA')}
            </div>
          </div>

          <div style={{ width: '100%', marginTop: '8px' }}>
            <p className="task-subtitle" style={{ marginBottom: '16px' }}>Select your bank to receive your instant payment:</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {['Capitec', 'FNB', 'Standard Bank'].map((bank) => (
                <button 
                  key={bank}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '16px',
                    borderRadius: '12px',
                    border: '1px solid var(--border-color)',
                    backgroundColor: 'var(--card-bg)',
                    fontSize: '16px',
                    fontWeight: '600',
                    color: 'var(--text-main)',
                    cursor: 'pointer',
                    transition: 'border-color 0.2s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.borderColor = 'var(--primary)'}
                  onMouseOut={(e) => e.currentTarget.style.borderColor = 'var(--border-color)'}
                  onClick={() => setSelectedBank(bank)}
                >
                  <Building size={20} color="var(--primary)" />
                  {bank}
                </button>
              ))}
            </div>
          </div>
        </>
      ) : (
        <form onSubmit={handleWithdrawClick} style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800' }}>Withdraw to {selectedBank}</h2>
            <button 
              type="button" 
              onClick={() => setSelectedBank(null)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '4px' }}
            >
              <X size={24} color="var(--text-muted)" />
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', textAlign: 'left' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="accountName" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>
                Account Holder Name
              </label>
              <input 
                id="accountName"
                type="text" 
                required
                value={accountName}
                onChange={(e) => setAccountName(e.target.value)}
                style={{ 
                  padding: '12px 16px', 
                  borderRadius: '8px', 
                  border: '1px solid var(--border-color)',
                  fontSize: '16px'
                }} 
                placeholder="John Doe"
              />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label htmlFor="accountNumber" style={{ fontSize: '14px', fontWeight: '600', color: 'var(--text-main)' }}>
                Account Number
              </label>
              <input 
                id="accountNumber"
                type="text" 
                required
                value={accountNumber}
                onChange={(e) => setAccountNumber(e.target.value)}
                style={{ 
                  padding: '12px 16px', 
                  borderRadius: '8px', 
                  border: '1px solid var(--border-color)',
                  fontSize: '16px'
                }} 
                placeholder="123456789"
              />
            </div>
          </div>

          <button 
            type="submit" 
            className="btn-primary" 
            disabled={isWithdrawing || !accountName || !accountNumber}
            style={{ marginTop: '8px' }}
          >
            {isWithdrawing ? 'Processing...' : 'Withdraw Balance'} <ArrowRight size={20} />
          </button>
        </form>
      )}

    </div>
  );
};

export default SuccessView;
