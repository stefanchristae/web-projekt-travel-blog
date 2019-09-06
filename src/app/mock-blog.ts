import { Blog } from './blog';
import { User } from './user';

const user1: User = {
  _id: 123,
  name: "Leandra Müller"
};
const user2: User = {
  _id: 456,
  name: "Peter Schumacher"
};

export const MOCK_BLOGS: Blog[] = [
  { _id: 11, 
    user: user1,
    acquisitionTime: "15.09.2019",
    titel: "Ferien in Südafrika",
    journeyStart: "01.04.2019",
    travelPeriod: "3 Wochen",
    destination: "Botsuana",
    shorttext: "Die Ferien in Botsuana waren sehr schön",
    text: "Dies ist der Beschreibungstext"
  },
  { _id: 12, 
    user: user1,
    acquisitionTime: "15.08.2019",
    titel: "Nebel in England",
    journeyStart: "01.04.2019",
    travelPeriod: "1 Wochen",
    destination: "Manchester",
    shorttext: "Die Ferien in Manchester waren sehr schön",
    text: "Dies ist der Beschreibungstext"
  },
  { _id: 13, 
    user: user2,
    acquisitionTime: "15.09.2018",
    titel: "Ferien in Indien",
    journeyStart: "01.04.2018",
    travelPeriod: "5 Wochen",
    destination: "Neu-Delhi",
    shorttext: "Die Ferien in Neu-Delhi waren sehr schön",
    text: "Dies ist der Beschreibungstext"
  },
  { _id: 14, 
    user: user2,
    acquisitionTime: "15.09.2017",
    titel: "Ferien in Türkey",
    journeyStart: "01.04.2017",
    travelPeriod: "3 Wochen",
    destination: "Istanbul",
    shorttext: "Die Ferien in Istanbul waren sehr schön",
    text: "Dies ist der Beschreibungstext"
  },
  { _id: 15, 
    user: user2,
    acquisitionTime: "15.09.2019",
    titel: "Ferien in der Lombardei",
    journeyStart: "01.04.2019",
    travelPeriod: "3 Wochen",
    destination: "Tovelsee",
    shorttext: "Die Ferien in Italien waren sehr schön",
    text: "Dies ist der Beschreibungstext"
  }
];
