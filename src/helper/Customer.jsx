import axios from "axios";

const headers = {
  Authorization: `Bearer ${process.env.REACT_APP_SPHERE_API_KEY}`,
};

class CustomerResponse {
  constructor(customer) {
    this.customer = customer;
  }
}

class Address {
  constructor(line1, line2, city, state, country) {
    this.line1 = line1;
    this.line2 = line2;
    this.city = city;
    this.state = state;
    this.country = country;
  }
}

class Customer {
  constructor(
    id,
    customerType,
    address,
    email,
    firstName,
    lastName,
    phoneNumber,
    kyc,
    kycRequirements,
    tos,
    wallets,
    bankAccounts,
    created,
    updated,
    mock
  ) {
    this.id = id;
    this.customerType = customerType;
    this.address = address;
    this.email = email;
    this.firstName = firstName;
    this.lastName = lastName;
    this.phoneNumber = phoneNumber;
    this.kyc = kyc;
    this.kycRequirements = kycRequirements;
    this.tos = tos;
    this.wallets = wallets;
    this.bankAccounts = bankAccounts;
    this.created = created;
    this.updated = updated;
    this.mock = mock;
  }
}

export async function createCustomer(
  firstName,
  lastName,
  email,
  phoneNumber,
  dobDay,
  dobMonth,
  dobYear,
  ssn,
  addressLine1,
  addressLine2,
  addressCity,
  addressState,
  addressCountry,
  addressPostalCode,
  mock
) {
  const mockStr = mock ? "true" : "false";
  const url = `https://api.spherepay.co/v1/customer?mock=${mockStr}`;

  const response = await axios.post(
    url,
    {
      type: "individual",
      firstName,
      lastName,
      email,
      phoneNumber,
      dob: {
        day: dobDay,
        month: dobMonth,
        year: dobYear,
      },
      ssn,
      address: {
        line1: addressLine1,
        line2: addressLine2,
        city: addressCity,
        state: addressState,
        country: addressCountry,
        postalCode: addressPostalCode,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_SPHERE_API_KEY}`,
      },
    }
  );

  const customer = response.data.customer;
  return customer;
}

export async function listAllCustomers(isMock) {
  const mockStr = isMock;
  const url = `https://api.spherepay.co/v1/customer?mock=${mockStr}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_SPHERE_API_KEY}`,
    },
  });
  return response;
}
export async function getCustomer(id, isMock) {
  const mockStr = isMock;
  const url = `https://api.spherepay.co/v1/customer/${id}?mock=${mockStr}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${process.env.REACT_APP_SPHERE_API_KEY}`,
    },
  });
  return Promise.resolve(response);
}

export async function customerTos(id, isMock) {
  const mockStr = isMock;
  const url = `https://api.spherepay.co/v1/customer/${id}/tos?mock=${mockStr}`;

  const response = await axios.post(url, {}, { headers: {
    Authorization: `Bearer ${process.env.REACT_APP_SPHERE_API_KEY}`,
  }, });
  return response;
}

class File {
  constructor(id, fileType, name, description, url, mock) {
    this.id = id;
    this.fileType = fileType;
    this.name = name;
    this.description = description;
    this.url = url;
    this.mock = mock;
  }
}

export async function createFile(customerId, mock) {
  const emptyBlob = new Blob([]);
  const form = new FormData();
  form.append("customer", customerId);
  form.append("type", "customerIdentityDocument"); // or 'customerUboDocument', 'customerIncorporationDocument'
  form.append("name", "My Customer's Passport");
  form.append(
    "description",
    "A document showing the information of the customer"
  );
  form.append(
    "links",
    "https://images.wsj.net/im-889295?width=607&height=405,https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf"
  );
  form.append("file", emptyBlob, "emptyBuffer");

  const mockStr = mock ? "true" : "false";
  const url = `https://api.spherepay.co/v1/file?mock=${mockStr}`;

  try {
    const response = await axios.post(url, form, {
      headers: {
        Authorization: `Bearer ${process.env.REACT_APP_SPHERE_API_KEY}`,
      },
    });
    const responseData = response.data;
    const files = responseData.data.files.map(
      (file) =>
        new File(
          file.id,
          file.type,
          file.name,
          file.description,
          file.url,
          file.mock
        )
    );
    return files;
  } catch (error) {
    throw new Error(`Failed to create file: ${error.message}`);
  }
}
