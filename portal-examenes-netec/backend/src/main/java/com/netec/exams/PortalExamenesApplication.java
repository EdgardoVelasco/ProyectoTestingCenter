package com.netec.exams;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication @EnableScheduling
public class PortalExamenesApplication {
  public static void main(String[] args) { SpringApplication.run(PortalExamenesApplication.class, args); }
}
