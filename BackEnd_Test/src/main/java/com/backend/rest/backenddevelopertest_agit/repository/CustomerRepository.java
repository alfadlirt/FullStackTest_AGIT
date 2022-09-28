package com.backend.rest.backenddevelopertest_agit.repository;

import com.backend.rest.backenddevelopertest_agit.entity.Customer;
import org.springframework.data.repository.CrudRepository;

public interface CustomerRepository extends CrudRepository<Customer, Integer> {
}
