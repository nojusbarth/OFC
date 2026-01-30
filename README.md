# Olympian Flight Control

### Run Development Server `npm start`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Run Tests `npm test`
Run all tests

### Build docker image
```bash
# Build the image
docker build -t ofc-app .

# Run the container
docker run -p 8080:80 ofc-app
```

Then access your app at `http://localhost:8080`.
