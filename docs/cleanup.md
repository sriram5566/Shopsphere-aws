# ShopSphere AWS Cleanup Guide

## 1. Purpose

This document describes the AWS resources used by ShopSphere and the steps that can be followed to remove them after completing the project.

Cleaning up unused resources helps prevent unnecessary AWS usage and potential charges.

---

## 2. AWS Resources Used

The ShopSphere project contains the following AWS resources:

- Amazon S3 bucket
- API Gateway HTTP API
- AWS Lambda function
- DynamoDB tables
- SQS queue
- SNS topic
- IAM policies and Lambda execution role
- CloudWatch log group

---

## 3. S3 Cleanup

If the ShopSphere project is no longer required:

1. Open Amazon S3.
2. Select the ShopSphere frontend bucket.
3. Delete the objects inside the bucket.
4. Delete the bucket.

Make sure the bucket is no longer required before deleting it.

---

## 4. API Gateway Cleanup

To remove the API:

1. Open Amazon API Gateway.
2. Select `ShopSphere-API`.
3. Delete the API.

The API contains the following routes:

```text
GET  /products
POST /orders
GET  /orders
5. Lambda Cleanup

To remove the backend:

Open AWS Lambda.
Select ShopSphere-Backend.
Delete the function.

Before deleting the Lambda function, make sure the API no longer needs it.

6. DynamoDB Cleanup

The project uses two DynamoDB tables:

ShopSphereProducts
ShopSphereOrders

If the project is no longer required:

Open Amazon DynamoDB.
Select the required table.
Confirm that the data is no longer needed.
Delete the table.

DynamoDB deletion permanently removes the stored data.

7. SQS Cleanup

The project uses:

ShopSphereOrderQueue

If the queue is no longer required:

Open Amazon SQS.
Select ShopSphereOrderQueue.
Delete the queue.

Any messages remaining in the queue will be deleted.

8. SNS Cleanup

The project uses:

ShopSphereOrderNotifications

If the topic is no longer required:

Open Amazon SNS.
Select the topic.
Delete the topic.

The current project does not have an active SNS subscription.

9. CloudWatch Cleanup

Lambda creates CloudWatch Logs for the backend.

The log group associated with:

ShopSphere-Backend

can be deleted after the project is no longer required.

Log retention was already configured for a limited period.

10. IAM Cleanup

The Lambda execution role is:

ShopSphere-Backend-role-7trkfgbi

If the Lambda function has been deleted and the role is no longer used:

Open IAM.
Locate the Lambda execution role.
Verify that no other AWS resource uses the role.
Remove the role if it is no longer required.

The following policies are associated with the role:

AWSLambdaBasicExecutionRole
ShopSphereDynamoDBInlinePolicy
ShopSphereSQSSendPolicy
ShopSphereSNSPublishPolicy

Do not delete an IAM role or policy if it is being used by another application or AWS resource.

11. CloudFront

CloudFront was planned during the initial architecture design but was not deployed because of an AWS account verification restriction.

No CloudFront resource needs to be cleaned up for the final ShopSphere deployment.

12. Cleanup Order

A suggested cleanup order is:

1. S3
2. API Gateway
3. Lambda
4. DynamoDB
5. SQS
6. SNS
7. CloudWatch Logs
8. IAM

Before deleting any resource, verify that it is no longer required.

13. Final Billing Check

After cleanup:

Open AWS Billing and Cost Management.
Review current usage.
Check for remaining active resources.
Review estimated charges.
Continue monitoring the account for any remaining usage.

AWS billing information can take time to update, so cleanup should be followed by another billing review.

14. Important Warning

Deletion of AWS resources can be permanent.

Before deleting:

Export any important data.
Save screenshots required for documentation.
Verify that the resource belongs to the ShopSphere project.
Confirm that no other application depends on the resource.

The cleanup process should only be performed when the project is no longer needed.