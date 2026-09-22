# 🛒 ShopSphere — Cloud-Native E-Commerce Platform on AWS

ShopSphere is a cloud-native e-commerce application built using HTML, CSS,
JavaScript and AWS serverless services.

The project demonstrates how a frontend application can communicate with
AWS-managed backend services to browse products, place orders, store order
data, process order messages and publish notifications.

---

## 🎯 Project Goals

- Build a functional e-commerce web application
- Deploy the frontend using Amazon S3
- Build a serverless backend using AWS Lambda
- Expose backend APIs using Amazon API Gateway
- Store product and order data using Amazon DynamoDB
- Implement asynchronous order messaging using Amazon SQS
- Publish order notifications using Amazon SNS
- Apply IAM least-privilege permissions
- Use Amazon CloudWatch for logging and monitoring
- Keep AWS usage cost-conscious

---

## 🛍️ Application Features

- Browse available products
- Add products to cart
- Increase and decrease product quantity
- Remove products from cart
- Calculate item totals and cart total
- Place orders
- Store confirmed orders in DynamoDB
- Send order messages to SQS
- Publish order notifications through SNS
- View previously placed orders
- Persist cart data using browser localStorage

---

## ☁️ AWS Services Used

| AWS Service | Purpose |
|---|---|
| Amazon S3 | Hosts the frontend files |
| Amazon API Gateway | Provides HTTP API endpoints |
| AWS Lambda | Runs the serverless backend |
| Amazon DynamoDB | Stores products and orders |
| Amazon SQS | Handles order messages |
| Amazon SNS | Publishes order notifications |
| AWS IAM | Controls Lambda permissions |
| Amazon CloudWatch | Logging and monitoring |

---

## 🏗️ Architecture

The final deployed architecture is:

```text
                         ┌─────────────────┐
                         │      User       │
                         │  Web Browser    │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │   Amazon S3     │
                         │    Frontend     │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │  API Gateway    │
                         │ ShopSphere-API  │
                         └────────┬────────┘
                                  │
                                  ▼
                         ┌─────────────────┐
                         │   AWS Lambda    │
                         │ShopSphere-Backend│
                         └────┬────┬────┬──┘
                              │    │    │
                    ┌─────────┘    │    └─────────┐
                    ▼              ▼              ▼
             ┌────────────┐ ┌────────────┐ ┌────────────┐
             │ DynamoDB   │ │    SQS     │ │    SNS     │
             │            │ │            │ │            │
             │ Products   │ │   Order    │ │   Order    │
             │ Orders     │ │  Messages  │ │Notifications│
             └────────────┘ └────────────┘ └────────────┘
Application Flow
User accesses the frontend hosted in Amazon S3.
The frontend displays products and manages the shopping cart.
The frontend sends API requests to Amazon API Gateway.
API Gateway invokes the ShopSphere-Backend Lambda function.
Lambda reads and writes data in DynamoDB.
Lambda sends order messages to SQS.
Lambda publishes order notifications through SNS.
The frontend retrieves order information through the API.
Architecture Diagram

🔌 API Endpoints

The ShopSphere API is an HTTP API hosted through Amazon API Gateway.

Method	Endpoint	Description
GET	/products	Retrieve available products
POST	/orders	Create a new order
GET	/orders	Retrieve placed orders

🗄️ DynamoDB Tables
ShopSphereProducts

Stores the products available in the application.

Partition Key:

productId

Example products:

Product ID	Product	Price
P001	Wireless Laptop	₹65,000
P002	Noise Cancelling Headphones	₹5,999
P003	Smart Watch	₹3,499
ShopSphereOrders

Stores confirmed customer orders.

Partition Key:

orderId

Stored information includes:

Order ID
Product ID
Product name
Quantity
Total price
Order status
Order date

📬 Order Processing

When a customer places an order:

Frontend
   ↓
API Gateway
   ↓
Lambda
   ↓
DynamoDB
   ↓
SQS
   ↓
SNS

Lambda performs the following operations:

Validates the product ID and quantity.
Retrieves the product from DynamoDB.
Calculates the order total.
Generates a unique order ID.
Stores the order in DynamoDB.
Sends the order message to SQS.
Publishes an order notification to SNS.
Returns the order information to the frontend.

🔐 Security

The Lambda function uses an IAM execution role with service-specific
permissions.

The role provides access for:

CloudWatch Logs
DynamoDB
SQS
SNS

The project follows the principle of least privilege by granting the
backend only the permissions required for its AWS operations.

AWS credentials are not stored in the frontend code.

API Gateway CORS is configured to allow the frontend to communicate with
the backend API.

Authentication and user authorization are not currently implemented.

📊 Monitoring

Amazon CloudWatch is used for Lambda execution logs and basic monitoring.

CloudWatch helps with:

Troubleshooting Lambda errors
Viewing backend execution logs
Monitoring application activity

Lambda log retention was configured for a limited period.

💰 Cost Management

ShopSphere was designed as a learning and portfolio project with a focus
on minimizing unnecessary AWS usage.

Cost-conscious practices include:

Small DynamoDB tables
Limited Lambda execution
Limited API testing
Standard SQS queue
Standard SNS topic
Limited CloudWatch log retention
Avoiding unnecessary monitoring resources
No paid AWS Support plan
Resource cleanup documentation

AWS Free Tier availability and pricing can vary by account, service,
region and current AWS terms.

AWS Billing and Cost Management should therefore be monitored regularly.

See:

docs/cost.md

for more information.

📂 Repository Structure
shopsphere-aws/
│
├── README.md
│
├── architecture/
│   └── Architecture.png
│
├── frontend/
│   ├── index.html
│   ├── products.html
│   ├── cart.html
│   ├── orders.html
│   ├── style.css
│   └── app.js
│
├── infrastructure/
│   └── cloudformation/
│
├── screenshots/
│
└── docs/
    ├── deployment.md
    ├── security.md
    ├── cost.md
    └── cleanup.md

🧪 Testing

The following functionality has been tested successfully:

Product display
Add to cart
Increase quantity
Decrease quantity
Remove from cart
Cart total calculation
GET /products
POST /orders
DynamoDB order storage
SQS order messaging
SNS notification publishing
GET /orders
Orders page displaying DynamoDB data

🚫 CloudFront Status

Amazon CloudFront was initially planned for the project but was not
included in the final deployment because of an AWS account verification
restriction.

Therefore, CloudFront is not represented as an active component of the
final architecture.

The repository architecture and documentation reflect the AWS services
that were actually used.

📚 What I Learned

Through this project, I gained practical experience with:

AWS cloud architecture
Amazon S3
Amazon API Gateway
AWS Lambda
Amazon DynamoDB
Amazon SQS
Amazon SNS
AWS IAM
Amazon CloudWatch
REST API concepts
Serverless application development
JavaScript frontend development
Browser localStorage
Asynchronous JavaScript and fetch()
Cloud security and least-privilege access
AWS cost awareness
Application troubleshooting

🚀 Project Status
🟢 Completed

The core ShopSphere application is functional and has been tested
end-to-end.

Implemented components include:

Frontend
Shopping cart
API Gateway
Lambda backend
DynamoDB
SQS
SNS
IAM
CloudWatch
Orders API
Orders page
Project documentation

📖 Documentation

Additional project documentation is available in the docs directory:

Deployment Guide
Security Documentation
Cost Documentation
Cleanup Guide

🏁 Conclusion

ShopSphere demonstrates a practical serverless e-commerce architecture using
AWS-managed services.

The project focuses on connecting frontend functionality with a serverless
backend while demonstrating database storage, API integration, asynchronous
messaging, notifications, IAM permissions, monitoring and cost awareness.
