import ProductCreatedEvent from "../product/product-created.event";
import EventDispatcher from "../@shared/event-dispatcher";
import PrintFirtsLogWhenCustomerIsCreatedHandler from "./handler/print-first-log-when-customer-is-created.handler";
import PrintSecondLogWhenCustomerIsCreatedHandler from "./handler/print-second-log-when-customer-is-created.handler";
import CustomerCreatedEvent from "./customer-created.event";

describe("Domain events tests", () => {
  it("should notify all event handlers", () => {
    const eventDispatcher = new EventDispatcher();
    const eventHandlerFirst = new PrintFirtsLogWhenCustomerIsCreatedHandler();
    const eventHandlerSecond = new PrintSecondLogWhenCustomerIsCreatedHandler();
    const spyEventHandlerFirst = jest.spyOn(eventHandlerFirst, "handle");
    const spyEventHandlerSecond = jest.spyOn(eventHandlerSecond, "handle");

    eventDispatcher.register("CustomerCreatedEvent", eventHandlerFirst);
    eventDispatcher.register("CustomerCreatedEvent", eventHandlerSecond);

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
    ).toMatchObject(eventHandlerFirst);
    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"][1]
    ).toMatchObject(eventHandlerSecond);

    const customerCreatedEvent = new CustomerCreatedEvent({
      name: "Joao",
      address: "xyz",
    });

    // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandlerFirst).toHaveBeenCalled();
    expect(spyEventHandlerSecond).toHaveBeenCalled();
  });
});
