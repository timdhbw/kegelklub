package org.kcafglitscht.cucumber;

import io.cucumber.spring.CucumberContextConfiguration;
import org.kcafglitscht.IntegrationTest;
import org.springframework.test.context.web.WebAppConfiguration;

@CucumberContextConfiguration
@IntegrationTest
@WebAppConfiguration
public class CucumberTestContextConfiguration {}
