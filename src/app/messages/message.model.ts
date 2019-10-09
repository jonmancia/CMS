export class Message {
  constructor(
    public messageId: number,
    public subject: string,
    public msgText: string,
    public sender: string
  ) { }
}