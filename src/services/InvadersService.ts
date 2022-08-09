import { getAuth } from "firebase/auth";
import { child, get, getDatabase, ref, set } from "firebase/database";
import { IInvadersScore } from "../domain/invadersTypes";
import { getNewInvadersScores } from "../utils/invaders/invadersHelpers";

export class InvadersService {
  static async getBestScores() {
    const auth = getAuth();
    if (auth.currentUser) {
      const database = getDatabase();
      const path = ref(database);
      const response: IInvadersScore[] = await (
        await get(child(path, `/games/invaders/scores/`))
      ).val();
      return response.sort((a, b) => b.score - a.score);
    }
    return null;
  }

  static async setRecord(score: number, allScores: IInvadersScore[]) {
    const auth = getAuth();
    if (auth.currentUser) {
      const uid = auth.currentUser.uid;
      const newScore = {
        uid,
        name: auth.currentUser.displayName!,
        score,
      };
      const data = getNewInvadersScores(allScores, newScore);
      const database = getDatabase();
      await set(ref(database, `games/invaders/scores/`), data);
    }
  }
}
