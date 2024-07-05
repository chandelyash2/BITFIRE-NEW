import Cookies from 'js-cookie';

export function loginUser(token:string) {
    // Set the JWT token in cookies
    Cookies.set('jwtToken', token, { expires: 7 }); // Store the token for 7 days
    
    // Reinitialize Apollo Client (this part will be handled in the Provider)
    window.dispatchEvent(new Event('jwtTokenSet'));
}
