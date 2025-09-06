import EventEmitter from "events";

export default class AloeEvent extends EventEmitter {
  public client: any;
  public name?: string;
  constructor(client: any) {
    super();
    this.client = client;
  }
}
