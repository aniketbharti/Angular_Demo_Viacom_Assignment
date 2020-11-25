import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable()
export class HttpService {

  constructor(private http: HttpClient) {
  }

  postMethod(url, body, otherParamets?: any) {
    return this.http.post(url, body, { headers: new CustomHttpHeaders(otherParamets) })
  }

  patchMethod(url, body, otherParamets?: any) {
    return this.http.patch(url, body, { headers: new CustomHttpHeaders(otherParamets) })
  }

  deleteMethod(url, body, otherParamets?: any) {
    return this.http.delete(url, body)
  }

  getMethod(url, otherParamets?: any) {
    return this.http.get(url, { headers: new CustomHttpHeaders(otherParamets) })
  }

  getMethodResponseParameter(url, response, otherParamets?: any) {
    response = {
      ...response,
      headers: new CustomHttpHeaders(otherParamets)
    }
    return this.http.get(url, response)
  }

  putMethod(url, base64, otherParamets?: any) {
    return this.http.put(url, base64, { headers: new CustomHttpHeaders(otherParamets) })
  }


  uploadFile(url, formdata) {
    const headers = new HttpHeaders({
      file: 'file',
    });
    return this.http.post<any>(url, formdata, {
      reportProgress: true,
      observe: 'events',
      headers: headers
    });
  }

}

// handlimng type values page,modal,none, snackbar, custom

export class CustomHttpHeaders extends HttpHeaders {
  constructor(public otherParams: any) {
    super();
  }
}



