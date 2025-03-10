import { useContext, useEffect, useState, useCallback } from 'react';
import { NearContext } from '@/wallets/near';
import { RugFactoryContract, ShitTokenContract } from '@/config';
import { utils } from 'near-api-js';
import styles from '../styles/user_section.module.css';

function UserSection() {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [nearBalance, setNearBalance] = useState('0');
  const [shitBalance, setShitBalance] = useState('0');
  const [personalNearBalance, setPersonalNearBalance] = useState('0');
  const [personalShitBalance, setPersonalShitBalance] = useState('0');
  const [isLoading, setIsLoading] = useState(false);
  const [depositAmount, setDepositAmount] = useState('');
  const [shitDepositAmount, setShitDepositAmount] = useState('');

  const fetchBalances = useCallback(async () => {
    if (!signedAccountId || !wallet) return;
    setIsLoading(true);
    try {
      // Get contract balances
      const balances = await wallet.viewMethod({
        contractId: RugFactoryContract,
        method: 'user_get_balance',
        args: { account_id: signedAccountId }
      });
      setNearBalance(utils.format.formatNearAmount(balances[0]));
      
      // Format contract SHIT balance with 18 decimals
      const contractShitBalance = balances[1];
      const formattedContractShitBalance = new Intl.NumberFormat('en-US').format((Number(contractShitBalance) / Math.pow(10, 18)).toFixed(4));
      setShitBalance(formattedContractShitBalance);

      // Get personal NEAR balance
      const personalNearBalance = await wallet.getBalance(signedAccountId, true);
      setPersonalNearBalance(personalNearBalance);

      // Fetch personal SHIT token balance
      const personalShitBalance = await wallet.viewMethod({
        contractId: ShitTokenContract,
        method: 'ft_balance_of',
        args: { account_id: signedAccountId }
      });
      const formattedPersonalShitBalance = new Intl.NumberFormat('en-US').format((Number(personalShitBalance) / Math.pow(10, 18)).toFixed(4));
      setPersonalShitBalance(formattedPersonalShitBalance);
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

  const handleDepositShit = async (amount) => {
    if (!signedAccountId || !wallet) return;
    try {
      const depositAmount = amount || shitDepositAmount;
      if (!depositAmount) return;
      
      // Convert to 18 decimals for SHIT token
      const yoctoAmount = (BigInt(depositAmount) * BigInt(10 ** 18)).toString();
      await wallet.callMethod({
        contractId: ShitTokenContract,
        method: 'ft_transfer_call',
        args: {
          receiver_id: RugFactoryContract,
          amount: yoctoAmount,
          msg: ''
        },
        gas: '300000000000000', // 300 TGas
        deposit: '1' // Required for ft_transfer_call
      });
      setShitDepositAmount('');
      await fetchBalances();
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
        <h2 className={styles.title}>YOUR RUGFACTORY ACCOUNT</h2>
        <div className={styles.accountInfo}>
          {isLoading ? (
            <p>Loading balances...</p>
          ) : (
            <>
              <p>Account ID: {signedAccountId}</p>
              <p>Personal NEAR Balance: {personalNearBalance} Ⓝ</p>
              <p>Contract NEAR Balance: {nearBalance} Ⓝ</p>
              <p>Personal SHIT Balance: {personalShitBalance} SHIT</p>
              <p>Contract SHIT Balance: {shitBalance} SHIT</p>
            </>
          )}
        </div>

        <div className={styles.depositSection}>
          <h3>Deposit NEAR</h3>
          <input
            type="number"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="Amount in NEAR"
            className={styles.input}
          />
          <div className={styles.buttonGroup}>
            <button onClick={handleDepositNear} className={styles.button}>
              Deposit NEAR
            </button>
            <button onClick={handleWithdrawNear} className={styles.button}>
              Withdraw NEAR
            </button>
          </div>
        </div>

        <div className={styles.depositSection}>
          <h3>Deposit SHIT</h3>
          <input
            type="number"
            value={shitDepositAmount}
            onChange={(e) => setShitDepositAmount(e.target.value)}
            placeholder="Amount in SHIT"
            className={styles.input}
          />
          <div className={styles.buttonGroup}>
            <button onClick={() => handleDepositShit('1000')} className={styles.button}>
              Deposit 1,000 SHIT
            </button>
            <button onClick={() => handleDepositShit('10000')} className={styles.button}>
              Deposit 10,000 SHIT
            </button>
            <button onClick={() => handleDepositShit('100000')} className={styles.button}>
              Deposit 100,000 SHIT
            </button>
            <button onClick={() => handleDepositShit()} className={styles.button}>
              Deposit Custom Amount
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default UserSection;