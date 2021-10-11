import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  public host = environment.apiUrl;
  private token: string;
  private loggedInUsername: string;
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient) { }

  /**
   * login
   */
  public login(user: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.host}/user/login`, user, { observe: 'response' });
  }

  /**
   * register
   */
  public register(user: User): Observable<User> {
    return this.http.post<User>(`${this.host}/user/register`, user);
  }

  /**
   * logout
   */
  public logOut(): void {
    this.token = null;
    this.loggedInUsername = null;
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    localStorage.removeItem('users');
  }

  /**
  * saveToken
  */
  public saveToken(token: string): void {
    this.token = token;
    localStorage.setItem('token', token);

  }

  /**
  * addUserToLocalCache
  */
  public addUserToLocalCache(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
 * getUserFromLocalCache
 */
  public getUserFromLocalCache(): User {
    return JSON.parse(localStorage.getItem('user')!);
  }

  /**
  * loadToken
  */
  public loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  /**
   * getToken
   */
  public getToken(): string {
    return this.token;
  }

  /**
  * isLoggedIn
  */
  public isUserLoggedIn(): boolean {
    this.loadToken();
    if (this.token != null && this.token !== '') {
      if (this.jwtHelper.decodeToken(this.token).sub != null || '') {
        if (!this.jwtHelper.isTokenExpired(this.token)) {
          this.loggedInUsername = this.jwtHelper.decodeToken(this.token).sub;
          return true;
        }
      }
      return true;
    } else {
      this.logOut();
      return false;
    }
  }
}
