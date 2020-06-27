import { IModel, IModelPeek } from "./types";

export class ContainerPeek {

  constructor(
    public player: IModelPeek,
    public creatures: IModelPeek[],
    public blocks: IModelPeek[],
  ) {}

  public get(filter?: { hasGravity: boolean }): IModelPeek[] {
    const objs: IModelPeek[] = [this.player]
    for (const creature of this.creatures)
      objs.push(creature)
    for (const block of this.blocks)
      objs.push(block)

    if (filter)
      return objs.filter(x => x.hasGravity === filter.hasGravity)

    return objs
  }
}