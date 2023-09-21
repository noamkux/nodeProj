import { getUserByid, updateUserById } from "./userServices";

export async function handleUserFav(cardId: number, userId: number) {
  try {
    const res = await getUserByid(userId);

    if (!res.data.favCards) {
      res.data.favCards = [];
    }
    if (!res.data.favCards.includes(cardId)) {
      res.data.favCards.push(cardId);
      
      await updateUserById(userId, res.data);
      return true
    } else {
      const indexToRemove: number = res.data.favCards.indexOf(cardId);
      if (indexToRemove !== -1) {
        res.data.favCards.splice(indexToRemove, 1);
        await updateUserById(userId, res.data);
        return false
      }
    }
  } catch (err) {
    console.log(err);
  }
}
