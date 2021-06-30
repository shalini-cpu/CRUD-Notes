const notes = (store = [], action) => {
  switch (action.type) {
    case "add_note":
      return (store = [...store, action.data]);
  }
};

export default notes;
