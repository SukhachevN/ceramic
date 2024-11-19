import { registerSchema } from './services/scoreService';

(async () => {
    const schemaCommitId = await registerSchema();
    console.log('Schema Commit ID:', schemaCommitId);
})();
