export function loginUser(token: string) {
  // Set the JWT token in cookies
  sessionStorage.setItem("jwt-token", token); // Store the token for 7 days

  // Reinitialize Apollo Client (this part will be handled in the Provider)
  window.dispatchEvent(new Event("jwtTokenSett"));
}
