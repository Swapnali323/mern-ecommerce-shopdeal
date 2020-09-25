const router = require('express').Router()
const userCtrl = require('../controllers/userCtrl')
const auth = require('../middleware/auth')

/**
* @swagger
* /user/register:
*  post:
*    tags: 
*          - Auth 
*    description: sign up 
*    parameters:
*             - name: reqBody
*               description: request body
*               in: body
*               schema:
*                   type: object
*                   properties:
*                      email:
*                         type: string
*                      password:
*                         type: string
*                      name:
*                         type: string
*                      role:
*                         type: number
*    components:
*     securitySchemes: 
*          bearerAuth:
*            type:http
*            scheme:bearer
*            bearerFormat:JWT
*    security:
*      -bearerAuth: []
*    responses:
*        '200':
*                 description: A successful response
*/
router.post('/register', userCtrl.register)

/**
* @swagger
* /user/login:
*  post:
*    tags: 
*          - Auth 
*    description: sign in 
*    parameters:
*             - name: reqBody
*               description: request body
*               in: body
*               schema:
*                   type: object
*                   properties:
*                      email:
*                         type: string
*                      password:
*                         type: string
*    components:
*     securitySchemes: 
*          bearerAuth:
*            type:http
*            scheme:bearer
*            bearerFormat:JWT
*    security:
*      -bearerAuth: []
*    responses:
*        '200':
*                 description: A successful response
*/
router.post('/login', userCtrl.login)

router.post('/logout', userCtrl.logout)

router.post('/refresh_token', userCtrl.refreshToken)

router.get('/infor',auth, userCtrl.getUser)

router.patch('/addcart', auth, userCtrl.addCart)

router.post('/google_signin',userCtrl.googleOAuth)
/**
 * @swagger
 * /user/history:
 *  get:
 *    tags: 
 *          - Auth 
 *    description: To get the history
 *    parameters:
 *          - name: authorization
 *            in: header
 *            type: string
 *            required: true
 *    responses:
 *        '200':
 *            description: A successful response
 *        '404':
 *            description: Unauthorized
 */
router.get('/history', auth, userCtrl.history)

router.get('/createadmin', userCtrl.createadmin)

module.exports = router