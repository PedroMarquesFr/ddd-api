import { app, sequelize } from "../express";
import request from "supertest";

describe("E2E test for product", () => {
  beforeEach(async () => {
    await sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await sequelize.close();
  });

  it("should create a product", async () => {
    const response = await request(app)
      .post("/product")
      .send({ name: "glass", price: 20 });
    expect(response.status).toBe(201);
    console.log(response.body);
    expect(response.body.name).toBe("glass");
    expect(response.body.price).toBe(20);
  });

  it("should list all products", async () => {
    const responseFirstProduct = await request(app)
      .post("/product")
      .send({ name: "glass", price: 20 });
    expect(responseFirstProduct.status).toBe(201);
    const responseSecondProduct = await request(app)
      .post("/product")
      .send({ name: "glass2", price: 22 });
    expect(responseSecondProduct.status).toBe(201);

    const listResponse = await request(app).get("/product").send();
    expect(listResponse.status).toBe(200);
    expect(listResponse.body.products.length).toBe(2);

    const listResponseXML = await request(app)
      .get("/product")
      .set("Accept", "application/xml")
      .send();
    expect(listResponseXML.text).toContain(
      `<?xml version="1.0" encoding="UTF-8"?>`
    );
    expect(listResponseXML.text).toContain(`<products>`);
    expect(listResponseXML.text).toContain(`<product>`);
    expect(listResponseXML.text).toContain(`<name>glass</name>`);
    expect(listResponseXML.text).toContain(`<price>20</price>`);
    expect(listResponseXML.text).toContain(`<name>glass2</name>`);
    expect(listResponseXML.text).toContain(`<price>22</price>`);
  });
});
