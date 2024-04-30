const request = require("supertest");
const server = require("../index");  // Importas el servidor de Express directamente

describe("Operaciones CRUD de cafes", () => {

    test('GET /cafes should return status code 200 and an array of objects', async () => {
        const response = await request(server).get('/cafes');  // Usar el servidor directamente
        expect(response.statusCode).toBe(200);
        expect(Array.isArray(response.body)).toBeTruthy();
        expect(response.body.length).toBeGreaterThan(0);
    });

    test('DELETE /cafes/:id with non-existing ID should return 404', async () => {
        const response = await request(server)
            .delete('/cafes/999')  // Asumiendo que 999 es un ID que no existe
            .set('Authorization', 'Bearer token_ficticio');  // Añadir un token ficticio
        expect(response.statusCode).toBe(404);
    });

    test('POST /cafes should add a new café and return status code 201', async () => {
        const newCafe = {
            name: "Nuevo Café",
            address: "123 Calle Principal"
        };
        const response = await request(server).post('/cafes').send(newCafe); // Usar el servidor directamente
        expect(response.statusCode).toBe(201);
    });

    test('PUT /cafes with mismatched ID in the URL and body should return 400', async () => {
        const updateData = {
            id: 1,  // Asegúrate de que este ID exista en la base de datos para el test
            name: "Café Actualizado"
        };
        const response = await request(server).put('/cafes/2').send(updateData); // Usar el servidor directamente
        expect(response.statusCode).toBe(400);
    });

});
