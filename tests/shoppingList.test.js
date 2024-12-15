const request = require("supertest");
const mongoose = require("mongoose");
const app = require("../app"); // Replace with your app entry point
const ShoppingList = require("../models/ShoppingList");

// Mock the ShoppingList model
jest.mock("../models/ShoppingList");

describe("Shopping List Endpoints", () => {
  let token = "mockedAuthToken"; // Replace with a real token if necessary

  beforeAll(() => {
    // Connect to the test DB (optional for integration tests)
    mongoose.connect = jest.fn();
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  describe("POST /shoppingList/create", () => {
    it("should create a new shopping list (Happy Path)", async () => {
      const mockShoppingList = {
        name: "Test List",
        state: "active",
        owner: "mockUserId",
        memberList: [],
        itemList: [{ name: "Item1", isDone: false }],
        isDone: false,
        isArchived: false,
      };

      // Mock ShoppingList.create
      ShoppingList.create.mockResolvedValue(mockShoppingList);

      const response = await request(app)
        .post("/shoppingList/create")
        .set("Authorization", `Bearer ${token}`)
        .send({
          name: "Test List",
          owner: "mockUserId",
          memberList: [],
          itemList: [{ name: "Item1" }],
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Shopping list created successfully");
      expect(response.body.data).toMatchObject(mockShoppingList);
    });

    it("should return 400 when required fields are missing", async () => {
      const response = await request(app)
        .post("/shoppingList/create")
        .set("Authorization", `Bearer ${token}`)
        .send({});

      expect(response.status).toBe(400);
    });
  });

  describe("GET /shoppingList/list", () => {
    it("should return all shopping lists for a user", async () => {
      const mockShoppingLists = [
        { name: "List 1", owner: "mockUserId" },
        { name: "List 2", owner: "mockUserId" },
      ];

      ShoppingList.find.mockResolvedValue(mockShoppingLists);

      const response = await request(app)
        .get("/shoppingList/list")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Shopping list fetched successfully.");
      expect(response.body.fetchedLists).toHaveLength(2);
    });

    it("should return 404 if no lists are found", async () => {
      ShoppingList.find.mockResolvedValue([]);

      const response = await request(app)
        .get("/shoppingList/list")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
    });
  });

  describe("GET /shoppingList/:id", () => {
    it("should return a single shopping list", async () => {
      const mockShoppingList = { name: "List 1", _id: "mockListId" };

      ShoppingList.findById.mockResolvedValue(mockShoppingList);

      const response = await request(app)
        .get("/shoppingList/mockListId")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(201);
      expect(response.body.message).toBe("Shopping list fetched successfully");
      expect(response.body.fetchedDocument).toMatchObject(mockShoppingList);
    });

    it("should return 404 if the shopping list is not found", async () => {
      ShoppingList.findById.mockResolvedValue(null);

      const response = await request(app)
        .get("/shoppingList/mockListId")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("Shopping list not found");
    });
  });

  describe("PUT /shoppingList/:id", () => {
    it("should update an existing shopping list", async () => {
      const mockUpdatedList = { name: "Updated List", _id: "mockListId" };

      ShoppingList.findOneAndUpdate.mockResolvedValue(mockUpdatedList);

      const response = await request(app)
        .put("/shoppingList/mockListId")
        .set("Authorization", `Bearer ${token}`)
        .send({ name: "Updated List" });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Shopping list updated successfully.");
      expect(response.body.updatedDocument).toMatchObject(mockUpdatedList);
    });
  });

  describe("DELETE /shoppingList/:id", () => {
    it("should delete a shopping list", async () => {
      const mockDeletedList = { name: "List to Delete", _id: "mockListId" };

      ShoppingList.findOneAndDelete.mockResolvedValue(mockDeletedList);

      const response = await request(app)
        .delete("/shoppingList/mockListId")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body.message).toBe("Shopping list deleted successfully.");
      expect(response.body.deletedShoppingList).toMatchObject(mockDeletedList);
    });

    it("should return 404 if the list to delete is not found", async () => {
      ShoppingList.findOneAndDelete.mockResolvedValue(null);

      const response = await request(app)
        .delete("/shoppingList/mockListId")
        .set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(404);
      expect(response.body.message).toBe("No shopping list found");
    });
  });
});
