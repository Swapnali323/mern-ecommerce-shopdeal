const router = require('express').Router()
const productCtrl = require('../controllers/productCtrl') 
const auth = require('../middleware/auth')
const authAdmin = require('../middleware/authAdmin')

/**
 * @swagger
 * /api/products:
 *  get:
 *    tags: 
 *          - Products 
 *    description: To get all the products
 *    responses:
 *      '200':
 *        description: A successful response
 */
router.route('/products')
    .get(productCtrl.getProducts)

/**
* @swagger
* /api/products:
*  post:
*    tags: 
*       - Products 
*    security:
*       - Bearer: []
*    description: put by id with req body
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
*                      product_id:
*                         type: string
*                      price:
*                         type: number
*                      title:
*                         type: string
*                      content:
*                          type: string
*                      images:
*                          type: object
*                      description:
*                          type: string
*                      category:
*                          type: string
*    responses:
*        '200':
*                 description: A successful response
*/
router.route('/products').post(auth, authAdmin, productCtrl.createProduct)

/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *    tags: 
 *          - Products 
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
 */
router.route('/products/:id').delete(auth, authAdmin, productCtrl.deleteProduct)

/**
* @swagger
* /api/products/{id}:
*  put:
*    tags: 
*          - Products 
*    description: update by id 
*    parameters: 
*          - name: authorization
*            in: header
*            type: string
*            required: true
*          - name: id
*            description: path
*            in: path
*            required: true
*          - name: reqBody
*            description: request body
*            in: body
*            schema:
*                   type: object
*                   properties:
*                      product_id:
*                         type: string
*                      price:
*                         type: number
*                      title:
*                         type: string
*                      content:
*                          type: string
*                      images:
*                          type: object
*                      description:
*                          type: string
*                      category:
*                          type: string
*    responses:
*        '200':
*            description: A successful response
*/
router.route('/products/:id').put(auth, authAdmin, productCtrl.updateProduct)


module.exports = router