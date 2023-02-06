import { readFile } from 'fs/promises';

const jsonSignatures = JSON.parse(
    await readFile(
      new URL('../data/sample.json', import.meta.url)
    )
);

const country = "pl";

const signatures = () => {
  const arr = [];
  for (const signature of jsonSignatures) {
    if (signature.contact.nationality.country.toLowerCase() === country.toLowerCase()) {
      arr.push(
        {
          "submissionDate": signature.action.createdAt,
          "signatureIdentifier": signature.contact.contactRef,
          "annexRevision": 1,
          "signatoryInfo": {
            "groups": {
              "group": [
                {
                  "name": "oct.group.address",
                  "properties": {
                    "property": [
                      {
                        "key": "oct.property.street",
                        "value": {
                          "__cdata": signature.contact.street
                        }
                      },
                      {
                        "key": "oct.property.street.number",
                        "value": {
                          "__cdata": "18"
                        }
                      },
                      {
                        "key": "oct.property.postal.code",
                        "value": {
                          "__cdata": signature.contact.postalcode
                        }
                      },
                      {
                        "key": "oct.property.city",
                        "value": {
                          "__cdata": signature.contact.city
                        }
                      },
                      {
                        "key": "oct.property.country",
                        "value": {
                          "__cdata": signature.contact.nationality.country
                        }
                      }
                    ]
                  }
                },
                {
                  "name": "oct.group.general",
                  "properties": {
                    "property": [
                      {
                        "key": "oct.property.full.first.names",
                        "value": {
                          "__cdata": signature.contact.firstName
                        }
                      },
                      {
                        "key": "oct.property.family.names",
                        "value": {
                          "__cdata": signature.contact.lastName
                        }
                      },
                      {
                        "key": "oct.property.date.of.birth",
                        "value": {
                          "__cdata": signature.contact.birthDate
                        }
                      }
                    ]
                  }
                }
              ]
            }
          }
        });
    }
  }
  return arr;
};


console.log(444444444444444444, signatures())


export const json = {
    "forCountry": country,
    "initiativeData": {
      "registrationNumber": "ECI(2021)000000",
      "startOfTheCollectionPeriod": "2021-01-11",
      "endOfTheCollectionPeriod": "2022-01-11",
      "urlOnCommissionRegister": "https://europa.eu/citizens-initiative/initiatives/details/2021/000000",
      "title": "MY INITIATIVE TITLE",
      "objectives": "My initiative objectives.",
      "registeredContactPersons": "Elise Elise@gmail.com, Xavier Xavier@gmail.com",
      "url": "Website of the proposed initiative"
    }
    ,
    "signatures": {
      "signature": signatures()
    }
};


//what is annexRevision?

//to extract numbers from street

