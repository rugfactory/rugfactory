import { useContext, useEffect, useState, useCallback } from 'react';
import { NearContext } from '@/wallets/near';
import { RugFactoryContract, ShitTokenContract } from '@/config';
import { utils } from 'near-api-js';
import styles from '../styles/user_section.module.css';

function UserSection() {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [nearBalance, setNearBalance] = useState('0');
  const [shitBalance, setShitBalance] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');

  const fetchBalances = useCallback(async () => {
    if (!signedAccountId || !wallet) return;
    setIsLoading(true);
    try {
      const balances = await wallet.viewMethod({
        contractId: RugFactoryContract,
        method: 'user_get_balance',
        args: { account_id: signedAccountId }
      });
      setNearBalance(utils.format.formatNearAmount(balances[0]));
      setShitBalance(utils.format.formatNearAmount(balances[1]));
    } catch (error) {
      console.error('Error fetching balances:', error);
    } finally {
      setIsLoading(false);
    }
  }, [signedAccountId, wallet]);

  const handleDepositNear = async () => {
    if (!signedAccountId || !wallet || !depositAmount) return;
    try {
      const yoctoAmount = utils.format.parseNearAmount(depositAmount);
      await wallet.callMethod({
        contractId: RugFactoryContract,
        method: 'user_deposit_near',
        args: {},
        deposit: yoctoAmount
      });
      setDepositAmount('');
      await fetchBalances();
    } catch (error) {
      console.error('Error depositing NEAR:', error);
    }
  };

  const handleWithdrawNear = async () => {
    if (!signedAccountId || !wallet || !depositAmount) return;
    try {
      const yoctoAmount = utils.format.parseNearAmount(depositAmount);
      await wallet.callMethod({
        contractId: RugFactoryContract,
        method: 'user_withdraw_near',
        args: {
          amount: yoctoAmount
        }
      });
      setDepositAmount('');
      await fetchBalances();
    } catch (error) {
      console.error('Error withdrawing NEAR:', error);
    }
  };

  const handleDepositShit = async () => {
    if (!signedAccountId || !wallet) return;
    try {
      await wallet.callMethod({
        contractId: ShitTokenContract,
        method: 'ft_transfer_call',
        args: {
          receiver_id: RugFactoryContract,
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
  }, [fetchBalances]);

  if (!signedAccountId) {
    return (
      <section className={styles.userSectionContainer}>
        <div className={styles.content}>
          <h2 className={styles.title}>Your Account</h2>
          <div className={styles.accountInfo}>
            <p className={styles.message}>Please log in to view your account details</p>
            <button
              onClick={() => wallet?.signIn()}
              className={styles.loginButton}
            >
              Login with NEAR
            </button>
          </div>
        </div>
      </section>
    );
  }

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
            <div className={styles.depositGroup}>
              <input
                type="number"
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                placeholder="Amount in NEAR"
                className={styles.amountInput}
                min="0"
                step="0.1"
              />
              <button
                onClick={handleDepositNear}
                className={styles.depositButton}
                disabled={!depositAmount}
              >
                Deposit NEAR
              </button>
              <button
                onClick={handleWithdrawNear}
                className={styles.withdrawButton}
                disabled={!depositAmount}
              >
                Withdraw NEAR
              </button>
            </div>
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