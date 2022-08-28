import { getAuth } from "firebase/auth";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { IBoardScore } from "../domain/scoreTypes";
import { getNewBoardScores } from "../utils/score/scoreHelpers";

export class ScoreService {
  static async getBestScores(game: string) {
    const auth = getAuth();
    if (auth.currentUser) {
      const database = getDatabase();
      const path = ref(database);
      const response: IBoardScore[] = await (
        await get(child(path, `/games/${game}/scores/`))
      ).val();
      return response.sort((a, b) => b.score - a.score);
    }
    return null;
  }

  static async setRecord(score: number, game: string) {
    const auth = getAuth();
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      const newScore = {
        uid,
        name: auth.currentUser.displayName!,
        score,
      };
      const allScores = await ScoreService.getBestScores(game);
      const data = getNewBoardScores(allScores!, newScore);
      const database = getDatabase();
      await set(ref(database, `games/${game}/scores/`), data);
    }
  }
}
