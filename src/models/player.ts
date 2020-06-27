import { DisplayObject, Sprite, Texture } from "pixi.js";
import { IModel, IModelPeek, IPosition2d, IVec2d } from "./types";
import { InputHandler } from "../logic/input-handler";
import { PlayerAction, PlayerActionHandler, PlayerActionTypes } from "../logic/player-action-handler";
import { LevelConfiguration } from "../levels/ilevel";

export default class Player implements IModel {

    private configuration: LevelConfiguration
    public velocity: IVec2d
    public liveObj: Sprite
    private inputHandler: InputHandler
    private actionHandler: PlayerActionHandler

    private jumpAction: PlayerAction;
    private rightAction: PlayerAction;
    private leftAction: PlayerAction;

    constructor(
      initPos: IPosition2d = { x: 0, y: 0 },
      configuration: LevelConfiguration
    ){
        this.configuration = configuration

        this.liveObj = new Sprite(Texture.WHITE)
        this.liveObj.x = initPos.x
        this.liveObj.y = initPos.y
        this.liveObj.width = 10
        this.liveObj.height = 10

        this.velocity = { x: 0, y: 0 }

        this.initInput()
    }

    // peeks into the next state of the player
    public peek(delta: number): IModelPeek {
        const peekObj = this.getPeekObject()
        const step = 1 + delta

        if (this.jumpAction.isActive) {
            peekObj.velocity.y -= step
        }
        else {
            peekObj.velocity.y *= 0.5
            if (Math.abs(peekObj.velocity.y) < 1e-3){
                peekObj.velocity.y = 0
            }
        }

        if (this.rightAction.isActive) {
            peekObj.velocity.x += step
        }
        else {
            peekObj.velocity.x *= 0.5
            if (Math.abs(peekObj.velocity.x) < 1e-3){
                peekObj.velocity.x = 0
            }
        }

        if (this.leftAction.isActive) {
            peekObj.velocity.x -= step
        }
        else {
            peekObj.velocity.x *= 0.5
            if (Math.abs(peekObj.velocity.x) < 1e-3){
                peekObj.velocity.x = 0
            }
        }

        peekObj.position.x += peekObj.velocity.x
        peekObj.position.y += peekObj.velocity.y

        return peekObj
    }

    // updates the actual sprite according to
    // the previously verified & modified peek info
    public update(peekObj: IModelPeek): void {
        this.liveObj.x = peekObj.position.x
        this.liveObj.y = peekObj.position.y
    }

    public getDisplayObject(): DisplayObject {
        return this.liveObj
    }

    private initInput() {
        this.actionHandler = new PlayerActionHandler()
        this.inputHandler = new InputHandler(this.actionHandler)

        this.jumpAction = this.actionHandler.getAction(PlayerActionTypes.Jump)
        this.rightAction = this.actionHandler.getAction(PlayerActionTypes.MoveRight)
        this.leftAction = this.actionHandler.getAction(PlayerActionTypes.MoveLeft)
    }

    private getPeekObject(): IModelPeek {
        return {
            hasGravity: true,
            position: {
                x: this.liveObj.x,
                y: this.liveObj.y,
            },
            velocity: {
                x: this.velocity.x,
                y: this.velocity.y,
            },
            boundary: {
                width: this.liveObj.width,
                height: this.liveObj.height,
            },
        }
    }
}