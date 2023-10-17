<?php
require_once("../vendor/autoload.php");

use Dotenv\Dotenv;

function validateFile($file): bool {
  $file_name = $file["name"];

  if (
    $file["type"] != "application/pdf" &&
    $file["type"] != "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    http_response_code(400);
    echo "Invalid file type for $file_name";
    echo $file["type"];
    exit;
  }

  return true;
}

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
  
  foreach($_FILES as $file) {
    validateFile($file);
    $message->attach(Swift_Attachment::fromPath($file["tmp_name"], $file["type"]));
  }
  
  // Send the message
  $mailer->send($message);
  echo "Message sent successfully!";
} catch (Exception $e) {
  http_response_code(500);
  error_log($e->getMessage());
  echo "Something went wrong. Try again!";
}
