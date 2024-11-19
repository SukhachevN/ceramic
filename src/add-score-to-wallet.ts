import { addScoreToWallet, getWalletScores } from './services/scoreService';

const documentId = '';

(async () => {
    const newScore = {
        chainId: 1,
        score: 90.0,
        tokenId: 'token-12345',
        updatedAt: new Date().toISOString(),
    };

    await addScoreToWallet(documentId, newScore);

    const walletScores = await getWalletScores(documentId);

    console.log('Wallet Scores:', walletScores);
})();
