package com.backend.rest.backenddevelopertest_agit.service.impl;

import com.backend.rest.backenddevelopertest_agit.entity.Customer;
import com.backend.rest.backenddevelopertest_agit.repository.CustomerRepository;
import com.backend.rest.backenddevelopertest_agit.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CustomerServiceImpl implements CustomerService {
    @Autowired
    CustomerRepository custRepository;

    @Override
    public List<Customer> getAllCustomer() {
        return (List<Customer>) custRepository.findAll();
    }

    @Override
    public Customer insertNewCustomer(String name, String address) {
        Customer newCust = new Customer(name, address);

        return custRepository.save(newCust);
    }
}
