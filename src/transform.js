import { parse } from "js2xmlparser";
import config from "./argv.js";

const address = ["de", "dk", "fi", "fr", "gr", "ie", "lu", "nl", "sk"];
const options = {
  cdataKeys: ["value"],
  declaration: { include: false },
  format: { pretty: true, indent: "  " },
};

export const header = (country) => {
 return `<supportForm
  ><forCountry>${country}</forCountry
  ><initiativeData
    ><registrationNumber>ECI(2021)000000</registrationNumber
    ><startOfTheCollectionPeriod>2021-01-11</startOfTheCollectionPeriod
    ><endOfTheCollectionPeriod>2022-01-11</endOfTheCollectionPeriod
    ><urlOnCommissionRegister
      >https://europa.eu/citizens-initiative/initiatives/details/2021/000000</urlOnCommissionRegister
    ><title>MY INITIATIVE TITLE</title
    ><objectives>My initiative objectives.</objectives
    ><registeredContactPersons
      >Elise Elise@gmail.com, Xavier Xavier@gmail.com</registeredContactPersons
    ><url>Website of the proposed initiative</url></initiativeData
  ><signatures>`;
};

export const footer = `</signatures></supportForm>`;

const groupAddress = (signature) => {
  return {
    group: [
      {
        name: "oct.group.address",
        properties: {
          property: [
            {
              key: "oct.property.street",
              value: signature.contact.street,
            },
            /*            {
              "key": "oct.property.street.number",
              "value": ""
            },
*/
            {
              key: "oct.property.postal.code",
              value: signature.contact.postcode,
            },

            {
              key: "oct.property.city",
              value: signature.contact.city,
            },
            {
              key: "oct.property.country",
              value: signature.contact.country,
            },
          ],
        },
      },
      {
        name: "oct.group.general",
        properties: {
          property: [
            {
              key: "oct.property.full.first.names",
              value: signature.contact.firstName,
            },
            {
              key: "oct.property.family.names",
              value: signature.contact.lastName,
            },
            {
              key: "oct.property.date.of.birth",
              value: signature.contact.birthDate,
            },
          ],
        },
      },
    ],
  };
};

const groupId = (signature) => {
  return {
    group: [
      {
        name: "oct.group.id",
        properties: {
          property: [
            {
              key: "oct.property.personal.id",
              value: signature.contact.nationality.documentNumber,
            },
          ],
        },
      },
      {
        name: "oct.group.general",
        properties: {
          property: [
            {
              key: "oct.property.full.first.names",
              value: signature.contact.firstName,
            },
            {
              key: "oct.property.family.names",
              value: signature.contact.lastName,
            },
          ],
        },
      },
    ],
  };
};

const signatureJson = (signature) => {
  const country = signature.contact.nationality.country.toLowerCase();
  const groups = address.includes(country)
    ? groupAddress(signature)
    : groupId(signature);
  return {
    submissionDate: signature.action.createdAt.substring(0, 10),
    signatureIdentifier: signature.contact.contactRef,
    annexRevision: 1,
    signatoryInfo: {
      groups: groups,
    },
  };
};

export const transform = (line) => {
  const xml = parse("signature", signatureJson(line), options);
  //what does it do? .split("&lt;").join("<").split("&gt;").join(">");
  if (config.verbose) console.log(xml);
  return xml;
};
