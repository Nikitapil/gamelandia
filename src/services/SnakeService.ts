import { child, get, getDatabase, ref, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import { ISnakelevels, snakeLevels } from '../constants/snake';
import { snakeBestScoreMapper } from '../utils/snake/snakeMappers';

export class SnakeService {
  static async setRecord(score: number, level: number) {
    const auth = getAuth();
    if (auth.currentUser) {
      const { uid } = auth.currentUser;
      const database = getDatabase();
      const scores = await SnakeService.getBestScores();
      const levelLiteral = snakeLevels[level as keyof ISnakelevels];
      if (!scores?.myBestScores || score > scores?.myBestScores[levelLiteral]) {
        await set(
          ref(database, `games/snake/scores/${levelLiteral}/${uid}`),
          score
        );
      }
      if (
        !scores?.allBestScores[levelLiteral] ||
        score > scores.allBestScores[levelLiteral]
      ) {
        await set(
          ref(database, `games/snake/scores/best/${levelLiteral}`),
          score
        );
      }
    }
  }

  static async getBestScores() {
    const auth = getAuth();
    if (auth.currentUser) {
      const { uid } = auth.currentUser;
      const database = getDatabase();
      const path = ref(database);
      const response = await (
        await get(child(path, `/games//snake/scores/`))
      ).val();
      return response ? snakeBestScoreMapper(response, uid) : null;
    }
    return null;
  }
}
