import EventInterface from "../../@shared/event/event.interface";

type CustomerEventData = {
    id: string;
    nome: string;
    endereco: string;
}

export default class CustomerChangedAddressEvent implements EventInterface {
  dataTimeOccurred: Date;
  eventData: CustomerEventData;

  constructor(eventData: CustomerEventData) {
    this.dataTimeOccurred = new Date();
    this.eventData = eventData;
  }
}
