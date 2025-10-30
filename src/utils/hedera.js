const { Client, AccountId, PublicKey } = require('@hashgraph/sdk');

class HederaService {
  constructor() {
    this.network = process.env.HEDERA_NETWORK || 'testnet';
    this.client = null;
    this.initializeClient();
  }

  initializeClient() {
    try {
      if (this.network === 'mainnet') {
        this.client = Client.forMainnet();
      } else if (this.network === 'previewnet') {
        this.client = Client.forPreviewnet();
      } else {
        this.client = Client.forTestnet();
      }
      console.log(`Hedera client initialized for ${this.network}`);
    } catch (error) {
      console.error('Error initializing Hedera client:', error);
      throw error;
    }
  }

  validateAccountId(accountIdString) {
    try {
      AccountId.fromString(accountIdString);
      return true;
    } catch (error) {
      return false;
    }
  }

  async verifySignature(accountIdString, message, signatureHex, publicKeyString) {
    try {
      const publicKey = PublicKey.fromString(publicKeyString);
      
      const messageBytes = Buffer.from(message, 'utf8');
      const signatureBytes = Buffer.from(signatureHex, 'hex');
      
      const isValid = publicKey.verify(messageBytes, signatureBytes);
      
      return isValid;
    } catch (error) {
      console.error('Error verifying signature:', error);
      return false;
    }
  }

  async getAccountInfo(accountIdString) {
    try {
      const accountId = AccountId.fromString(accountIdString);
      const accountInfo = await this.client.getAccountInfo(accountId);
      
      return {
        accountId: accountId.toString(),
        balance: accountInfo.balance.toString(),
        publicKey: accountInfo.key.toString()
      };
    } catch (error) {
      console.error('Error fetching account info:', error);
      throw error;
    }
  }

  generateChallenge(accountId) {
    const timestamp = Date.now();
    const random = Math.random().toString(36).substring(2, 15);
    return `Sign this message to authenticate with your Hedera account ${accountId}. Timestamp: ${timestamp}. Nonce: ${random}`;
  }
}

module.exports = new HederaService();
