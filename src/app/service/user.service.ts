import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpEvent, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { User } from '../model/user';
import { CustomHttpResponse } from '../model/custom-http-response';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private host = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * getUsers
  */
  public getUsers(): Observable<User[] | HttpErrorResponse> {
    return this.http.get<User[]>(`${this.host}/user/list`);
  }

  /**
  * addUser
 */
  public addUser(formData: FormData): Observable<User[] | HttpErrorResponse> {
    return this.http.post<User[]>(`${this.host}/user/add`, formData);
  }

  /**
 * updateUser
*/
  public updateUser(formData: FormData): Observable<User[] | HttpErrorResponse> {
    return this.http.post<User[]>(`${this.host}/user/update`, formData);
  }

  /**
* resetPassword
*/
  public resetPassword(email: string): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.get<CustomHttpResponse>(`${this.host}/user/resetPassword/${email}`);
  }

  /**
* updateProfileImage
*/
  public updateProfileImage(formData: FormData): Observable<HttpEvent<User> | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/user/updateProfileImage`, formData, { reportProgress: true, observe: 'events' });
  }

  /**
 * deleteUser
*/
  public deleteUser(username: string): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/user/delete/${username}`);
  }

  /**
 * addUserToLocalCache
*/
  public addUserToLocalCache(users: User[]): void {
    localStorage.setItem('user', JSON.stringify(users));
  }

  /**
 * getUsersFromLocalCache
*/
  public getUsersFromLocalCache(): User[] {
    if (localStorage.getItem('user')) {
      return JSON.parse(localStorage.getItem('user'));
    }
    return null;
  }

  /**
 * createUserFormDate
*/
  public createUserFormDate(loggedInUsername: string, user: User, profileImage: File): FormData {
    const formData = new FormData();
    formData.append('currentUsername', loggedInUsername);
    formData.append('firstName', user.firstName);
    formData.append('lastName', user.lastName);
    formData.append('username', user.username);
    formData.append('email', user.email);
    formData.append('role', user.role);
    formData.append('profileImage', profileImage);
    formData.append('isActive', JSON.stringify(user.active));
    formData.append('unlocked', JSON.stringify(user.unlocked));
    return formData;
  }
}

