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

## 💫 Benefits of using a Message Broker
Using a message broker instead, for example, REST for microservice communication offers several benefits, including:

1. Decoupling and Flexibility: Message brokers decouple microservices, allowing them to communicate without being directly dependent on one another.

2. Reliability and Resilience: Message brokers can handle message persistence and delivery, ensuring reliable communication even in the face of service failures or network issues. 

3. Asynchronous Communication: Message brokers enable asynchronous communication, which means that microservices can send and receive messages independently, reducing latency and improving overall system responsiveness. This is particularly valuable for handling high loads and peak traffic.

4. Load Balancing and Scalability: Message brokers can distribute messages across multiple instances of microservices, enabling load balancing and horizontal scalability. This ensures that the system can efficiently manage increased traffic and maintain performance as the application grows.

## 🚩 Getting started

1. Clone the repo to your local machine
2. <a href="https://cloud.memphis.dev">Signup</a> to Memphis.dev Cloud or <a href="https://memphis.dev/docs">Deploy</a> the self-hosted version
3. For the next step, you would need to:
   1. Copy your broker's `hostname`
   2. **Cloud users only** - Copy your `Account ID`
4. Create a client-type user
4. For the services `order` and `restaurant` create a `.env` file, place it in the service's root dir with the below variables, and values from step 3:
```
MEMPHIS_HOST = ""      # Broker hostname
MEMPHIS_USERNAME = ""  # Client-type username
MEMPHIS_PASSWORD = ""  # Client-type user password
MEMPHIS_ACCOUNTID = "" # If not cloud can be ignored
```
5. For the service `email` create a `.env` file, place it in the service's root dir with the below variables, and values from step 3:
```
MEMPHIS_HOST = ""
MEMPHIS_USERNAME = ""
MEMPHIS_PASSWORD = ""
MEMPHIS_ACCOUNTID = ""
EMAIL_ID=""                # From
EMAIL_PWD=""               # Email Password
EMAIL_SERVICE="gmail"
EMAIL_RECIPIENT=""         # cc
```
6. Within each service's root dir, please run `node index.js`
7. <b>Try it out!</b> (replace the `order-service:3001` with your service. Usually `localhost:3001`)

Welcome

```
curl order-service:3001/api/info
```

Get the menu

```
curl order-service:3001/api/menu
```

Place an order

```
curl -X POST order-service:3001/api/orders -d '{"items":[{"name":"burger","quantity":1}], "email":"test@gmail.com"}' -H 'Content-Type: application/json'
```
<div align="center">

<h2>🍻Great job!</h2>

<h4>Continue your learning with <a href="https://docs.memphis.dev/memphis/getting-started/tutorials">these tutorials</a> next!</h4>

</div>
<br>

Sharpen your skills! <a href="ttps://memphis.dev/newsletter">Join</a> 4500+ others and sign up for our data engineering newsletter
