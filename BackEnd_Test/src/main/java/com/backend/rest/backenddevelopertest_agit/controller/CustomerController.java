package com.backend.rest.backenddevelopertest_agit.controller;

import com.backend.rest.backenddevelopertest_agit.entity.Customer;
import com.backend.rest.backenddevelopertest_agit.entity.CustomerBody;
import com.backend.rest.backenddevelopertest_agit.service.CustomerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(value = "/api")
public class CustomerController {
    @Autowired
    CustomerService customerService;

    @GetMapping(value = "customers")
    public List<Customer> getCustomers()
    {
        return customerService.getAllCustomer();
    }

    @PostMapping(value = "customer")
    public ResponseEntity<?> insertCustomers(@RequestBody CustomerBody custBody)
    {
        Customer insertedCust = customerService.insertNewCustomer(custBody.getName(), custBody.getAddress());

        HashMap<String, Object> response = new HashMap<String, Object>();

        response.put("address", insertedCust.getAddress());
        response.put("name", insertedCust.getName());
        response.put("status", true);
        response.put("id", insertedCust.getId());


        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
