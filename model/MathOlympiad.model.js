let mathOlympiad = {
  id: 0,
  name: "",
  category: "",
  contact: "",
  email: "",
  institution: "",
  total: 0.0,
  paid: 0.0,
  selected: false,
  tshirt: "",
  date: Date.now,
};

const mathOlympiadCreation = (
  id,
  name,
  category,
  contact,
  email,
  institution,
  total,
  paid,
  selected,
  tshirt
) => {
  mathOlympiad.id = id;
  mathOlympiad.name = name;
  mathOlympiad.category = category;
  mathOlympiad.contact = contact;
  mathOlympiad.email = email;
  mathOlympiad.institution = institution;
  mathOlympiad.total = total;
  mathOlympiad.paid = paid;
  mathOlympiad.selected = selected;
  mathOlympiad.tshirt = tshirt;
};
module.exports = { mathOlympiad, mathOlympiadCreation };
