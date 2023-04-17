const express = require("express");
const fs = require("fs");
const axios = require("axios");
const router = express.Router();
const config = require("./config.json");
let DBH = require("./DBH/src/DBH.js")

router.use(express.json());

// FS
console.log("/FS GET", config.api.get.FSPath)
if (config.api.get.FSPath) {
	router.get("/FS", (req, res) => {

		if (!req.query) {
			return res.send({ "error": "EBADPARAMS" })
		}

		fs.readdir("./public" + req.query.dir, (err, result) => {
			let PathData = []

			result.forEach(element => {
				PathData.push({
					dir: (element.includes(".") ?
						`https://api.happy.tatar${req.query.dir}/${element}` :
						`/instruments/FS?dir=${req.query.dir}/${element}`),
					file: element
				})
			});

			res.send(PathData)
		})
	})
} else {
	router.get("/FS", (req, res) => {
		res.send({ "error": "EROUTEISOFF" });
	})
};

// REDIRECTS
console.log("/r/:CUSTOM GET", config.api.redirect.custom)
if (config.api.redirect.custom) {
	router.get("/r/:id", (req, res) => {
		const id = req.params.id;
		DBH.getRedirectUrl({ id: id }).then(RUrl => {
			RUrl.redirected += 1;
			res.redirect(RUrl.url);
		}).catch(e => {
			if (e == "no-redirectUrl") { res.send({ "error": "EWRONGID" }) }
		})
	})
} else {
	router.get("/r/", (req, res) => {
		res.send({ "error": "EROUTEISOFF" })
	})
}

// GET /web/user/jwt

console.log("/web/user/jwt GET", config.api.get.web_user_jwt)
if (config.api.get.web_user_jwt) {
	router.get("/web/user/jwt", (req, res) => {

		if (!req.headers.authorization) {
			return res.send({ "error": "ENOAUTHHEADER" })
		}

		DBH.User.getJWTUser(req.headers.authorization).then(d => {

			DBH.User.login(d).then(x => {
				res.send({ auth: { login: d.login, email: d.email }, jwt: req.headers.authorization })
			}).catch(e => {
				res.send({ "error": e })
			})

		}).catch(e => {
			res.send({ "error": e })
		})

	})
} else {
	router.get("/web/user/jwt", (req, res) => {
		res.send({ "error": "EROUTEISOFF" })
	})
}

// GET /web/user
console.log("/web/user GET", config.api.get.web_user)
if (config.api.get.web_user) {
	router.get("/web/user", (req, res) => {

		if (!req.headers.authorization) {
			return res.send({ "error": "ENOAUTHHEADER" })
		}

		let auth = req.headers.authorization.split(":")

		if (auth.length != 2) {
			return res.send({ "error": "EBADAUTHHEADER" })
		}

		auth[0] = auth[0].replace("Bearer ", "")

		const data = {
			login: auth[0],
			password: auth[1]
		}

		DBH.User.login(data).then(d => {

			DBH.User.postJWTUser(d).then(x => {
				return res.send({ auth: { login: d.login, email: d.email }, jwt: x })
			}).catch(e => {
				return res.send({ "error": e })
			})
		}).catch(e => {
			return res.send({ "error": e })
		})

	})
} else {
	router.get("/web/user", (req, res) => {
		res.send({ "error": "EROUTEISOFF" })
	})
}
// POST /web/user
console.log("/web/user POST", config.api.post.web_user)
if (config.api.post.web_user) {
	router.post("/web/user", (req, res) => {

		if (!req.body) {
			return res.send({ "error": "ENOBODY" })
		}

		DBH.User.register(req.body.data).then(d => {
			return res.send(d)
		}).catch(e => {
			return res.send({ "error": e })
		})
	})
} else {
	router.post("/web/user", (req, res) => {
		res.send({ "error": "EROUTEISOFF" })
	})
}

// PUT /web/user/jwt
console.log("/web/user/jwt PUT", config.api.put.web_user_jwt)
if (config.api.put.web_user_jwt) {
	router.put("/web/user/jwt", (req, res) => {

		if (!req.body) {
			return res.send({ "error": "ENOBODY" })
		}

		DBH.User.getJWTUser(req.body.jwt).then(data => {

			let z = {
				put: {
					login: req.body.put.login || data.login,
					email: req.body.put.email || data.email,
					password: req.body.put.password || data.password
				},
				data: data
			}

			DBH.User.putUser(z).then(d => {

				DBH.User.postJWTUser(d).then(jwt => {

					return res.send({
						jwt: jwt,
						auth: { login: d.login, email: d.email }
					})
				}).catch(e => {
					return res.send({ "error": e })
				})

			}).catch(e => {
				return res.send({ "error": e })
			})


		}).catch(e => {
			return res.send({ "error": e })
		})

	})
} else {
	router.put("/web/user", (req, res) => {
		res.send({ "error": "EROUTEISOFF" })
	})
}

// DELETE /web/user
console.log("/web/user DELETE", config.api.delete.web_user)
if (config.api.delete.web_user) {
	router.delete("/web/user", (req, res) => {

		if (!req.body) {
			return res.send({ "error": "ENOBODY" })
		}

		DBH.User.deleteUser(req.body.data).then(d => {
			return res.send(d)
		}).catch(e => {
			return res.send({ "error": e })
		})

	})
} else {
	router.delete("/web/user", (req, res) => {
		res.send({ "error": "EROUTEISOFF" })
	})
}

// POST /web/post
console.log("/web/post POST", config.api.post.web_post)
if (config.api.post.web_post) {
	router.post("/web/post", (req, res) => {

		/*
			req.body: {
				thread: String
				auth: User model JWT
				data: Post model Object
			}
		*/

		console.log(req.body)

		if (!req.body) {
			return res.send({ "error": "ENOBODY" })
		}

		let threadPath = ""
		if (!DBH[req.body.thread + "_Posts"]) {
			return res.send({ "error": "ENOTHREAD"})
		} else {
			threadPath = DBH[req.body.thread + "_Posts"]
		}

		DBH.User.authJWT(req.body.auth).then(User => {

			req.body.data.authorId = User._id
			req.body.data.createdAt = new Date().toISOString()

			threadPath.createPost(req.body.data).then(Post => {

				DBH.User.getById(Post.authorId).then(Author => {

					let post = {
						header: Post.header,
						text: Post.text,
						author: {
							login: Author.login,
							_id: Author._id
						},
						_id: Post._id
					}

					return res.send(post)

				}).catch(e => {
					return res.send({ "error": e })
				})

			}).catch(e => {
				return res.send({ "error": e })
			})

		}).catch(e => {
			return res.send({ "error": e })
		})

	})
} else {
	router.post("/web/post", (req, res) => {
		res.send({ "error": "EROUTEISOFF" })
	})
}

// GET /web/posts
console.log("/web/posts GET", config.api.get.web_posts)
if (config.api.get.web_posts) {
	router.get("/web/posts", (req, res) => {

		/*
			req.query: {
				thread: String
				getLast: Boolean
				from: Number
				to: Number
			}
		*/

		if (!req.query) {
			return res.send({ "error": "EBADQUERY" })
		}

		if (!req.query.thread && !req.query.getLast && !(req.query.from || req.query.to)) {
			return res.send({ "error": "EWRONGQUERY" })
		}

		let threadPath = ""
		if (!DBH[req.query.thread + "_Posts"]) {
			return res.send({ "error": "ENOTHREAD"})
		} else {
			threadPath = DBH[req.query.thread + "_Posts"]
		}

		if (req.query.getLast) {

			threadPath.$model.find().sort("createdAt").limit(20).exec().then(async posts => {

				let temp = []

				await Promise.all(posts.map(async post => {

					let t = {
						header: post.header,
						text: post.text,
						_id: post._id
					}

					await DBH.User.getById(post.authorId).then(Author => {

						delete t.authorId
						t.author = {
							login: Author.login,
							_id: Author._id
						}

						temp.unshift(t)

					}).catch(e => {
						return res.send({ "error": e })
					})

				}))

				return res.send(temp)
			})

		} else {

		}

	})
} else {
	router.get("/web/posts", (req, res) => {
		res.send({ "error": "EROUTEISOFF" })
	})
}

module.exports = { router, DBH }