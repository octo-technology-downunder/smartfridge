# Smart Fridge
This repo keeps a source code of the Smart Fridge project, developed by the mixed team of OCTO Technology AU + Accenture + Thinxtra developers during the coding night.
Details of the event could be found here:
TBD
The final product consists of two parts:
- Hardware configuration
- Data processing solution

## Hardware configuration
Thinxtra Xkit is used as IoT device and the program for that is located here:
https://github.com/Thinxtra/Xkit-Sample/blob/master/DemoApp/DemoApp.ino
Following changes have been made to the source code for this project:
1. line 87:
```
unsigned long sendInterval = 600000;
```
replaced with 
```
unsigned long sendInterval = 1000;
``` 
to run sensors polling cycle every 1 second

2. line 144:
```
Send_Pload(buf_str, payloadSize);
```
replaced with 
```    
if ((float)x_g.number/250 > 0.1 || (float)x_g.number/250 < -0.1) {
  Send_Pload(buf_str, payloadSize);
}
```
to send messages only when movement has been detected

## Data processing solution
In order to handle the messages sent by Thinxtra Xkit, we make use of AWS IoT, which then triggers AWS Lambda Function, which processes the data and sends Slack notification.
All code for Lambda presents in current repo.
Moreover, Serverless framework is used to facilitate Lambda configuration and deployment 
 