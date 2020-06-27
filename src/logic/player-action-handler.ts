import { EventEmitter } from "../utils/event-emitter";
import { InputState } from "./input-handler";
import Player from "../models/player";

export enum PlayerActionTypes {
  MoveUp,
  MoveDown,
  MoveLeft,
  MoveRight,
  Jump,
  PrimaryAction,
  SecondaryAction,
}

export class PlayerAction {

  public type: PlayerActionTypes

  public keyCode: string

  public actionBegin: EventEmitter<void>
  public actionEnd: EventEmitter<void>

  private __isActive = false

  constructor(type: PlayerActionTypes, keyCode: string) {
    this.type = type
    this.keyCode = keyCode
    this.actionBegin = new EventEmitter<void>()
    this.actionEnd = new EventEmitter<void>()

    this.actionBegin.subscribe(() => {
      this.__isActive = true
    })
    this.actionEnd.subscribe(() => {
      this.__isActive = false
    })
  }

  // this getter will make sure we don't write a shared object
  public get isActive(): boolean {
    return this.__isActive
  }

  public sendEvent(inputState: InputState) {
    switch (inputState) {
      case InputState.Press:
        this.actionBegin.emit()
        break
      case InputState.Release:
        this.actionEnd.emit()
        break
    }
  }
}

export class PlayerActionHandler {

  private actions: PlayerAction[] = [
    new PlayerAction(PlayerActionTypes.MoveUp, 'KeyW'),
    new PlayerAction(PlayerActionTypes.MoveLeft, 'KeyA'),
    new PlayerAction(PlayerActionTypes.MoveDown, 'KeyS'),
    new PlayerAction(PlayerActionTypes.MoveRight, 'KeyD'),
    new PlayerAction(PlayerActionTypes.Jump, 'Space'),
  ]

  private readonly keyActionMap: { [key: string]: PlayerAction }
  private readonly typeActionMap: { [key: string]: PlayerAction }

  constructor() {
    this.keyActionMap = this.actions.reduce(
      (rest: any, curr) => {
        rest[curr.keyCode] = curr
        return rest
      }, {})
    this.typeActionMap = this.actions.reduce(
      (rest: any, curr) => {
        rest[curr.type] = curr
        return rest
      }, {})
  }

  public get trackedKeys() {
    return Object.keys(this.keyActionMap)
  }

  public getActionForKey(keyCode: string): PlayerAction {
    if (!(keyCode in this.keyActionMap))
      return undefined
    return this.keyActionMap[keyCode]
  }

  public getAction(playerAction: PlayerActionTypes): PlayerAction {
    return this.typeActionMap[playerAction]
  }
}