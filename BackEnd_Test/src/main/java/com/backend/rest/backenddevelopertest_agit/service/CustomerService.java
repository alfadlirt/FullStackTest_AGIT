package com.backend.rest.backenddevelopertest_agit.service;

import com.backend.rest.backenddevelopertest_agit.entity.Customer;

import java.util.List;

public interface CustomerService {
    List<Customer> getAllCustomer();
    Customer insertNewCustomer(String name, String address);
}
