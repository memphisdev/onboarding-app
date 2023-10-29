<div align="center">

<img src="https://github.com/memphisdev/onboarding-app/blob/master/docs/Banner.jpg" />

<h2>Onboarding Tutorial For Memphis.dev!</h2>

<p>
To access additional tutorials, code examples, and guides,<br>kindly explore the <a href="https://github.com/memphisdev/memphis-dev-academy">Memphis Academy</a> repository or consult our <a href="https://docs.memphis.dev">documentation</a>.
</p>

</div>

<br>
To showcase the interaction of microservices and event-driven architecture with Memphis.dev as a message broker, We developed <b>Fastmart - The Fastest Food Delivery App Ever Created In The History Of Mankind 🎉</b>

## 📌 Good to know Memphis.dev concepts before
- <b>Station</b>: A station is a distributed unit that stores messages/events/records. Similar to Kafka's topics and RabbitMQ's queues. Each station has a retention policy, which defines when and how messages will be removed from the station—for example, by the number of stored messages, store time, or total size.

- <b>Producer</b>: A producer represents the originating application or service responsible for sending data or messages to the broker or, more specifically, to a station

- <b>Consumer</b>: A consumer is a client responsible for retrieving data or messages from the broker, particularly from the station.

## 🏗️ High-Level Diagram
<img src="https://github.com/memphisdev/onboarding-app/blob/master/docs/High-level diagram.jpeg"/>

<br><b>From left to right:</b>
- <b>Orders Service</b>: The Orders Service plays a pivotal role in the system by serving as the interface for customers to place orders, managing these orders, and subsequently routing them to the Memphis Orders Station.
Acts as a Memphis Producer.

- <b>Orders station</b>: A queue for incoming orders.

- <b>Restaurant Service</b>: The Restaurant Service takes on the critical responsibilities of receiving and processing new orders, ensuring their preparation, and ultimately queuing them for delivery.
Acts as a Memphis Consumer.

- <b>Email Service</b>: Its primary duty involves notifying customers about the status of their orders through email communication. This process is tailored to trigger distinct types of email messages corresponding to each specific message by its station.
Acts as a Memphis Consumer from two stations simultaneously.

- <b>Delivery Station</b>: A queue for incoming deliveries.

## Getting started

1\. Sign up to Memphis.dev Cloud
--------------------------------

Please head to [Memphis.dev Cloud](https://cloud.memphis.dev) Signup, and create a free acount.

Memphis.dev Dashboard

2\. Clone the Fastmart repo
---------------------------

```
git clone https://github.com/yanivbh1/FastMart.git
```

3\. Review the System Architecture, Code, and Flow
--------------------------------------------------

Follow the numbers to understand the flow.

[FastMart](https://github.com/yanivbh1/FastMart) has three main components:

`**order-service**` - Exposes REST endpoints that allow clients to fetch the food menu, place an order and track the order in real-time.

A new order will be saved in mongo with the status “Pending” and will be produced (Pushed) into the “orders” station

```
GET: /<orderId>  
Example: curl [http://order-service:3000/30](http://order-service:3000/30)POST: /<order\_details>  
Example: curl -X POST [http://order-service:3000/api/orders](http://order-service:3000/api/orders) -d ‘{“items”:\[{“name”:”burger”,”quantity”:1}\], “email”:”test@test.com”}’ -H ‘Content-Type: application/json’
```

The code responsible for communicating with Memphis will be found on -

`./order-service/src/services/mqService.js`

`**email-service**` - Responsible for notifying the client of the different stages.

email-service consumer messages from two stations: `orders` and `notifications.`

As soon as an order is inserted into the station, the email service notifies the client with an order confirmation.

At the same time listens for new notification requests of other services

`**resturant-service**` - Responsible for fulfilling an order.

1.  Consume an order
2.  Process the order
3.  Change order status at the MongoDB level to “Accepted”
4.  Using constant sleep time to mimic the preparation of the food by the restaurant
5.  Change order status at the MongoDB level to “Delivered”
6.  Sending notifications to the client

4\. Deploy “Fastmart” over Kubernetes
-------------------------------------

Fastmart repo tree -

Fastmart files tree

To deploy the Fastmart namespace and different services,

please run `kubectl apply -f k8s-deployment.yaml`

```
kubectl get pods -n fastmart
```

Output -

Let’s understand why Fastmart services cant start

```
kubectl logs email-service-5ddb9b58d6-bq2xd -n fastmart
```

Output -

It appears that the services try to connect to “Memphis” with the user “Fastmart” which does not exist, and we require to create it.

**Once the user gets created, the pods will restart automatically and reconnect with Memphis.**

5\. Order food! (API guide)
---------------

Welcome

```
curl order-service:3001/api/info
```

Get the menu

```
curl order-service:3001/api/menu
```

Output -

```
{“items”:\[{“name”:”burger”,”price”:50},{“name”:”fries”,”price”:20},{“name”:”coke”,”price”:10}\]}
```

Place an order

```
curl -X POST order-service:3001/api/orders -d '{"items":[{"name":"burger","quantity":1}], "email":"test@gmail.com"}' -H 'Content-Type: application/json'
```

An email should arrive shortly at the email address specified above.

Thanks!

[**Join 4500+ others and sign up for our data engineering newsletter**](https://memphis.dev/newsletter)**.**
