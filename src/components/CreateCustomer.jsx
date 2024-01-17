import React, { useEffect } from "react";
import axios from "axios";
import { createCustomer, createFile, customerTos, getCustomer, listAllCustomers } from "../helper/Customer";

const CreateCustomer = () => {
  const createCustomerHandler = () => {
        // Example usage
        createCustomer(
            "Umesh",
            "c",
            "umesh@example.com",
            "+1234567890",
            1,
            1,
            1990,
            "123-45-6789",
            "123 Main St",
            "Apt 45",
            "Cityville",
            "CA",
            "USA",
            "12345",
            true
          )
            .then((result) => {
              console.log(result)})
            .catch((error) => console.error(error));
  }

  const listAllCustomerHandler = () => {
    const customerList = listAllCustomers(true).then((result) => result).catch((error) => console.error);
    console.log(customerList);
}

const handleKYC = () => {
    createFile('customer_434b83fb787747ee888336b9250e23f0', true);
}

const handleGetCustomerTos = () => {
    const customer = customerTos('customer_434b83fb787747ee888336b9250e23f0', true).then((result) => result).catch((error) => console.error);
    console.log(customer);
  }

  return <div>
    <button onClick={createCustomerHandler}>
        create Customer
    </button>
    <button onClick={listAllCustomerHandler}>
        list All Customer
    </button>
    <button onClick={handleKYC}>
        complete KYC
    </button>
    <button onClick={handleGetCustomerTos}>
        get Customer/Tos
    </button>
  </div>;
};

export default CreateCustomer;
