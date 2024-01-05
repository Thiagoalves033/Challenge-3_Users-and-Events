import { Express } from 'express';

export default class ExpressServer {
  private app: Express;
  private port: string | number;

  constructor(app: Express, port: string | number) {
    this.app = app;
    this.port = port;
  }

  public start(): void {
    this.app.listen(this.port, () => console.log(`Server listening on port ${this.port}...`));
  }
}
