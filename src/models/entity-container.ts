import Player from "./player";
import { IBlock, ICreature, IModel } from "./types";
import { DisplayObject } from "pixi.js";
import { ContainerPeek } from "./container-peek";

export class EntityContainer {

  constructor(
    public player: Player,
    public creatures: ICreature[],
    public blocks: IBlock[],
  ) {}

  public update(peekResult: ContainerPeek){
    this.player.update(peekResult.player)

    for (let i = 0; i < this.creatures.length; ++i)
      this.creatures[i].update(peekResult.creatures[i])

    for (let i = 0; i < this.blocks.length; ++i)
      this.blocks[i].update(peekResult.blocks[i])
  }

  public peekAll(delta: number): ContainerPeek {
    return new ContainerPeek(
      this.player.peek(delta),
      this.creatures.map(x => x.peek(delta)),
      this.blocks.map(x => x.peek(delta)))
  }

  public getDisplayObjects(): DisplayObject[] {
    const objs: IModel[] = [this.player]
    for (const creature of this.creatures)
      objs.push(creature)
    for (const block of this.blocks)
      objs.push(block)

    return objs.map(x => x.getDisplayObject())
  }
}