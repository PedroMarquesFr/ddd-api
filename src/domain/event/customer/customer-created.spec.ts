import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "../@shared/event-dispatcher";
import CustomerCreatedEvent from "./customer-created.event";
import CustomerChangedAddressEvent from "./customer-changed-address.event";
import PrintCustomerAddressWhenCustomerIsCreated from "./handler/print-customer-address-when-address-has-changed.handler";

describe("Customer events tests", () => {
  it("Customer Changed: Should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandler = new PrintCustomerAddressWhenCustomerIsCreated();
    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    eventDispatcher.register("CustomerChangedAddressEvent", eventHandler);

    expect(
      eventDispatcher.getEventHandlers["CustomerChangedAddressEvent"][0]
    ).toMatchObject(eventHandler);

    const customerChangedAddressEvent = new CustomerChangedAddressEvent({
      id: "123",
      endereco: "rua x",
      nome: "customer",
    });

    eventDispatcher.notify(customerChangedAddressEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
