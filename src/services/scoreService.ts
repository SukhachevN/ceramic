import { ceramic, authenticateCeramic } from '../config/ceramic';
import { TileDocument } from '@ceramicnetwork/stream-tile';
import schemaContent from '../schemas/scoreSchema.json';

type ScoreRecord = {
    chainId: number;
    score: number;
    tokenId: string;
    updatedAt: string;
};

type WalletScores = {
    walletAddress: string;
    scores: ScoreRecord[];
};

const schemaId = ''; // TODO: add schema id

export const registerSchema = async () => {
    await authenticateCeramic();
    const schemaDoc = await TileDocument.create(ceramic, schemaContent, {
        family: 'WalletScoresSchema',
    });
    const commitID = schemaDoc.commitId.toString();
    console.log('Schema Commit ID:', commitID);
    return commitID;
};

export const createWalletScoresDocument = async (walletAddress: string) => {
    await authenticateCeramic();

    const data: WalletScores = {
        walletAddress,
        scores: [],
    };

    const stream = await TileDocument.create(ceramic, data, {
        family: 'WalletScores',
        schema: schemaId,
    });
    return stream.id.toString();
};

export const addScoreToWallet = async (
    streamId: string,
    newScore: ScoreRecord
) => {
    await authenticateCeramic();

    const stream = await TileDocument.load(ceramic, streamId);
    const existingData = stream.content as WalletScores;

    const existingScoreIndex = existingData.scores.findIndex(
        (score) => score.chainId === newScore.chainId
    );

    if (existingScoreIndex !== -1) {
        existingData.scores[existingScoreIndex] = {
            ...existingData.scores[existingScoreIndex],
            score: newScore.score,
            updatedAt: newScore.updatedAt,
        };
    } else {
        existingData.scores.push(newScore);
    }

    await stream.update(existingData);
    return stream.content;
};

export const getWalletScores = async (streamId: string) => {
    await authenticateCeramic();
    const stream = await TileDocument.load(ceramic, streamId);
    return stream.content as WalletScores;
};
