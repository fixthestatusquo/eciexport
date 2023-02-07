import { parse } from "js2xmlparser";
import config from "./argv.js";
import { date, isValid } from "./helper.js";

const address = ["de", "dk", "fi", "fr", "gr", "ie", "lu", "nl", "sk"];

const options = {
  cdataKeys: ["value"],
  declaration: { include: false },
  format: { pretty: true, indent: "  " },
};

const initiativeData = () => {
  const json = {
    "registrationNumber": "ECI(2022)000002",
    "startOfTheCollectionPeriod": "2022-05-18",
    "endOfTheCollectionPeriod": "2023-03-01",
    "urlOnCommissionRegister": "https://europa.eu/citizens-initiative/initiatives/details/2022/000002",
    "title": "FUR FREE EUROPE",
    "objectives": "Fur farming is inherently cruel and it is widely rejected by EU citizens.\nIt is impossible to improve the welfare of animals on fur farms. Whilst no animals should live in a caged environment, the keeping of inherently wild species in cages can only be defined as abject cruelty.\nThe keeping and killing of animals solely for the purpose of fur production is ethically unacceptable.\nNumerous outbreaks of SARS-CoV-2 on mink farms have evidenced the veterinary-public health risks associated with the production of fur.\nThe existence of production bans in some Member States has a distorting impact on the market for the supply of farmed fur products. This favours traders in those Member States where there is no production ban, to the detriment of those EU countries where outright bans are already in place.\nThe placing of fur products on the internal markets of several territories and jurisdictions has already been prohibited. This includes dog and cat fur within the EU.\nEchoing the calls from many Member States we, EU citizens, invite the Commission to prohibit by law, throughout the Union, the:\n- keeping and killing of animals for the sole or main purpose of fur production.\n- placement of farmed animal fur, and products containing such fur, on the EU market.",
    "registeredContactPersons": "Elise news@eurogroupforanimals.org, Agnese a.marcon@eurogroupforanimals.org",
    "url": "https://furfreeeurope.eu"
  }
  return parse("initiativeData", json, options)
}

export const header = (country) => {
 return `<supportForm><forCountry>${country}</forCountry
 >${initiativeData()}<signatures>`;
};

export const footer = `</signatures></supportForm>`;

const groupAddress = (signature) => {

  if (!isValid(signature.contact.street)
    || !isValid(signature.contact.postcode)
    || !isValid(signature.contact.city)
    || !isValid(signature.contact.country)
    || !isValid(signature.contact.firstName)
    || !isValid(signature.contact.lastName)) {
    throw new Error(`Missing contact data: ${JSON.stringify(signature.contact)}`);
  }

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
              value: date(signature.contact.birthDate),
            },
          ],
        },
      },
    ],
  };
};

const groupId = (signature) => {
  if (!isValid(signature.contact.nationality.documentNumber)
    || !isValid(signature.contact.firstName)
    || !isValid(signature.contact.lastName)) {
    throw new Error(`Missing contact data: ${JSON.stringify(signature.contact)}`);
  }

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
  if (config.verbose) console.log(xml);
  return xml;
};
