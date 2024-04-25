"use server";

import { registerService } from "../services/auth.service";

async function handleRegister(userInfo) {
  const newUserInfo = {
    firstname: userInfo.get("firstName"),
    lastname: userInfo.get("lastName"),
    gender: userInfo.get("gender"),
    profile_url: "string",
    email: userInfo.get("email"),
    password: userInfo.get("password"),
  };
  const registerDetail = await registerService(newUserInfo);
  if(registerDetail.status!==200){
    return registerDetail.detail
  }
}
export default handleRegister;
