# ShopSphere Cost Documentation

## 1. Overview

ShopSphere was designed as a learning and portfolio project with a focus on using AWS Free Tier and minimizing unnecessary AWS usage.

AWS Free Tier eligibility and pricing can vary depending on the AWS account, service, region, and current AWS pricing policies.

Therefore, AWS Billing and Cost Management should always be monitored.

---

## 2. AWS Services Used

The project uses the following AWS services:

- Amazon S3
- Amazon API Gateway
- AWS Lambda
- Amazon DynamoDB
- Amazon SQS
- Amazon SNS
- AWS IAM
- Amazon CloudWatch

---

## 3. Free Tier Considerations

The project was developed using AWS services that provide free usage allowances or free-tier eligibility depending on the account and current AWS terms.

The following resources were kept intentionally small:

### Amazon S3

Only the required frontend files were uploaded.

### AWS Lambda

The backend function performs lightweight operations and was tested with a limited number of requests.

### Amazon DynamoDB

Only a small number of products and orders are stored.

### Amazon SQS

Only small order messages are sent during testing.

### Amazon SNS

Only order notification messages are published during testing.

### Amazon CloudWatch

Basic monitoring and logging were used instead of creating unnecessary dashboards or high-volume monitoring resources.

---

## 4. Resources Not Used

Amazon CloudFront was not enabled in the final deployment because of an AWS account verification restriction.

Therefore, CloudFront usage charges are not part of the deployed application.

No paid AWS Support plan was enabled for this project.

---

## 5. Cost Control Measures

The following practices were followed to minimize unnecessary AWS usage:

- Avoided unnecessary AWS resources.
- Used small DynamoDB tables.
- Used a single Lambda backend.
- Used a standard SQS queue.
- Used a standard SNS topic.
- Limited application testing.
- Avoided unnecessary CloudWatch dashboards and alarms.
- Configured limited Lambda log retention.
- Avoided paid support upgrades.
- Planned resource cleanup after project completion.

---

## 6. Billing Monitoring

AWS Billing and Cost Management should be checked regularly while using the project.

The AWS Free Tier page and billing dashboard should be used to monitor:

- Current usage
- Free-tier usage
- Estimated charges
- Service-level usage

The project should not be assumed to be permanently free because AWS pricing and Free Tier conditions can change.

---

## 7. Important Note

Free Tier availability depends on the AWS account and applicable AWS pricing terms.

Users should verify the current AWS pricing and Free Tier limits before deploying or scaling the application.

ShopSphere is a learning and portfolio project and is not intended to operate as a production-scale commercial e-commerce platform.

---

## 8. Cost Summary

The project was intentionally designed to keep AWS usage low while demonstrating multiple cloud services.

The main cost-control strategy is to use minimal resources, perform limited testing, monitor AWS billing, and remove unused resources after completing the project.