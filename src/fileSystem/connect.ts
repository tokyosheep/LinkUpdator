import { csInterface } from './init';

export interface HostObj{
    jsx:string,
    callHostScript:<T, R>(obj:T)=>Promise<R>
};

export class SendHostScript implements HostObj {
  jsx:'hostScript';
  constructor () {
    this.jsx = 'hostScript';
  }

  callHostScript <T, R>(obj:T):Promise<R> {
    console.log(obj);
    return new Promise((resolve) => {
      csInterface.evalScript(`${this.jsx}(${obj !== undefined ? JSON.stringify(obj) : ''})`, (o:string) => {
        const json:R = JSON.parse(o);
        console.log(json);
        resolve(json);
      });
    });
  }
};