import { useState, useContext } from 'react';
import styles from '../styles/token_creation_section.module.css';
import { NearContext } from '@/wallets/near';
import { RugFactoryContract } from '../config';

export function TokenCreationSection() {
  const { wallet, signedAccountId } = useContext(NearContext);
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenIcon, setTokenIcon] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const processImage = async (file) => {
    if (!file) return null;
    
    return new Promise((resolve) => {
      const reader = new FileReader();
      const img = new Image();

      reader.onload = (e) => {
        img.src = e.target.result;
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          
          // Calculate new dimensions while maintaining aspect ratio
          const maxSize = 64; // Small size for icon
          if (width > height) {
            if (width > maxSize) {
              height *= maxSize / width;
              width = maxSize;
            }
          } else {
            if (height > maxSize) {
              width *= maxSize / height;
              height = maxSize;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);

          // Convert to base64 and check size
          let quality = 0.9;
          let base64 = canvas.toDataURL('image/png', quality);
          
          // Reduce quality until size is under 1KB
          while (base64.length > 1024 && quality > 0.1) {
            quality -= 0.1;
            base64 = canvas.toDataURL('image/png', quality);
          }

          resolve(base64.length <= 1024 ? base64 : null);
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const processedIcon = await processImage(file);
        setTokenIcon(processedIcon);
        if (!processedIcon) {
          setError('Could not compress image to under 1KB. Please try a smaller image.');
        }
      } catch (err) {
        console.error('Error processing image:', err);
        setError('Error processing image. Please try another image.');
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!wallet || !signedAccountId) return;

    setIsCreating(true);
    setError('');

    try {
      const args = {
        name: tokenName,
        symbol: tokenSymbol.toLowerCase(),
        icon: tokenIcon
      };

      await wallet.callMethod({
        contractId: RugFactoryContract,
        method: 'token_create',
        args,
        gas: '300000000000000' // 300 TGas
      });

      // Reset form
      setTokenName('');
      setTokenSymbol('');
      setTokenIcon(null);
      setError('');
    } catch (err) {
      console.error('Error creating token:', err);
      setError(err.message || 'Failed to create token');
    } finally {
      setIsCreating(false);
    }
  };

  if (!signedAccountId) {
    return null;
  }

  return (
    <section className={styles.tokenCreationContainer}>
      <div className={styles.content}>
        <h2 className={styles.title}>Create Your Token</h2>
        <p className={styles.description}>
          Fill in the details below to create your custom token on NEAR blockchain
        </p>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="tokenName">Token Name</label>
            <input
              type="text"
              id="tokenName"
              value={tokenName}
              onChange={(e) => setTokenName(e.target.value)}
              placeholder="e.g., My Token"
              required
              disabled={isCreating}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="tokenSymbol">Token Symbol</label>
            <input
              type="text"
              id="tokenSymbol"
              value={tokenSymbol}
              onChange={(e) => setTokenSymbol(e.target.value)}
              placeholder="e.g., token"
              required
              disabled={isCreating}
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="tokenIcon">Token Icon (Optional, max 1KB)</label>
            <input
              type="file"
              id="tokenIcon"
              onChange={handleImageChange}
              accept="image/*"
              disabled={isCreating}
            />
            {tokenIcon && (
              <div className={styles.iconPreview}>
                <img src={tokenIcon} alt="Token icon preview" />
              </div>
            )}
          </div>

          {error && <p className={styles.error}>{error}</p>}

          <button
            type="submit"
            className={styles.submitButton}
            disabled={isCreating || !tokenName || !tokenSymbol}
          >
            {isCreating ? 'Creating Token...' : 'Create Token'}
          </button>
        </form>
      </div>
    </section>
  );
}