import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import OrderRepositoryInterface from "../../../../domain/checkout/repository/order-repository.interface";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    await OrderModel.update(
      {
        customer_id: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          product_id: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
  }

  async find(id: string): Promise<Order> {
    let orderModel;
    try {
      orderModel = await OrderModel.findOne({
        where: {
          id,
        },
        rejectOnEmpty: true,
        include: OrderItemModel,
      });
      orderModel.items;
    } catch (error) {
      throw new Error("Customer not found");
    }

    const orderItem: OrderItem[] = orderModel.items.map(
      ({ id, name, price, product_id, quantity }) =>
        new OrderItem(id, name, price / quantity, product_id, quantity)
    );

    return new Order(id, orderModel.customer_id, orderItem);
  }

  async findAll(): Promise<Order[]> {
    const ordersModel = await OrderModel.findAll({ include: OrderItemModel });
    return ordersModel.map(order => {
      const orderItem: OrderItem[] = order.items.map(
        ({ id, name, price, product_id, quantity }) =>
          new OrderItem(id, name, price / quantity, product_id, quantity)
      );
      return new Order(order.id, order.customer_id, orderItem);
    })
  }
}
