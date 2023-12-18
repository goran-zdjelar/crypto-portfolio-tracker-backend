import { Injectable } from '@nestjs/common';
import { HttpService as AxiosService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';

interface HttpPostArgs {
  url: string;
  body: {
    [key: string]: string | number | boolean | Array<string | number | boolean>;
  };
  xApiKey?: string;
}

@Injectable()
export class HttpService {
  constructor(private readonly axiosService: AxiosService) {}

  post({ url, body, xApiKey }: HttpPostArgs) {
    return lastValueFrom(
      this.axiosService.post(url, body, {
        headers: {
          'content-type': 'application/json',
          'x-api-key': xApiKey,
        },
      }),
    );
  }
}
