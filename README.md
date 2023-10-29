![Newsletter](https://github.com/memphisdev/onboarding-app/assets/70286779/697ca291-20e2-4cdb-bef0-376be34e2a06)

<center>

<h2>Onboarding Tutorial For Memphis.dev!</h2>

<p>
To access additional tutorials, code examples, and guides, kindly explore the <a href="https://github.com/memphisdev/memphis-dev-academy">Memphis Academy</a> repository or consult our <a href="https://docs.memphis.dev">documentation</a>.
</p>

</center>

<br>
To showcase the interaction of microservices and event-driven architecture with Memphis.dev as a message broker, We developed <b>Fastmart</b> -<br> 
The fastest food delivery app ever created in the history of mankind 🎉

## High-Level Plan


1.  Sign up to Memphis Cloud [here](https://memphis.dev).
2.  Clone “Fastmart” [GitHub](https://github.com/yanivbh1/FastMart) repo.
3.  Review the code, the different services, and how they interact with each other
4.  Deploy “Fastmart” over Kubernetes
5.  Order food!

Let’s start!
============

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
