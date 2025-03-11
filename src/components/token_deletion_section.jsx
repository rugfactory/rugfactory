import { useContext, useState } from 'react';
import { NearContext } from '../wallets/near';
import { RugFactoryContract } from '../config';
import styles from '../styles/token_deletion_section.module.css';

function TokenDeletionSection() {
  const { wallet, signedAccountId } = useContext(NearContext);
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleDeleteToken = async (e) => {
    e.preventDefault();
    if (!wallet || !signedAccountId || !tokenSymbol) return;

    setIsDeleting(true);
    setError('');
    setSuccess('');

    try {
      await wallet.callMethod({
        contractId: RugFactoryContract,
        method: 'token_delete',
        args: {
          token_symbol: tokenSymbol
        },
        gas: '300000000000000' // 300 TGas
      });

      setSuccess(`Successfully deleted token ${tokenSymbol}. You will receive 1.5 NEAR as refund.`);
      setTokenSymbol('');
    } catch (err) {
      console.error('Error deleting token:', err);
      setError(err.message || 'Failed to delete token. Make sure you are the token creator.');
    } finally {
      setIsDeleting(false);
    }
  };

  if (!signedAccountId) {
    return null;
  }

  return (
    <section className={styles.deletionContainer}>
      <div className={styles.content}>
        <h2 className={styles.title}>Delete Your Token</h2>
        <p className={styles.description}>
          You can only delete tokens that you have created. Upon deletion, you will automatically
          receive a refund of 1.5 NEAR.
        </p>

        <form onSubmit={handleDeleteToken} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="tokenSymbol">Token Symbol</label>
            <input
              type="text"
              id="tokenSymbol"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
              placeholder="Enter token symbol"
              required
              disabled={isDeleting}
            />
          </div>

          {error && <p className={styles.error}>{error}</p>}
          {success && <p className={styles.success}>{success}</p>}

          <button
            type="submit"
            className={styles.deleteButton}
            disabled={isDeleting || !tokenSymbol}
          >
            {isDeleting ? 'Deleting...' : 'Delete Token'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default TokenDeletionSection;