# ShopSphere Security Documentation

## 1. Overview

ShopSphere uses AWS Identity and Access Management (IAM) to control access between AWS services.

The application follows the principle of granting the Lambda function only the permissions required for its operations.

---

## 2. Lambda Execution Role

The Lambda function `ShopSphere-Backend` uses the following IAM execution role:

```text
ShopSphere-Backend-role-7trkfgbi

The role provides permissions required by the backend.

3. IAM Policies

The Lambda execution role contains the following policies:

AWSLambdaBasicExecutionRole

Used to allow Lambda to write execution logs to Amazon CloudWatch Logs.

ShopSphereDynamoDBInlinePolicy

Provides the Lambda function with access to the ShopSphere DynamoDB tables.

The policy allows the backend to:

Scan the products table
Retrieve individual products
Create orders
Read orders

The policy references the ShopSphere DynamoDB resources.

ShopSphereSQSSendPolicy

Allows Lambda to send order messages to:

ShopSphereOrderQueue

The permission used is:

sqs:SendMessage

ShopSphereSNSPublishPolicy

Allows Lambda to publish order notifications to:

ShopSphereOrderNotifications

The permission used is:

sns:Publish

4. Principle of Least Privilege

The Lambda execution role is configured with service-specific permissions instead of unrestricted access.

For example:

Lambda can send messages to the ShopSphere SQS queue.
Lambda can publish messages to the ShopSphere SNS topic.
Lambda can access the ShopSphere DynamoDB tables.
Lambda can write logs to CloudWatch.

Unnecessary permissions were not added to the Lambda role.

5. API Security

Amazon API Gateway is used as the entry point for frontend API requests.

The API provides the following routes:

GET  /products
POST /orders
GET  /orders

CORS is configured so that the frontend can communicate with the API.

For this learning project, the API does not currently use user authentication or authorization.

Authentication can be added in a future version using services such as Amazon Cognito or an API authorizer.

6. Data Security

Product and order information is stored in Amazon DynamoDB.

The application does not store payment card information.

The frontend cart uses browser localStorage for temporary cart data.

Confirmed orders are stored in DynamoDB through the Lambda backend.

7. SQS Security

The SQS queue uses server-side encryption with Amazon SQS-managed encryption keys (SSE-SQS).

Lambda is granted only the permission required to send messages to the queue.

8. SNS Security

The SNS topic is configured as a standard topic.

Lambda is granted permission to publish messages to the ShopSphere notification topic.

No active SNS subscription is currently configured.

9. CloudWatch Security Monitoring

Lambda execution logs are stored in Amazon CloudWatch Logs.

CloudWatch logs can be used to troubleshoot:

Lambda execution errors
API requests
Backend processing failures
Integration problems

Log retention was configured for a limited period.

10. Security Considerations

The current project is designed as a learning and portfolio application.

The following production-level security features are not currently implemented:

User authentication
User authorization
Payment gateway security
HTTPS custom domain
AWS WAF
Secrets Manager
Fine-grained user-level access control

These can be considered for future improvements.

11. Security Summary

ShopSphere uses IAM roles and service-specific policies to control backend access.

The backend communicates with DynamoDB, SQS and SNS using AWS IAM permissions rather than storing AWS credentials in the frontend code.

This prevents AWS access keys from being exposed in the client-side application.