"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = require("dotenv");
const path = require("path");
dotenv.config({
    path: path.join(process.cwd(), `.env.${process.env.NODE_ENV || 'development'}`),
});
//# sourceMappingURL=index.js.map