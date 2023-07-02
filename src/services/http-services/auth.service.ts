import {httpService} from "src/services/http-services/http.service";


export interface authTokenData{
  userId:string,
  iat:number,
  exp:number,

}
export const AUTH_TOKEN_KEY = 'authToken';

class AuthService{
  constructor() {
    httpService.setAuthToken(this.getAuthToken());
  }
  getAuthToken(){
    return window.localStorage.getItem(AUTH_TOKEN_KEY);
  }
  setAuthToken(token:string|null){
    if(token) {
      window.localStorage.setItem(AUTH_TOKEN_KEY, token);
    }
    else{
      window.localStorage.removeItem(AUTH_TOKEN_KEY);
    }
    httpService.setAuthToken(token)
  }
  async login(data:any) {
    const res = await httpService.post('auth/login', data);
    this.setAuthToken(res.data.token);
    return res;
  }
  async register(data:any) {
    const res = await httpService.post('auth/register', data);
    this.setAuthToken(res.data.token);
    return res;
  }
}

export const authService = new AuthService();
