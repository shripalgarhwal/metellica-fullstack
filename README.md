Metallica
Sample application build for demonstrating full-stack knowledge gained during the Full Stack Academy.

About
Backend
All the backend microservices are independently deployable and does not have dependency on each other. All the services talk to each other using service registry design architechture. Following services are developed in this exercise:

a. Service Registry - This is a nginx server which is used as service registry. 
                      Microservices will not know the location of other microservices' lcoation, so they will use service registry to communicate with other microservice. 
                      Each service has to register to Service registry.
b. Reference Service - Reference data service is reponsible to fetch reference data from DB. 
                       It is listening on 3200
c. Trade Service -    Contains the Trade operations logic. The trade events like creation, updation, deletion of trades are pushed to messaging queue.
                      It is listening on 3300
d. MarketData service - This service creates dummy market data for all commoditiees randomly. 
                        All the market data is pushed on a messaging queue.
e. Notification Service - This is responsible to listen to market data queue and trade events queue and push these notification to websocket.
FrontEnd
Front end is implemented in ReactJS. It uses Async Http calls and observer design from axios to invoke backend services thorugh REST. All the notifications are listened to websocket hosted by notification service.

Local installation
Please follow below steps to setup the applicaiton on local machine.

Install RabitMq and start

Install mongodb and start the same. DB tables and sequences also needs to be created.

Install nginx.
put nginx.conf file inside nginx conf folder.
Start nginx.

Start the services in following order using npm start:
   a. Reference Service
   b. Trade Service
   c. MarketData Service
   d. Notification Service
   e. ui server
Upon successful startup of above services the application should be available on port 80.
run application as http://localhost;