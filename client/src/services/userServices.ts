import axios from "axios";
import User from "../interfaces/user";
import jwt_decode from "jwt-decode";

let api: string = `${process.env.REACT_APP_API}/users`;

export function checkUser(userToCheck: User) {
  return axios.post(`${process.env.REACT_APP_API}/login`, userToCheck);
}

export function getAllUsers() {
  return axios.get(api, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}

export function getUserByid(id: number) {
  return axios.get(`${api}/${id}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as any).token,
    },
  });
}

export function addUser(userToAdd: User) {
  return axios.post(`${process.env.REACT_APP_API}/register`, userToAdd);
}

export function updateUserById(userId: number, updatedUser: User) {
  return axios.put(`${api}/${userId}`, updatedUser, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}

export function deleteUser(idToDelete: number) {
  return axios.delete(`${api}/${idToDelete}`, {
    headers: {
      Authorization: JSON.parse(sessionStorage.getItem("token") as string)
        .token,
    },
  });
}

export function loginWithGoogle(email: string) {
  console.log({email}.email);
  
  return axios.post(`${api}/google`, {email}.email);
}

export function getTokenDetails() {
  let token = JSON.parse(sessionStorage.getItem("token") as any).token;
  console.log(token);

  return jwt_decode(token);
}
