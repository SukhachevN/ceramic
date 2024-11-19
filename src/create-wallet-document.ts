import { createWalletScoresDocument } from './services/scoreService';

const walletAddress = '0xB374Ca013934e498e5baD3409147F34E6c462389';

(async () => {
    const documentId = await createWalletScoresDocument(walletAddress);
    console.log('Created Document ID for wallet:', documentId);
})();
