export function getUserSession(): string | null {
  return sessionStorage.getItem("token");
}

export function saveSessionToken(token: string): void{
  sessionStorage.setItem("token", token);
}

export function clearSessionToken(): void {
  sessionStorage.removeItem("token");
}

export function saveLocalValue(key: string, value: string){
  localStorage.setItem(key, value);
}

export function getLocalValue(key: string){
  return localStorage.getItem(key);
}

export function clearLocalStorage(){
  localStorage.clear()
}
