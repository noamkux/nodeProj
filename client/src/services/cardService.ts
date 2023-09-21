import axios from "axios";
import Card from "../interfaces/card";

let api: string = `${process.env.REACT_APP_API}/cards`;


export function getAllCards() {
  return axios.get(api);
}

export function getCardsByUserId() {
  return axios.get(`${api}/mycards` , {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string).token,
    },
  }
);
}

export function deleteCard(idTodelete: number) {
  return axios.delete(`${api}/${idTodelete}`,{
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string).token,
    },
  });
}
export function getCardById(id : string){
  return axios.get(`${api}/${id}`)
}

export function updateCardByid(id: string, newCard : Card){
  return axios.put(`${api}/${id}`, newCard, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string).token,
    },
  })
}

export function postNewCard(cardToPost: Card) {
  return axios.post(api, cardToPost, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string).token,
    },
  });
}
