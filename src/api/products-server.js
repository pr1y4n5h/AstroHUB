import { createServer, Model, RestSerializer } from "miragejs";
import faker from "faker";

faker.seed(127);

export default function setupMockServer() {
  createServer({
    serializers: {
      application: RestSerializer
    },

    models: {
      product: Model
    },

    routes() {
      this.namespace = "api";
      // this.timing = 5000;
      this.resource("products");
    },

    seeds(server) {
      [...Array(50)].forEach((_) => {
        server.create("product", {
          id: faker.random.uuid(),
          qty: 1,
          name: faker.commerce.productName(),
          image: faker.random.image(),
          price: faker.commerce.price(),
          material: faker.commerce.productMaterial(),
          brand: faker.lorem.word(),
          inStock: faker.random.boolean(),
          fastDelivery: faker.random.boolean(),
          ratings: faker.random.arrayElement([1, 2, 3, 4, 5]),
          offer: faker.random.arrayElement([
            "Flat 50% off",
            "Save upto 70%",
            "Republic Day Sale"
          ]),
          idealFor: faker.random.arrayElement([
            "Men",
            "Women",
            "Girl",
            "Boy",
            "Senior"
          ]),
          level: faker.random.arrayElement([
            "beginner",
            "amateur",
            "intermediate",
            "advanced",
            "professional"
          ]),
          color: faker.commerce.color()
        });
      });
    }
  });
}
