import { User } from './user'

export class Post {
  public id: number;
  public isPublic: boolean = true;
  public time: Date;
  public image: any;
  public caption: string;
  public poster: User;

  public getImage(): string {
    return 'data:image/jpeg;base64,' + this.image;
  }
   
}
