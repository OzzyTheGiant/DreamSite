<?php
require_once("../vendor/autoload.php");

use Dotenv\Dotenv;

try {
  // load environment variables
  $dotenv = Dotenv::createImmutable($_SERVER["DOCUMENT_ROOT"]);
  $dotenv->load();
  
  $content = "
  \nName: $_POST[name],
  \nPhone: $_POST[phone]
  \nEmail: $_POST[email]
  
  \n\nMessage:
  
  \n$_POST[message]
  ";
  
  // Create the Transport
  $transport = (new Swift_SmtpTransport($_ENV["SMTP_HOST"], $_ENV["SMTP_PORT"]))
      ->setUsername($_ENV["SMTP_USER"])
      ->setPassword($_ENV["SMTP_PASS"]);
  
  // Create the Mailer using your created Transport
  $mailer = new Swift_Mailer($transport);
  
  // Create a message
  $from = $_ENV["SMTP_FROM"] ?? $_ENV["SMTP_USER"];
  $message = (new Swift_Message("Website Message"))
      ->setFrom([$from => $_ENV["SMTP_FROM"]])
      ->setTo([$_ENV["SMTP_TO"]])
      ->setBody($content);
  
  // Send the message
  $mailer->send($message);
  echo "Message sent successfully!";
} catch (Exception $e) {
  http_response_code(500);
  error_log($e->getMessage());
  echo "Something went wrong. Try again!";
}
