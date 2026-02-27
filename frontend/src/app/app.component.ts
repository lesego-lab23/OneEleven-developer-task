import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {

  apiUrl = '';
  email = '';
  response = '';

  constructor(private http: HttpClient) {}

  testEndpoint() {
    const validatorUrl =
      `https://yhxzjyykdsfkdrmdxgho.supabase.co/functions/v1/application-task?url=${this.apiUrl}&email=${this.email}`;

    this.http.get(validatorUrl, { responseType: 'text' })
      .subscribe({
        next: (res) => this.response = res,
        error: () => this.response = 'Error testing endpoint'
      });
  }
}