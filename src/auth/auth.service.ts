import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private http: HttpService) {}

  async login(username: string, password: string) {
    const url =
      'http://localhost:8080/auth/realms/fullcycle/protocol/openid-connect/token';
    const body = new URLSearchParams({
      client_id: 'nest',
      client_secret: 'fb144175-5ae1-4c2f-bc0d-95fdcb0f0ff9',
      grant_type: 'password',
      username,
      password,
    });
    const { data } = await firstValueFrom(this.http.post(url, body));

    return data;
  }
}

// 'http://localhost:8080/auth/realms/fullcycle/protocol/openid-connect/token'
// client_id: 'nest',
// client_secret: 'fb144175-5ae1-4c2f-bc0d-95fdcb0f0ff9',
// grant_type: 'password',
// email,
// password
