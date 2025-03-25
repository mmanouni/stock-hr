# Test Backend API

## Steps to Test Using curl

1. **Get All Items**
   ```sh
   curl -X GET http://localhost:3000/api/items
   ```

2. **Get Item by ID**
   ```sh
   curl -X GET http://localhost:3000/api/items/{id}
   ```

3. **Create New Item**
   ```sh
   curl -X POST http://localhost:3000/api/items -H "Content-Type: application/json" -d '{"name": "NewItem", "price": 100}'
   ```

4. **Update Item**
   ```sh
   curl -X PUT http://localhost:3000/api/items/{id} -H "Content-Type: application/json" -d '{"name": "UpdatedItem", "price": 150}'
   ```

5. **Delete Item**
   ```sh
   curl -X DELETE http://localhost:3000/api/items/{id}
   ```

## Steps to Test Using Postman

1. **Get All Items**
   - Method: GET
   - URL: `http://localhost:3000/api/items`

2. **Get Item by ID**
   - Method: GET
   - URL: `http://localhost:3000/api/items/{id}`

3. **Create New Item**
   - Method: POST
   - URL: `http://localhost:3000/api/items`
   - Body: `{"name": "NewItem", "price": 100}`

4. **Update Item**
   - Method: PUT
   - URL: `http://localhost:3000/api/items/{id}`
   - Body: `{"name": "UpdatedItem", "price": 150}`

5. **Delete Item**
   - Method: DELETE
   - URL: `http://localhost:3000/api/items/{id}`
