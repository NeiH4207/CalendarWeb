class Event {
  constructor(text, place, todoList, id, startDate = "", endDate = "", mode = "public") {
    this.place = place;
    this.state = {
      text: text,
      startDate: startDate,
      endDate: endDate,
      description: description,
    };
    this.id = id;
    this.mode = mode;
  }
}
