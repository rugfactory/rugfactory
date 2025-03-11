import { useContext, useEffect, useState } from 'react';
import { NearContext } from '@/wallets/near';
import { RugFactoryContract } from '@/config';
import styles from '../styles/message_section.module.css';

function MessageSection() {
  const { signedAccountId, wallet } = useContext(NearContext);
  const [currentMessage, setCurrentMessage] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const fetchCurrentMessage = async () => {
    if (!wallet) return;
    try {
      const message = await wallet.viewMethod({
        contractId: RugFactoryContract,
        method: 'greeting_get'
      });
      setCurrentMessage(message);
    } catch (error) {
      console.error('Error fetching message:', error);
    }
  };

  const handleSetMessage = async () => {
    if (!signedAccountId || !wallet || !newMessage) return;
    setIsLoading(true);
    try {
      await wallet.callMethod({
        contractId: RugFactoryContract,
        method: 'greeting_set',
        args: {
          greeting: newMessage
        }
      });

      setNewMessage('');
      await fetchCurrentMessage();
    } catch (error) {
      console.error('Error setting message:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentMessage();
  }, [wallet, fetchCurrentMessage]);

  if (!signedAccountId) {
    return null;
  }

  return (
    <section className={styles.messageSectionContainer}>
      <div className={styles.content}>
        <h2 className={styles.title}>MESSAGE BOARD</h2>
        <div className={styles.messageDisplay}>
          <h3>Latest Message from Previous Rugger:</h3>
          <p className={styles.currentMessage}>{currentMessage || 'No messages yet'}</p>
        </div>
        <div className={styles.messageInput}>
          <h3>Leave Your Message (Costs 100 SHIT)</h3>
          <textarea
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Write your message to the next rugger..."
            className={styles.textarea}
            maxLength={500}
          />
          <button
            onClick={handleSetMessage}
            className={styles.button}
            disabled={isLoading || !newMessage}
          >
            {isLoading ? 'Sending...' : 'Send Message (100 SHIT)'}
          </button>
        </div>
      </div>
    </section>
  );
}

export default MessageSection;