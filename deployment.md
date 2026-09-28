# ShopSphere Deployment Guide

## 1. Project Overview

ShopSphere is a cloud-native e-commerce application built using HTML, CSS, JavaScript and AWS services.

The application allows users to:

- View products
- Add products to a shopping cart
- Increase or decrease product quantity
- Place orders
- Store orders in Amazon DynamoDB
- Send order messages through Amazon SQS
- Publish order notifications through Amazon SNS
- View previously placed orders

---

## 2. Architecture

The final deployed architecture uses the following AWS services:

- Amazon S3
- Amazon API Gateway
- AWS Lambda
- Amazon DynamoDB
- Amazon SQS
- Amazon SNS
- AWS IAM
- Amazon CloudWatch

### Application Flow

```text
User
  |
  v
Amazon S3
  |
  v
Amazon API Gateway
  |
  v
AWS Lambda
  |
  +----> Amazon DynamoDB
  |
  +----> Amazon SQS
  |
  +----> Amazon SNS

3. Frontend

The frontend was developed using:

HTML
CSS
JavaScript

The frontend contains:

frontend/
├── index.html
├── products.html
├── cart.html
├── orders.html
├── style.css
└── app.js
Main frontend functionality

products.html

Displays available products
Allows users to add products to the cart

cart.html

Displays cart items
Supports quantity changes
Calculates item totals
Calculates the overall cart total
Sends orders to the AWS backend

orders.html

Retrieves orders from the backend
Displays order details

app.js

Handles cart operations
Uses browser localStorage for cart persistence
Communicates with API Gateway
Updates the user interface

4. Amazon S3

The frontend files are stored in an Amazon S3 bucket.

S3 is used to provide storage for the static frontend files.

The uploaded files include:

HTML files
CSS file
JavaScript file

5. Amazon API Gateway

An HTTP API named:

ShopSphere-API

was created in the Mumbai AWS region (ap-south-1).

The API provides the following routes:

Method	Route	Purpose
GET	/	Basic API route
GET	/products	Retrieves products
POST	/orders	Creates an order
GET	/orders	Retrieves orders

API Gateway forwards requests to the ShopSphere-Backend Lambda function.

CORS was configured to allow the frontend to communicate with the API.

6. AWS Lambda

The backend uses a Lambda function named:

ShopSphere-Backend

Runtime:

Node.js 24.x

Lambda performs the following operations:

GET /products

Retrieves products from:

ShopSphereProducts

using a DynamoDB Scan operation.

POST /orders

The Lambda function:

Receives the product ID and quantity.
Retrieves the product from DynamoDB.
Validates that the product exists.
Calculates the total price.
Generates a unique order ID.
Stores the order in DynamoDB.
Sends the order to SQS.
Publishes an SNS notification.
Returns the order information to the frontend.
GET /orders

Retrieves stored orders from:

ShopSphereOrders

and returns them to the frontend.

7. Amazon DynamoDB

Two DynamoDB tables are used.

ShopSphereProducts

Partition key:

productId

Example products:

Product ID	Product	Price
P001	Wireless Laptop	₹65,000
P002	Noise Cancelling Headphones	₹5,999
P003	Smart Watch	₹3,499
ShopSphereOrders

Partition key:

orderId

The table stores:

Order ID
Product ID
Product name
Quantity
Total price
Status
Order date

8. Amazon SQS

An SQS standard queue named:

ShopSphereOrderQueue

is used for order messaging.

After an order is successfully stored in DynamoDB, Lambda sends the order information to SQS.

This provides a queue-based mechanism for processing order messages independently.

9. Amazon SNS

An SNS standard topic named:

ShopSphereOrderNotifications

is used for order notifications.

After creating an order, Lambda publishes the order information to the SNS topic.

The current project does not have an active SNS subscription.

10. IAM

The Lambda function uses an IAM execution role:

ShopSphere-Backend-role-7trkfgbi

The role provides permissions for:

CloudWatch Logs
DynamoDB
SQS
SNS

Permissions are restricted to the operations required by the application.

11. CloudWatch

AWS Lambda automatically sends execution logs to Amazon CloudWatch Logs.

CloudWatch was used for basic application monitoring and troubleshooting.

Lambda log retention was configured for a limited period to avoid unnecessary storage usage.

12. Testing

The following functionality was tested successfully:

Product display
Add to cart
Increase quantity
Decrease quantity
Remove product
Cart total calculation
API Gateway product retrieval
Order creation
DynamoDB order storage
SQS order message
SNS message publishing
GET orders API
Orders page displaying DynamoDB orders

13. CloudFront Status

Amazon CloudFront was initially planned for the project architecture.

However, CloudFront could not be enabled because of an AWS account verification restriction.

Therefore, CloudFront is not included in the final deployed architecture or implementation.