const router = require('express').Router()
const categoryCtrl = require('../controllers/categoryCtrl') 
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

/**
 * @swagger
 * /api/category:
 *  get:
 *    tags: 
 *          - Category 
 *    security:
 *          - Bearer: []
 *    description: To get all the categories
 *    parameters:
 *             - name: authorization
 *               in: header
 *               type: string
 *               required: true
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.route('/category').get(categoryCtrl.getCategories)

/**
* @swagger
* /api/category:
*  post:
*    tags: 
*       - Category 
*    security:
*       - Bearer: []
*    description: create a category
*    parameters:
*             - name: authorization
*               in: header
*               type: string
*               required: true
*             - name: reqBody
*               description: request body
*               in: body
*               schema:
*                   type: object
*                   properties:
*                      name:
*                         type: string
*    responses:
*        '200':
*                 description: A successful response
*        '404':
*                 description: Bad Request
*/
router.route('/category').post(auth, authAdmin, categoryCtrl.createCategory)

/**
 * @swagger
 * /api/category/{id}:
 *  delete:
 *    tags: 
 *          - Category 
 *    description: delete by id 
 *    parameters: 
 *          - name: authorization
 *            in: header
 *            type: string
 *            required: true
 *          - name: id
 *            description: path
 *            in: path
 *            required: true
 *    responses:
 *        '200':
 *            description: A successful response
 *        '404':
 *             description: Bad Request
 */
router.route('/category/:id').delete(auth, authAdmin, categoryCtrl.deleteCategory)

/**
* @swagger
* /api/category:
*  put:
*    tags: 
*          - Category 
*    description: update the category
*    parameters: 
*          - name: authorization
*            in: header
*            type: string
*            required: true
*          - name: reqBody
*            description: request body
*            in: body
*            schema:
*                   type: object
*                   properties:
*                      name:
*                         type: string
*    responses:
*        '200':
*            description: A successful response
*/
router.route('/category').put(auth, authAdmin, categoryCtrl.updateCategory)

module.exports = router