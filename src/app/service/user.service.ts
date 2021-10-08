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
    return this.http.get<User[]>(`${this.host}/users/list`);
  }

  /**
  * addUser
 */
  public addUser(formData: FormData): Observable<User[] | HttpErrorResponse> {
    return this.http.post<User[]>(`${this.host}/users/add`, formData);
  }

  /**
 * updateUser
*/
  public updateUser(formData: FormData): Observable<User[] | HttpErrorResponse> {
    return this.http.post<User[]>(`${this.host}/users/update`, formData);
  }

  /**
* resetPassword
*/
  public resetPassword(email: string): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.get<CustomHttpResponse>(`${this.host}/users/resetpassword/#{email}`);
  }

  /**
* updateProfileImage
*/
  public updateProfileImage(formData: FormData): Observable<HttpEvent<User> | HttpErrorResponse> {
    return this.http.post<User>(`${this.host}/users/updateProfileImage`, formData, { reportProgress: true, observe: 'events' });
  }

  /**
 * deleteUser
*/
  public deleteUser(userId: number): Observable<CustomHttpResponse | HttpErrorResponse> {
    return this.http.delete<CustomHttpResponse>(`${this.host}/users/delete/${userId}`);
  }

  /**
 * addUserToLocalCache
*/
  public addUserToLocalCache(users: User[]): void {
    localStorage.setItem('users', JSON.stringify(users));
  }

  /**
 * getUsersFromLocalCache
*/
  public getUsersFromLocalCache(): User[] {
    if (localStorage.getItem('users')) {
      return JSON.parse(localStorage.getItem('users'));
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
    formData.append('isNonLocked', JSON.stringify(user.notLocked));
    return formData;
  }
}

