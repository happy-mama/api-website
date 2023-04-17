// MAIN generator config file

const props = {
    users: {
        name: "User",
        cache: {
            use: true,
            identification: "_id",
            time: 1000 * 60 * 5,
            log: false
        },
        JWT: {
            use: true,
            string: "FAY1PgHoitbaMzYdIECt1odR",
            time: 1000 * 60 * 24 * 7
        },
        DB: {
            name: "Users",
            schema: {
                data: {
                    login: "string",
                    email: "string",
                    password: "string"
                },
                params: {
                    versionKey: false
                }
            }
        },
        format: [
            {
                name: "checkUserAll",
                type: "check",
                params: {}
            }, {
                name: "checkUserLorPE",
                type: "check",
                params: {
                    rules: ["login|email", "password"]
                }
            }, {
                name: "login",
                type: "get",
                params: {
                    checkMethod: "checkUserLorPE",
                    cacheMethod: "cacheUser",
                    mainMethod: "findUser",
                }
            }, {
                name: "auth",
                type: "get",
                params: {
                    cacheMethod: "cacheUser",
                    mainMethod: "findUser"
                }
            }, {
                name: "authJWT",
                type: "inJWT",
                params: {
                    mainMethod: "auth",
                    getJWTMethod: "getJWTUser"
                }
            }, {
                name: "register",
                type: "post",
                params: {
                    checkMethod: "checkUserLorPE",
                    cacheMethod: "cacheUser"
                }
            }, {
                name: "cacheUser",
                type: "cache",
                params: {}
            }, {
                name: "findUser",
                type: "find",
                params: {}
            },{
                name: "deleteUser",
                type: "delete",
                params: {
                    checkMethod: "checkUserAll",
                    mainMethod: "findUser"
                }
            }, {
                name: "postJWTUser",
                type: "postJWT",
                params: {
                    cacheMethod: "cacheUser"
                }
            }, {
                name: "getJWTUser",
                type: "getJWT",
                params: {
                    cacheMethod: "cacheUser"
                }
            }, {
                name: "putUser",
                type: "put",
                params: {
                    checkMethod: "checkUserLorPE",
                    mainMethod: "findUser",
                    checkEquals: ["login", "email"]
                }
            }, {
                name: "getById",
                type: "getById",
                params: {}
            }
        ]
    },
    posts_main: {
        name: "main_Posts",
        cache: {
            use: true,
            identification: "_id",
            time: 1000 * 60 * 5,
            log: false
        },
        JWT: {
            use: true,
            string: "FAY1PgHoitbaFzYdIECt1odR",
            time: 1000 * 60 * 24 * 7
        },
        DB: {
            name: "main_Posts",
            schema: {
                data: {
                    createdAt: "string",
                    header: "string",
                    text: "string",
                    authorId: "string"
                },
                params: {
                    versionKey: false
                }
            }
        },
        format: [
            {
                name: "checkPostAll",
                type: "check",
                params: {}
            }, {
                name: "cachePost",
                type: "cache",
                params: {}
            }, {
                name: "createPost",
                type: "post",
                params: {
                    cacheMethod: "cachePost"
                }
            }, {
                name: "getById",
                type: "getById",
                params: {}
            }
        ]
    },
    posts_test: {
        name: "test_Posts",
        cache: {
            use: true,
            identification: "_id",
            time: 1000 * 60 * 5,
            log: false
        },
        JWT: {
            use: true,
            string: "FAY1PgHoitbaFzYdIECt1odR",
            time: 1000 * 60 * 24 * 7
        },
        DB: {
            name: "test_Posts",
            schema: {
                data: {
                    createdAt: "string",
                    header: "string",
                    text: "string",
                    authorId: "string"
                },
                params: {
                    versionKey: false
                }
            }
        },
        format: [
            {
                name: "checkPostAll",
                type: "check",
                params: {}
            }, {
                name: "cachePost",
                type: "cache",
                params: {}
            }, {
                name: "createPost",
                type: "post",
                params: {
                    cacheMethod: "cachePost"
                }
            }, {
                name: "getById",
                type: "getById",
                params: {}
            }
        ]
    }
}

module.exports = { props }