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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var pg_1 = require("pg");
var dotenv = require("dotenv");
var bcrypt = require("bcrypt");
var placeholder_data_1 = require("./placeholder-data");
dotenv.config();
function seedUser(client) {
    return __awaiter(this, void 0, void 0, function () {
        var createTable, insertData;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.query("\n    CREATE TABLE IF NOT EXISTS USERS (\n      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,\n      email VARCHAR(50) NOT NULL UNIQUE,\n      user_role role DEFAULT 'VOTER',\n      password VARCHAR(255) NOT NULL CHECK (length(password) > 0),\n      created_at TIMESTAMP NOT NULL DEFAULT NOW(),\n      updated_at TIMESTAMP NOT NULL DEFAULT NOW()\n    );")];
                case 1:
                    createTable = _a.sent();
                    console.log("User table created");
                    return [4 /*yield*/, Promise.all(placeholder_data_1.usersData.map(function (user) { return __awaiter(_this, void 0, void 0, function () {
                            var hashPassword;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, bcrypt.hash(user.password, 10)];
                                    case 1:
                                        hashPassword = _a.sent();
                                        return [4 /*yield*/, client.query("\n        INSERT INTO USERS (id, email, user_role, password)\n        VALUES ('".concat(user.id, "', '").concat(user.email, "', '").concat(user.user_role, "', '").concat(hashPassword, "');"))];
                                    case 2:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    insertData = _a.sent();
                    console.log("Data inserted");
                    return [2 /*return*/, {
                            createTable: createTable,
                            insertData: insertData
                        }];
            }
        });
    });
}
function seedCharacter(client) {
    return __awaiter(this, void 0, void 0, function () {
        var createTable, insertData;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.query("\n    CREATE TABLE IF NOT EXISTS CHARACTER (\n      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,\n      name VARCHAR(50) NOT NULL UNIQUE,\n      description TEXT,\n      created_at TIMESTAMP NOT NULL DEFAULT NOW(),\n      updated_at TIMESTAMP NOT NULL DEFAULT NOW()\n    );\n  ")];
                case 1:
                    createTable = _a.sent();
                    console.log("Character table created");
                    return [4 /*yield*/, Promise.all(placeholder_data_1.charactersData.map(function (character) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, client.query("\n          INSERT INTO CHARACTER(id, name, description)\n          VALUES ('".concat(character.id, "', '").concat(character.name, "', '").concat(character.description, "')\n        "))];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    insertData = _a.sent();
                    console.log("Data inserted");
                    return [2 /*return*/, {
                            createTable: createTable,
                            insertData: insertData
                        }];
            }
        });
    });
}
function seedVotes(client) {
    return __awaiter(this, void 0, void 0, function () {
        var createTable, insertedData;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.query("\n    CREATE TABLE IF NOT EXISTS VOTES(\n      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,\n      user_id UUID REFERENCES USERS(id) ON DELETE CASCADE ON UPDATE CASCADE,\n      character_id UUID REFERENCES CHARACTER(id) ON DELETE CASCADE ON UPDATE CASCADE,\n      vote_value INT NOT NULL CHECK (vote_value >= 0),\n      created_at TIMESTAMP NOT NULL DEFAULT NOW(),\n      updated_at TIMESTAMP NOT NULL DEFAULT NOW()\n    );\n  ")];
                case 1:
                    createTable = _a.sent();
                    console.log("Votes table created");
                    return [4 /*yield*/, Promise.all(placeholder_data_1.votesData.map(function (vote) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, client.query("\n          INSERT INTO VOTES(id, user_id, character_id, vote_value)\n          VALUES ('".concat(vote.id, "', '").concat(vote.user_id, "', '").concat(vote.character_id, "', '").concat(vote.vote_value, "')\n        "))];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    insertedData = _a.sent();
                    console.log("Data inserted");
                    return [2 /*return*/, {
                            createTable: createTable,
                            insertedData: insertedData
                        }];
            }
        });
    });
}
function seedComments(client) {
    return __awaiter(this, void 0, void 0, function () {
        var createTable, insertedData;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.query("\n    CREATE TABLE IF NOT EXISTS COMMENTS(\n      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,\n      user_id UUID REFERENCES USERS(id) ON DELETE CASCADE ON UPDATE CASCADE,\n      votes_id UUID REFERENCES VOTES(id) ON DELETE CASCADE ON UPDATE CASCADE,\n      comment TEXT NOT NULL,\n      created_at TIMESTAMP NOT NULL DEFAULT NOW(),\n      updated_at TIMESTAMP NOT NULL DEFAULT NOW()\n    );\n  ")];
                case 1:
                    createTable = _a.sent();
                    console.log("Comments table created");
                    return [4 /*yield*/, Promise.all(placeholder_data_1.commentsData.map(function (comment) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, client.query("\n          INSERT INTO COMMENTS(id, user_id, votes_id, comment)\n          VALUES ('".concat(comment.id, "', '").concat(comment.user_id, "', '").concat(comment.votes_id, "', '").concat(comment.comment, "')\n        "))];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    insertedData = _a.sent();
                    console.log("Data inserted");
                    return [2 /*return*/, {
                            createTable: createTable,
                            insertedData: insertedData
                        }];
            }
        });
    });
}
function seedClients(client) {
    return __awaiter(this, void 0, void 0, function () {
        var createTable, insertedData;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.query("\n    CREATE TABLE IF NOT EXISTS CLIENT(\n      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,\n      name VARCHAR(50) NOT NULL,\n      last_name VARCHAR(50) NOT NULL,\n      birth_day DATE NOT NULL,\n      address VARCHAR(50) NOT NULL,\n      user_id UUID REFERENCES USERS(id) ON DELETE CASCADE ON UPDATE CASCADE,\n      created_at TIMESTAMP NOT NULL DEFAULT NOW(),\n      updated_at TIMESTAMP NOT NULL DEFAULT NOW()\n    );\n  ")];
                case 1:
                    createTable = _a.sent();
                    console.log("Client table created");
                    return [4 /*yield*/, Promise.all(placeholder_data_1.clientData.map(function (clientData) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, client.query("\n          INSERT INTO CLIENT(id, name, last_name, birth_day, address, user_id)\n          VALUES ('".concat(clientData.id, "', '").concat(clientData.name, "', '").concat(clientData.last_name, "', '").concat(clientData.birth_day, "', '").concat(clientData.address, "', '").concat(clientData.user_id, "')\n        "))];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    insertedData = _a.sent();
                    console.log("Data inserted");
                    return [2 /*return*/, {
                            createTable: createTable,
                            insertedData: insertedData
                        }];
            }
        });
    });
}
function seedAdmins(client) {
    return __awaiter(this, void 0, void 0, function () {
        var createTable, insertedData;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, client.query("\n    CREATE TABLE IF NOT EXISTS ADMIN(\n      id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,\n      name VARCHAR(50) NOT NULL,\n      last_name VARCHAR(50) NOT NULL,\n      birth_day DATE NOT NULL,\n      address VARCHAR(50) NOT NULL,\n      user_id UUID REFERENCES USERS(id) ON DELETE CASCADE ON UPDATE CASCADE,\n      phone_number VARCHAR(50) NOT NULL,\n      created_at TIMESTAMP NOT NULL DEFAULT NOW(),\n      updated_at TIMESTAMP NOT NULL DEFAULT NOW()\n    );\n  ")];
                case 1:
                    createTable = _a.sent();
                    console.log("Admin table created");
                    return [4 /*yield*/, Promise.all(placeholder_data_1.adminData.map(function (admin) { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, client.query("\n          INSERT INTO ADMIN(id, name, last_name, birth_day, address, user_id, phone_number)\n          VALUES ('".concat(admin.id, "', '").concat(admin.name, "', '").concat(admin.last_name, "', '").concat(admin.birth_day, "', '").concat(admin.address, "', '").concat(admin.user_id, "', '").concat(admin.phone_number, "')\n        "))];
                                    case 1:
                                        _a.sent();
                                        return [2 /*return*/];
                                }
                            });
                        }); }))];
                case 2:
                    insertedData = _a.sent();
                    console.log("Data inserted");
                    return [2 /*return*/, {
                            createTable: createTable,
                            insertedData: insertedData
                        }];
            }
        });
    });
}
function buildSeed() {
    return __awaiter(this, void 0, void 0, function () {
        var client;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    client = new pg_1.Pool({
                        connectionString: "postgresql://postgres:postgres@localhost:5432/votes",
                    });
                    client.on("connect", function () {
                        console.log("Connected to database");
                    });
                    client.on("error", console.error);
                    return [4 /*yield*/, client.query("CREATE EXTENSION IF NOT EXISTS \"uuid-ossp\";")];
                case 1:
                    _a.sent();
                    console.log("uuid-ossp extension created");
                    return [4 /*yield*/, client.query("CREATE TYPE role AS ENUM ('VOTER', 'ADMIN');")];
                case 2:
                    _a.sent();
                    console.log("Roles created");
                    return [4 /*yield*/, seedUser(client)];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, seedCharacter(client)];
                case 4:
                    _a.sent();
                    return [4 /*yield*/, seedVotes(client)];
                case 5:
                    _a.sent();
                    return [4 /*yield*/, seedComments(client)];
                case 6:
                    _a.sent();
                    return [4 /*yield*/, seedClients(client)];
                case 7:
                    _a.sent();
                    return [4 /*yield*/, seedAdmins(client)];
                case 8:
                    _a.sent();
                    return [4 /*yield*/, client.end()];
                case 9:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
buildSeed().then(function () {
    console.log("Seed complete");
    process.exit(0);
}).catch(function (err) {
    console.error(err);
    process.exit(1);
});
