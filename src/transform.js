import { parse } from "js2xmlparser";

const address = ["de", "dk", "fi", "fr", "gr", "ie", "lu", "nl", "sk"];

const groupAddress = (signature) => {
  return {
    "group": [
      {
        "name": "oct.group.address",
        "properties": {
          "property": [
            {
              "key": "oct.property.street",
              "value": `<![CDATA[${JSON.parse(signature).contact.street}]]>`
            },
            {
              "key": "oct.property.street.number",
              "value": `<![CDATA[${JSON.parse(signature).contact.streetNumber}]]>`
            },
            {
              "key": "oct.property.postal.code",
              "value": `<![CDATA[${JSON.parse(signature).contact.postalcode}]]>`
            },

            {
              "key": "oct.property.city",
              "value": `<![CDATA[${JSON.parse(signature).contact.city}]]>`
            },
            {
              "key": "oct.property.country",
              "value": `<![CDATA[${JSON.parse(signature).contact.country}]]>`
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
              "value": `<![CDATA[${JSON.parse(signature).contact.firstName}]]>`
            },
            {
              "key": "oct.property.family.names",
              "value": `<![CDATA[${JSON.parse(signature).contact.lastName}]]>`
            },
            {
              "key": "oct.property.date.of.birth",
              "value": `<![CDATA[${JSON.parse(signature).contact.birthDate}]]>`
            }
          ]
        }
      }
    ]
  }
};

const groupId = (signature) => {
  return {
    "group": [
      {
        "name": "oct.group.id",
        "properties": {
          "property": [
            {
              "key": "oct.property.personal.id",
              "value": `<![CDATA[${JSON.parse(signature).contact.nationality.documentNumber}]]>`
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
              "value": `<![CDATA[${JSON.parse(signature).contact.firstName}]]>`
            },
            {
              "key": "oct.property.family.names",
              "value": `<![CDATA[${JSON.parse(signature).contact.lastName}]]>`
            }
          ]
        }
      }
    ]
  }
};

const signatureJson = (signature) => {
const country = JSON.parse(signature).contact.nationality.country.toLowerCase()
  const groups = address.includes(country) ? groupAddress(signature) : groupId(signature);
  return {
    "submissionDate": JSON.parse(signature).action.createdAt,
    "signatureIdentifier": JSON.parse(signature).contact.contactRef,
    "annexRevision": 1,
    "signatoryInfo": {
      "groups": groups
    }
  }
};

export const transform = line => {
  const xml = parse("signature", signatureJson(line)).split("&lt;").join("<").split("&gt;").join(">");
  console.log("xml", xml);
}
