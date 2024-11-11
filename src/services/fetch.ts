import { AxiosInstance } from 'axios';
import { Params } from '../axios/interfaces';
import { TariffResponse } from '../dto/interfaces';

export class Fetch {
  constructor(private instance: AxiosInstance) {}

  async fetchData(params: Params): Promise<TariffResponse> {
    try {
      const response = await this.instance.get<TariffResponse>('/box', {
        params,
      });

      // console.log(response.data.response.data);

      return response.data;
    } catch (error) {
      throw new Error(`Failed to fetch data: ${error}`);
    }
  }
}

// import { instance } from '../axios/instance';

// const test = new Fetch(instance);

// test.fetchData({ date: '2024-11-11' });
