"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const game_model_1 = __importDefault(require("../models/game.model"));
const multerUpload_1 = __importDefault(require("../util/multerUpload"));
const multerValidation_1 = __importDefault(require("../util/multerValidation"));
const file_type_1 = __importDefault(require("file-type"));
class GameController {
    constructor() {
        this.router = express_1.Router();
    }
    //getGames
    getGames(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield game_model_1.default.find();
            res.json({
                games
            });
        });
    }
    //getGame For ID
    getGamesUid(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield game_model_1.default.find({ uid: { $regex: req.body.uid } });
            res.json({
                games
            });
        });
    }
    //ValidateImages
    validateImages(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield multerValidation_1.default(req, res, () => __awaiter(this, void 0, void 0, function* () {
                    const bf = yield file_type_1.default.fromBuffer(req.file.buffer);
                    const image = bf === null || bf === void 0 ? void 0 : bf.mime.split("/")[0];
                    if (image != 'image') {
                        res.status(500).send('El formato del archivo no es valido');
                    }
                }));
                next();
            }
            catch (error) {
                res.json({ error: error });
            }
        });
    }
    //UploadImages
    uploadImages(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                multerUpload_1.default(req, res, () => __awaiter(this, void 0, void 0, function* () {
                    next();
                }));
            }
            catch (error) {
                res.json({ error: error });
            }
        });
    }
    //CreateGame
    createGame(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const gname = req.body.gname[0];
                const gdescription = req.body.gdescription[0];
                const ggender = req.body.ggender[0];
                const gconsole = req.body.gconsole[0];
                const grequirements = req.body.grequirements[0];
                const gauthor = req.body.gauthor[0];
                const uid = req.body.uid;
                const gimage = `/uploads/${req.file.originalname}`;
                const game = new game_model_1.default({
                    gname,
                    gdescription,
                    ggender,
                    gconsole,
                    grequirements,
                    gauthor,
                    gimage,
                    uid
                });
                const db = yield game.save();
                res.json({
                    game: db
                });
            }
            catch (error) {
                res.json({ error: error });
            }
        });
    }
    //DeleteGame For ID
    deleteGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const game = yield game_model_1.default.findByIdAndDelete(req.body.gid);
                res.json({
                    message: "Este juego fue eliminado con éxito",
                });
            }
            catch (error) {
                res.json({
                    messagerror: error,
                });
            }
        });
    }
    //UpdateGame For ID
    updateGame(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const game = yield game_model_1.default.findByIdAndUpdate(req.body.gid, req.body);
                res.json({
                    message: "Este juego fue actualizado con éxito"
                });
            }
            catch (error) {
                res.json({
                    messagerror: error
                });
            }
        });
    }
}
const gameController = new GameController();
exports.default = gameController;
