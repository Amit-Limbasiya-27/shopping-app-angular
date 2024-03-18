import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
    idToken: string;
    email: string;
    refreshToken: string;
    expiresIn: string;
    localId: string;
    registered?: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    user = new BehaviorSubject<User>(null);
    tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router) { }


    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC8lGdsKfBuRDsgoT7SXN2EKnnVialWX0s",
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap((res) => {
                this.handleAuthenticatedUserData(res.email, res.localId, res.idToken, +res.expiresIn)
            }));
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>(
            "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC8lGdsKfBuRDsgoT7SXN2EKnnVialWX0s",
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap((res) => {
                this.handleAuthenticatedUserData(res.email, res.localId, res.idToken, +res.expiresIn)
            }));
    }

    autoLogin() {
        const userData: {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string
        } = JSON.parse(localStorage.getItem("userData"));

        if (!userData) return;

        const user = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
        if (user.token) {
            this.user.next(user);
            this.autoLogout((new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()));
        }
    }

    logout() {
        this.user.next(null);
        localStorage.removeItem('userData');
        if (this.tokenExpirationTimer) {
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
        this.router.navigate(["/auth"]);
    }

    autoLogout(expirationDuration: number) {
        this.tokenExpirationTimer = setTimeout(() => {
            this.logout();
        }, expirationDuration);
    }

    private handleAuthenticatedUserData(email: string, userId: string, token: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + (+expiresIn) * 1000);
        const validUser = new User(email, userId, token, expirationDate);
        this.user.next(validUser);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem("userData", JSON.stringify(validUser));
    }

    private handleError(errorRes: HttpErrorResponse) {
        let errorMessage: string = "Unknown Error Occured!";

        if (!errorRes || !errorRes.error || !errorRes.error.error) {
            return throwError(() => new Error(errorMessage));
        }
        else {
            switch (errorRes.error.error.message) {
                case 'EMAIL_EXISTS':
                    errorMessage = "Email exists already!";
                    break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                    errorMessage = "Too many attempts! Try again later!";
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = "Email not found! Please enter registered email!";
                    break;
                case 'INVALID_LOGIN_CREDENTIALS':
                    errorMessage = "Invalid Credentials! Please enter valid email or password!";
                    break;
            }
            return throwError(() => new Error(errorMessage));
        }
    }
}