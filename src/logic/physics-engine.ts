import { LevelConfiguration } from "../levels/ilevel";
import { ContainerPeek } from "../models/container-peek";
import { Configuration } from "./configuration";
import { IModelPeek } from "../models/types";
import { CollisionSide } from "../utils/types";
import EnumHelper from "../utils/enum";

export default class PhysicsEngine {



  constructor(private configuration: LevelConfiguration) {

  }

  public update(delta: number, peekRequest: ContainerPeek): ContainerPeek {
    // collision
    const entities = peekRequest.get()
    for (const aEntity of entities){
      for (const bEntity of entities){
        if (aEntity === bEntity)
          continue

        const collision = PhysicsEngine.getCollision(aEntity, bEntity)
        console.log(EnumHelper.getName(collision, CollisionSide))

        if (aEntity.hasGravity && collision !== CollisionSide.None){
          aEntity.velocity = { x: 0, y: 0 }
          aEntity.hasGravity = false
        }
      }
    }

    // gravity
    const models = peekRequest.get({ hasGravity: true })
    for (const model of models) {
      model.velocity.y += Configuration.Gravity.Value + delta
      model.position.y += model.velocity.y
    }

    return peekRequest
  }

  private static getCollision(r1: IModelPeek, r2: IModelPeek): CollisionSide {
    const dx = (r1.position.x + r1.boundary.width / 2) - (r2.position.x + r2.boundary.width / 2)
    const dy = (r1.position.y + r1.boundary.height / 2) - (r2.position.y + r2.boundary.height / 2)
    const width = (r1.boundary.width + r2.boundary.width) / 2
    const height = (r1.boundary.height + r2.boundary.height) / 2
    const crossWidth = width * dy
    const crossHeight = height * dx
    let collision = CollisionSide.None

    if (Math.abs(dx) <= width && Math.abs(dy) <= height) {
      if (crossWidth > crossHeight) {
        collision = crossWidth > -crossHeight ? CollisionSide.Bottom : CollisionSide.Left
      } else {
        collision = crossWidth > -crossHeight ? CollisionSide.Right : CollisionSide.Top
      }
    }

    return collision;
  }
}