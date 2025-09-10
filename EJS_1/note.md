npm i ejs

create view folder

index.ejs file create under view folder

app.set("view engine", "ejs")

Get method ('/') api created then render the view file index.ejs

<% %> => DelayMeter

npm i morgar

app.use(morgan("dev")); 
Morgan helps us know what is happening on the server (request details, status codes, response time)
