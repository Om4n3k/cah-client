export interface IPlayer {
  id: string,
  nickname: string,
  state: 'playing'|'caller'|'none',
  points: number,
}

export default class Player implements IPlayer {
  public id: string;
  public nickname: string;
  public state: 'playing' | 'caller' | 'none';
  public points: number;

  constructor({id,points,nickname,state}: IPlayer) {
    this.id = id;
    this.nickname = nickname;
    this.state = state;
    this.points = points;
  }
}