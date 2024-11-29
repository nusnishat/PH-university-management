"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentRoutes = void 0;
const express_1 = __importDefault(require("express"));
const strudent_controller_1 = require("./strudent.controller");
const router = express_1.default.Router();
router.post('/create-student', strudent_controller_1.StudentControllers.createStudent);
router.get('/', strudent_controller_1.StudentControllers.getStudents);
router.get('/:id', strudent_controller_1.StudentControllers.getStudents);
exports.StudentRoutes = router;
