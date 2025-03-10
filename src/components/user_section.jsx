import { useContext, useEffect, useState } from 'react';
import { NearContext } from '@/wallets/near';
import styles from '../styles/user_section.module.css';

function UserSection() {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [nearBalance, setNearBalance] = useState('0');
  const [shitBalance, setShitBalance] = useState('0');
  const [isLoading, setIsLoading] = useState(false);

  const fetchBalances = async () => {
    if (!signedAccountId || !wallet) return;
    setIsLoading(true);
    try {
      const balances = await wallet.viewMethod({
        contractId: 'rugfactory.testnet',
        method: 'user_get_balance',
        args: { account_id: signedAccountId }
      });
      setNearBalance(balances[0]);
      setShitBalance(balances[1]);
    } catch (error) {
      console.error('Error fetching balances:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDepositNear = async () => {
    if (!signedAccountId || !wallet) return;
    try {
      await wallet.callMethod({
        contractId: 'rugfactory.testnet',
        method: 'user_deposit_near',
        args: {},
        deposit: '1000000000000000000000000' // 1 NEAR
      });
    } catch (error) {
      console.error('Error depositing NEAR:', error);
    }
  };

  const handleDepositShit = async () => {
    if (!signedAccountId || !wallet) return;
    try {
      await wallet.callMethod({
        contractId: 'shit-237.factory.v10.meme-cooking.testnet',
        method: 'ft_transfer_call',
        args: {
          receiver_id: 'rugfactory.testnet',
          amount: '1000000000000000000000000', // 1 SHIT
          msg: ''
        },
        deposit: '1' // Required for ft_transfer_call
      });
    } catch (error) {
      console.error('Error depositing SHIT:', error);
    }
  };

  useEffect(() => {
    fetchBalances();
  }, [signedAccountId, wallet, fetchBalances]);

  if (!signedAccountId) return null;

  return (
    <section className={styles.userSectionContainer}>
      <div className={styles.content}>
        <h2 className={styles.title}>Your Account</h2>
        <div className={styles.accountInfo}>
          <p className={styles.accountId}>{signedAccountId}</p>
          <div className={styles.balances}>
            <div className={styles.balance}>
              <span>NEAR Balance:</span>
              <span>{nearBalance} Ⓝ</span>
            </div>
            <div className={styles.balance}>
              <span>SHIT Balance:</span>
              <span>{shitBalance} 💩</span>
            </div>
          </div>
          <div className={styles.actions}>
            <button
              onClick={fetchBalances}
              className={styles.updateButton}
              disabled={isLoading}
            >
              {isLoading ? 'Updating...' : 'Update Balance'}
            </button>
            <button
              onClick={handleDepositNear}
              className={styles.depositButton}
            >
              Deposit NEAR
            </button>
            <button
              onClick={handleDepositShit}
              className={styles.depositButton}
            >
              Deposit SHIT
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserSection;