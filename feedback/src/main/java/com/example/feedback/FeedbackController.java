package com.example.feedback;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class FeedbackController {

  @PostMapping("/feedback")
  public String receiveFeedback(@RequestBody Feedback feedback) {
    // Here, you would typically save the feedback to a database
    System.out.println("Received feedback from: " + feedback.getName());
    System.out.println("Email ID: " + feedback.getEmail());
    System.out.println("Message: " + feedback.getMessage());
    return "Feedback received";
  }
}
