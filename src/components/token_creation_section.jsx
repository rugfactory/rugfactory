import { useState, useContext } from 'react';
import styles from '../styles/token_creation_section.module.css';
import { NearContext } from '@/wallets/near';
import { RugFactoryContract } from '../config';
import imageCompression from 'browser-image-compression';

export function TokenCreationSection() {
  const { wallet, signedAccountId } = useContext(NearContext);
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenIcon, setTokenIcon] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  const processImage = async (file) => {
    if (!file) return null;
    
    try {
      // Compression options
      // Check if file is SVG
      if (file.type === 'image/svg+xml') {
        const reader = new FileReader();
        return new Promise((resolve) => {
          reader.onloadend = () => {
            const base64String = reader.result;
            if (base64String.length <= 1024) {
              resolve(base64String);
            } else {
              resolve(null);
            }
          };
          reader.readAsDataURL(file);
        });
      }

      // For other image types, compress
      const options = {
        maxSizeMB: 0.001, // 1KB = 0.001MB
        maxWidthOrHeight: 32, // Reduced to 32x32 pixels
        useWebWorker: true
      };

      // Compress the image
      const compressedFile = await imageCompression(file, options);
      
      // Convert to base64
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result;
          // Check if the base64 string is under 1KB
          if (base64String.length <= 1024) {
            resolve(base64String);
          } else {
            resolve(null);
          }
        };
        reader.readAsDataURL(compressedFile);
      });
    } catch (error) {
      console.error('Error compressing image:', error);
      return null;
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const processedIcon = await processImage(file);
        if (processedIcon) {
          setTokenIcon(processedIcon);
          setError('');
        } else {
          setTokenIcon(null);
          setError('Image too large. Please use an SVG or a smaller image that can be compressed to under 1KB.');
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
          <br/>
          Make sure you deposit some near and shit first!
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
            <label htmlFor="tokenIcon">Token Icon (Optional)</label>
          <p className={styles.iconGuidelines}>
            SVG format preferred (max 1KB). For PNG/JPG, image will be resized to 32x32 pixels.
            Larger images that cannot be compressed under 1KB will be rejected.
            Our contract has a default one it will use, if none is provided!
          </p>
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