"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkThumbnail = void 0;
var node_cache_1 = __importDefault(require("node-cache"));
var myCache = new node_cache_1.default({ stdTTL: 5 });
var checkThumbnail = function (req, res, next) {
    try {
        var _a = req.query, filename = _a.filename, width = _a.width, height = _a.height;
        var cacheFilename = myCache.get("filename");
        var cacheWidth = myCache.get("width");
        var cacheHeight = myCache.get("height");
        if (filename == cacheFilename &&
            width == cacheWidth &&
            height == cacheHeight) {
            return res.json({
                status: "Success",
                FileName: "path already created thumbnail/" + filename + ".png-" + width + "-" + height + "_thumbnail",
            });
        }
        else {
            var success = myCache.mset([
                { key: "filename", val: filename },
                { key: "width", val: width },
                { key: "height", val: height },
            ]);
            return next();
        }
    }
    catch (err) {
        throw new Error(err);
    }
};
exports.checkThumbnail = checkThumbnail;
