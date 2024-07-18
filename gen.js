// MAIN generator config file

const props = {
  users: {
    name: "User",
    cache: {
      use: true,
      identification: "_id",
      time: 1000 * 60 * 5,
      log: false,
    },
    JWT: {
      use: true,
      string: "FAY1PgHoitbaMzYdIECt1odR",
      time: 1000 * 60 * 24 * 7,
    },
    DB: {
      name: "Users",
      schema: {
        data: {
          login: "string",
          email: "string",
          password: "string",
        },
        params: {
          versionKey: false,
        },
      },
    },
    format: {
      checkUserAll: {
        type: "check",
        params: {},
        errors: {
          q: "E_UserQ",
          // TYPEOF_RULE: "E_UserTRE",
          // RULE: "E_UserRE",
        },
      },
      checkUserLorEP: {
        type: "check",
        params: {
          rules: ["login|email", "password"],
        },
        errors: {
          q: "E_UserQ",
          // TYPEOF_RULE: "E_UserTRE",
          // RULE: "E_UserRE",
        },
      },
      login: {
        type: "get",
        params: {
          checkMethod: "checkUserLorEP",
          cacheMethod: "cacheUser",
          mainMethod: "findUser",
        },
      },
      auth: {
        type: "get",
        params: {
          cacheMethod: "cacheUser",
          mainMethod: "findUser",
        },
      },
      authJWT: {
        type: "inJWT",
        params: {
          mainMethod: "auth",
          getJWTMethod: "getJWTUser",
        },
      },
      register: {
        type: "post",
        params: {
          checkEquals: ["login"],
          checkMethod: "checkUserLorEP",
          cacheMethod: "cacheUser",
          disableCopies: true,
        },
        errors: {
          disableCopies: "E_UserDC",
          checkEquals: "E_UserCE:%equal%",
        },
      },
      cacheUser: {
        type: "cache",
        params: {},
        errors: {
          main: "E_UserNull",
        },
      },
      findUser: {
        type: "find",
        params: {},
        errors: {
          main: "E_UserNF",
        },
      },
      deleteUser: {
        type: "delete",
        params: {
          checkMethod: "checkUserAll",
          mainMethod: "findUser",
        },
      },
      postJWTUser: {
        type: "postJWT",
        params: {
          cacheMethod: "cacheUser",
        },
      },
      getJWTUser: {
        type: "getJWT",
        params: {
          cacheMethod: "cacheUser",
        },
        errors: {
          q: "E_q",
          JWTstring: "E_UserJWTINAS",
          JWTerror: "E_UserJWTE",
        },
      },
      putUser: {
        type: "put",
        params: {
          checkMethod: "checkUserLorEP",
          mainMethod: "findUser",
          checkEquals: ["login", "email"],
        },
        errors: {
          main: "E_UserPB",
          q: "E_q",
          checkEquals: "E_UserCE:%equal%",
        },
      },
      getById: {
        type: "getById",
        params: {},
        errors: {
          q: "E_q",
          main: "E_UserNF",
        },
      },
    },
  },
  redirectURL: {
    name: "RedirectURL",
    cache: {
      use: true,
      identification: "_id",
      time: 1000 * 60 * 5,
      log: false,
    },
    DB: {
      name: "RedirectURL",
      schema: {
        data: {
          key: "string",
          url: "string",
          redirected: "number",
        },
        params: {
          versionKey: false,
        },
      },
    },
    format: {
      cache: {
        type: "cache",
        params: {},
        errors: {
          main: "E_RedirectURLNull",
        },
      },
      get: {
        type: "get",
        params: {
          cacheMethod: "cache",
          mainMethod: "find",
        },
      },
      find: {
        type: "find",
        params: {},
        errors: {
          main: "E_RedirectURLNF",
        },
      },
    },
  },
};

// const props = {
//     users: {
//         name: "User",
//         cache: {
//             use: true,
//             identification: "_id",
//             time: 1000 * 60 * 5,
//             log: false
//         },
//         JWT: {
//             use: true,
//             string: "FAY1PgHoitbaMzYdIECt1odR",
//             time: 1000 * 60 * 24 * 7
//         },
//         DB: {
//             name: "Users",
//             schema: {
//                 data: {
//                     login: "string",
//                     email: "string",
//                     password: "string"
//                 },
//                 params: {
//                     versionKey: false
//                 }
//             }
//         },
//         format: {
//             checkUserAll: {
//                 type: "check",
//                 params: {},
//                 errors: {
//                     q: "E_UserQ",
//                     TYPEOF_RULE: "E_UserTRE",
//                     RULE: "E_UserRE"
//                 }
//             },
//             checkUserLorEP: {
//                 type: "check",
//                 params: {
//                     rules: ["login|email", "password"]
//                 }, errors: {
//                     q: "E_UserQ",
//                     TYPEOF_RULE: "E_UserTRE",
//                     RULE: "E_UserRE"
//                 }
//             },
//             login: {
//                 type: "get",
//                 params: {
//                     checkMethod: "checkUserLorEP",
//                     cacheMethod: "cacheUser",
//                     mainMethod: "findUser",
//                 }
//             },
//             auth: {
//                 type: "get",
//                 params: {
//                     cacheMethod: "cacheUser",
//                     mainMethod: "findUser"
//                 }
//             },
//             authJWT: {
//                 type: "inJWT",
//                 params: {
//                     mainMethod: "auth",
//                     getJWTMethod: "getJWTUser"
//                 }
//             },
//             register: {
//                 type: "post",
//                 params: {
//                     checkEquals: ["login"],
//                     checkMethod: "checkUserLorEP",
//                     cacheMethod: "cacheUser",
//                     disableCopies: true
//                 },
//                 errors: {
//                     disableCopies: "E_UserDC",
//                     checkEquals: "E_UserCE:%equal%"
//                 }
//             },
//             cacheUser: {
//                 type: "cache",
//                 params: {},
//                 errors: {
//                     main: "E_UserNull"
//                 }
//             },
//             findUser: {
//                 type: "find",
//                 params: {},
//                 errors: {
//                     main: "E_UserNF"
//                 }
//             },
//             deleteUser: {
//                 type: "delete",
//                 params: {
//                     checkMethod: "checkUserAll",
//                     mainMethod: "findUser"
//                 }
//             },
//             postJWTUser: {
//                 type: "postJWT",
//                 params: {
//                     cacheMethod: "cacheUser"
//                 }
//             },
//             getJWTUser: {
//                 type: "getJWT",
//                 params: {
//                     cacheMethod: "cacheUser"
//                 },
//                 errors: {
//                     q: "E_q",
//                     JWTstring: "E_UserJWTINAS",
//                     JWTerror: "E_UserJWTE"
//                 }
//             },
//             putUser: {
//                 type: "put",
//                 params: {
//                     checkMethod: "checkUserLorEP",
//                     mainMethod: "findUser",
//                     checkEquals: ["login", "email"]
//                 },
//                 errors: {
//                     main: "E_UserPB",
//                     q: "E_q",
//                     checkEquals: "E_UserCE:%equal%"
//                 }
//             },
//             getById: {
//                 type: "getById",
//                 params: {},
//                 errors: {
//                     q: "E_q",
//                     main: "E_UserNF"
//                 }
//             }
//         }
//     },
//     commentsLikes: {
//         name: "commentsLikes",
//         cache: {
//             use: true,
//             identification: "_id",
//             time: 1000 * 60 * 5,
//             log: false
//         },
//         JWT: {
//             use: true,
//             string: "FAY1PgHoitbaFzYdIECt1odR",
//             time: 1000 * 60 * 24 * 7
//         },
//         DB: {
//             name: "CommentsLikes",
//             schema: {
//                 data: {
//                     commentId: "string",
//                     authorId: "string"
//                 },
//                 params: {
//                     versionKey: false
//                 }
//             }
//         },
//         format: {
//             checkAll: {
//                 type: "check",
//                 params: {}
//             },
//             cache: {
//                 type: "cache",
//                 params: {}
//             },
//             create: {
//                 type: "post",
//                 params: {
//                     cacheMethod: "cache"
//                 }
//             },
//             getById: {
//                 type: "getById",
//                 params: {}
//             }
//         }
//     },
//     postsLikes: {
//         name: "PostsLikes",
//         cache: {
//             use: true,
//             identification: "_id",
//             time: 1000 * 60 * 5,
//             log: false
//         },
//         JWT: {
//             use: true,
//             string: "FAY1PgHoitbaFzYdIECt1odR",
//             time: 1000 * 60 * 24 * 7
//         },
//         DB: {
//             name: "PostsLikes",
//             schema: {
//                 data: {
//                     postId: "string",
//                     authorId: "string"
//                 },
//                 params: {
//                     versionKey: false
//                 }
//             }
//         },
//         format: {
//             checkAll: {
//                 type: "check",
//                 params: {}
//             },
//             cache: {
//                 type: "cache",
//                 params: {}
//             },
//             create: {
//                 type: "post",
//                 params: {
//                     cacheMethod: "cache",
//                     checkMethod: "checkAll",
//                     disableCopies: true
//                 }
//             },
//             get: {
//                 type: "get",
//                 params: {
//                     cacheMethod: "cache",
//                     mainMethod: "find"
//                 }
//             },
//             find: {
//                 type: "find",
//                 params: {}
//             },
//             getById: {
//                 type: "getById",
//                 params: {}
//             }
//         }
//     },
//     postsComments: {
//         name: "postsComments",
//         cache: {
//             use: true,
//             identification: "_id",
//             time: 1000 * 60 * 5,
//             log: false
//         },
//         JWT: {
//             use: true,
//             string: "FAY1PgHoitbaFzYdIECt1odR",
//             time: 1000 * 60 * 24 * 7
//         },
//         DB: {
//             name: "PostsComments",
//             schema: {
//                 data: {
//                     postId: "string",
//                     likes: "string",
//                     text: "string",
//                     authorId: "string"
//                 },
//                 params: {
//                     versionKey: false
//                 }
//             }
//         },
//         format: {
//             checkAll: {
//                 type: "check",
//                 params: {}
//             },
//             cache: {
//                 type: "cache",
//                 params: {}
//             },
//             create: {
//                 type: "post",
//                 params: {
//                     cacheMethod: "cache"
//                 }
//             },
//             getById: {
//                 type: "getById",
//                 params: {}
//             }
//         }
//     },
//     posts_main: {
//         name: "main_Posts",
//         cache: {
//             use: true,
//             identification: "_id",
//             time: 1000 * 60 * 5,
//             log: false
//         },
//         JWT: {
//             use: true,
//             string: "FAY1PgHoitbaFzYdIECt1odR",
//             time: 1000 * 60 * 24 * 7
//         },
//         DB: {
//             name: "main_Posts",
//             schema: {
//                 data: {
//                     createdAt: "string",
//                     header: "string",
//                     text: "string",
//                     comments: "number",
//                     likes: "number",
//                     authorId: "string"
//                 },
//                 params: {
//                     versionKey: false
//                 }
//             }
//         },
//         format: {
//             checkPostAll: {
//                 type: "check",
//                 params: {}
//             },
//             cachePost: {
//                 type: "cache",
//                 params: {}
//             },
//             createPost: {
//                 type: "post",
//                 params: {
//                     cacheMethod: "cachePost"
//                 }
//             },
//             getById: {
//                 type: "getById",
//                 params: {}
//             }
//         }
//     },
//     posts_test: {
//         name: "test_Posts",
//         cache: {
//             use: true,
//             identification: "_id",
//             time: 1000 * 60 * 5,
//             log: false
//         },
//         JWT: {
//             use: true,
//             string: "FAY1PgHoitbaFzYdIECt1odR",
//             time: 1000 * 60 * 24 * 7
//         },
//         DB: {
//             name: "test_Posts",
//             schema: {
//                 data: {
//                     createdAt: "string",
//                     header: "string",
//                     text: "string",
//                     comments: "number",
//                     likes: "number",
//                     authorId: "string"
//                 },
//                 params: {
//                     versionKey: false
//                 }
//             }
//         },
//         format: {
//             checkPostAll: {
//                 type: "check",
//                 params: {}
//             },
//             cachePost: {
//                 type: "cache",
//                 params: {}
//             },
//             createPost: {
//                 type: "post",
//                 params: {
//                     cacheMethod: "cachePost"
//                 }
//             },
//             getById: {
//                 type: "getById",
//                 params: {}
//             }
//         }
//     }
// }

module.exports = props;
