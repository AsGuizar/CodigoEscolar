// api.test.js

const request = require('supertest');
const app = require('./app.js'); // Adjust the path as needed

describe('API Endpoints', () => {
  let server;
  let token;

  beforeAll(async () => {
    server = await app.listen(process.env.APP_PORT || 8081); // Start the server
    // Perform any setup tasks, such as logging in and obtaining a JWT token
    // For example, you can use supertest to authenticate and get the token
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        username: 'example_user',
        password: 'example_password'
      });
    token = response.body.accessToken; // Assuming the token is returned in the response
  });

  afterAll(async () => {
    await server.close(); // Close the server
  });

  // Test case for creating a new product
  test('POST /api/products should create a new product', async () => {
    const newProduct = {
      name: 'Test Product',
      price: 10.99,
      quantity: 50
    };

    const response = await request(app)
      .post('/api/products')
      .set('Authorization', `Bearer ${token}`) // Include the JWT token in the request headers
      .send(newProduct);

    expect(response.status).toBe(201); // Assuming 201 is the status code for successful creation
    expect(response.body).toHaveProperty('id');
  });

  // Test case for updating product quantity
  test('PUT /api/products/:id should update product quantity', async () => {
    const productId = 1; // Assuming product ID 1 exists in your database
    const updatedQuantity = {
      quantity: 100
    };

    const response = await request(app)
      .put(`/api/products/${productId}`)
      .set('Authorization', `Bearer ${token}`) // Include the JWT token in the request headers
      .send(updatedQuantity);

    expect(response.status).toBe(200); // Assuming 200 is the status code for successful update
    expect(response.body).toHaveProperty('message', 'Product quantity updated successfully');
  });

  // Test case for getting all products
  test('GET /api/products should return all products', async () => {
    const response = await request(app)
      .get('/api/products')
      .set('Authorization', `Bearer ${token}`); // Include the JWT token in the request headers

    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  // Add more test cases for other endpoints as needed
});
