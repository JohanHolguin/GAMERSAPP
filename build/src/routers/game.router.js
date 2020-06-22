"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const game_controller_1 = __importDefault(require("../controllers/game.controller"));
const checkToken_1 = __importDefault(require("../authentication/checkToken"));
const express_validator_1 = require("express-validator");
const utilities_1 = require("../util/utilities");
class GameRouter {
    constructor() {
        this.router = express_1.Router();
        this.config();
    }
    config() {
        //Nuevo Juego 
        this.router.get(utilities_1.Routers.gamecreate, express_validator_1.body(utilities_1.inputGame.name)
            .exists()
            .notEmpty()
            .withMessage('El paramatro nombre del juego es requerido')
            .trim()
            .escape(), express_validator_1.body(utilities_1.inputGame.description)
            .exists()
            .notEmpty()
            .withMessage('El paramatro descripción es requerido')
            .trim()
            .escape(), express_validator_1.body(utilities_1.inputGame.gender)
            .exists()
            .notEmpty()
            .withMessage('El paramatro genero es requerido')
            .trim()
            .escape(), express_validator_1.body(utilities_1.inputGame.console)
            .exists()
            .notEmpty()
            .withMessage('El paramatro consola es requerido')
            .trim()
            .escape(), express_validator_1.body(utilities_1.inputGame.requirements)
            .exists()
            .notEmpty()
            .withMessage('El paramatro requerimientos es requerido')
            .trim()
            .escape(), express_validator_1.body(utilities_1.inputGame.author)
            .exists()
            .notEmpty()
            .withMessage('El paramatro autor es requerido')
            .trim()
            .escape(), express_validator_1.body(utilities_1.inputGame.image)
            .exists()
            .notEmpty()
            .withMessage('El paramatro imagen es requerido'), express_validator_1.body(utilities_1.inputGame.uid)
            .exists()
            .notEmpty()
            .withMessage('El paramatro uid es requerido'), game_controller_1.default.validateImages, game_controller_1.default.uploadImages, checkToken_1.default, game_controller_1.default.createGame);
        //Todos los Juegos
        this.router.get(utilities_1.Routers.games, checkToken_1.default, game_controller_1.default.getGames);
        //Juegos del Usuario (por ID)
        this.router.get(utilities_1.Routers.ugames, checkToken_1.default, game_controller_1.default.getGamesUid);
        //Eliminar Juegos (por ID)
        this.router.get(utilities_1.Routers.gamedelete, checkToken_1.default, game_controller_1.default.deleteGame);
        //Actualizar Juegos (por ID)
        this.router.get(utilities_1.Routers.gameupdate, checkToken_1.default, game_controller_1.default.updateGame);
    }
}
const gameRouter = new GameRouter();
exports.default = gameRouter.router;
